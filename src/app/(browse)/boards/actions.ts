"use server";

import { db } from "@/lib/db";

export async function getFilterOptions() {
  const [shapers, locations] = await Promise.all([
    db.surfboard.findMany({
      where: { status: "AVAILABLE", shaper: { not: null } },
      select: { shaper: true },
      distinct: ["shaper"],
      orderBy: { shaper: "asc" },
    }),
    db.location.findMany({
      select: { city: true },
      distinct: ["city"],
      orderBy: { city: "asc" },
    }),
  ]);

  return {
    shapers: shapers.map((s) => s.shaper as string).filter(Boolean),
    cities: locations.map((l) => l.city),
  };
}
