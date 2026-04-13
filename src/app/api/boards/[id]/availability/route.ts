import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const startDate = month && year
    ? new Date(parseInt(year), parseInt(month) - 1, 1)
    : new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 2);

  const availability = await db.availability.findMany({
    where: {
      surfboardId: id,
      date: { gte: startDate, lte: endDate },
      isAvailable: false,
    },
    select: { date: true },
  });

  const unavailableDates = availability.map((a) =>
    a.date.toISOString().split("T")[0]
  );

  return NextResponse.json({ unavailableDates });
}
