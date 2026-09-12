import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const city = searchParams.get("city")?.trim() || "";
    const state = searchParams.get("state")?.trim() || "";

    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const minFeesParam = searchParams.get("minFees");
    const maxFeesParam = searchParams.get("maxFees");
    const minRatingParam = searchParams.get("minRating");

    const page = pageParam ? Number(pageParam) : 1;
    const limit = limitParam ? Number(limitParam) : 10;
    const minFees = minFeesParam ? Number(minFeesParam) : 0;
    const maxFees = maxFeesParam ? Number(maxFeesParam) : null;
    const minRating = minRatingParam ? Number(minRatingParam) : 0;

    if (
      !Number.isInteger(page) ||
      page < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Page must be a positive integer",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 50
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Limit must be an integer between 1 and 50",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(minFees) ||
      minFees < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Minimum fees must be a non-negative number",
        },
        { status: 400 }
      );
    }

    if (
      maxFees !== null &&
      (!Number.isFinite(maxFees) || maxFees < 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Maximum fees must be a non-negative number",
        },
        { status: 400 }
      );
    }

    if (maxFees !== null && maxFees < minFees) {
      return NextResponse.json(
        {
          success: false,
          error: "Maximum fees cannot be less than minimum fees",
        },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(minRating) ||
      minRating < 0 ||
      minRating > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Minimum rating must be between 0 and 5",
        },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;
    const college = db.orm.public.College;

    let query = college
      .where((c) => c.fees.gte(minFees))
      .where((c) => c.rating.gte(minRating));

    if (maxFees !== null) {
      query = query.where((c) => c.fees.lte(maxFees));
    }

    if (city) {
      query = query.where((c) => c.city.ilike(`%${city}%`));
    }

    if (state) {
      query = query.where((c) => c.state.ilike(`%${state}%`));
    }

    if (search) {
      query = query.where((c) => c.name.ilike(`%${search}%`));
    }

    const colleges = await query
      .orderBy((c) => c.rating.desc())
      .offset(offset)
      .limit(limit)
      .all();

    const totalResult = await query.aggregate((agg) => ({
      total: agg.count(),
    }));

    const total = totalResult.total;

    return NextResponse.json({
      success: true,
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch colleges:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch colleges",
      },
      { status: 500 }
    );
  }
}
