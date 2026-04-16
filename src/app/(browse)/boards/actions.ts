"use server";

import { db } from "@/lib/db";

export async function getFilterOptions() {
  const [shapers, cities, spots] = await Promise.all([
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
    db.location.findMany({
      select: { id: true, town: true, city: true },
      orderBy: [{ city: "asc" }, { town: "asc" }],
    }),
  ]);

  return {
    shapers: shapers.map((s) => s.shaper as string).filter(Boolean),
    cities: cities.map((l) => l.city),
    spots: spots.map((s) => ({
      id: s.id,
      label: `${s.town} - ${s.city}`,
      city: s.city,
    })),
  };
}
