import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const collegeId = Number(id);

    if (!Number.isInteger(collegeId) || collegeId <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid college ID",
        },
        { status: 400 }
      );
    }

    const college = await db.orm.public.College
      .where({ id: collegeId })
      .include("courses")
      .first();

    if (!college) {
      return NextResponse.json(
        {
          success: false,
          error: "College not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: college,
    });
  } catch (error) {
    console.error("Failed to fetch college:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch college",
      },
      { status: 500 }
    );
  }
}