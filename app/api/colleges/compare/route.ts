import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids")?.trim() || "";

    const ids = idsParam
      .split(",")
      .map((id) => Number(id.trim()));

    if (
      ids.length < 2 ||
      ids.length > 3 ||
      ids.some((id) => !Number.isInteger(id) || id <= 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide 2 or 3 valid college IDs",
        },
        { status: 400 }
      );
    }

    const uniqueIds = [...new Set(ids)];

    if (uniqueIds.length !== ids.length) {
      return NextResponse.json(
        {
          success: false,
          error: "College IDs must be unique",
        },
        { status: 400 }
      );
    }

    const colleges = await Promise.all(
      uniqueIds.map((id) =>
        db.orm.public.College
          .where({ id })
          .include("courses")
          .first()
      )
    );

    const missingIds = uniqueIds.filter(
      (id, index) => colleges[index] === null
    );

    if (missingIds.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `College(s) not found: ${missingIds.join(", ")}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: colleges,
    });
  } catch (error) {
    console.error("Failed to compare colleges:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to compare colleges",
      },
      { status: 500 }
    );
  }
}