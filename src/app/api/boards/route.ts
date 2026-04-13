import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { SurfboardType } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const locationId = searchParams.get("locationId");
  const type = searchParams.get("type") as SurfboardType | null;
  const minVolume = searchParams.get("minVolume");
  const maxVolume = searchParams.get("maxVolume");
  const level = searchParams.get("level");

  const boards = await db.surfboard.findMany({
    where: {
      status: "AVAILABLE",
      ...(locationId && { locationId }),
      ...(type && { type }),
      ...(minVolume || maxVolume
        ? {
            volumeLiters: {
              ...(minVolume ? { gte: parseFloat(minVolume) } : {}),
              ...(maxVolume ? { lte: parseFloat(maxVolume) } : {}),
            },
          }
        : {}),
      ...(level && {
        conditionProfile: { contains: level, mode: "insensitive" as const },
      }),
    },
    include: {
      location: { select: { city: true, town: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(boards);
}
