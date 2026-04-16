import { Suspense } from "react";
import { db } from "@/lib/db";
import { BoardCard } from "@/components/boards/BoardCard";
import { BoardFilters } from "@/components/boards/BoardFilters";
import { getFilterOptions } from "./actions";
import type { SurfboardType } from "@prisma/client";

interface PageProps {
  searchParams: Promise<{
    type?: string;
    minVolume?: string;
    maxVolume?: string;
    minSize?: string;
    maxSize?: string;
    shaper?: string;
    city?: string;
    q?: string;
  }>;
}

export default async function BoardsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { type, minVolume, maxVolume, minSize, maxSize, shaper, city, q } = params;

  const [boards, filterOptions] = await Promise.all([
    db.surfboard.findMany({
      where: {
        status: "AVAILABLE",
        ...(type && type !== "all" && { type: type as SurfboardType }),
        ...(shaper && shaper !== "all" && { shaper }),
        ...(city && city !== "all"
          ? { location: { city } }
          : {}),
        ...(minVolume || maxVolume
          ? {
              volumeLiters: {
                ...(minVolume ? { gte: parseFloat(minVolume) } : {}),
                ...(maxVolume ? { lte: parseFloat(maxVolume) } : {}),
              },
            }
          : {}),
        ...(minSize || maxSize
          ? {
              sizeInches: {
                ...(minSize ? { gte: parseFloat(minSize) } : {}),
                ...(maxSize ? { lte: parseFloat(maxSize) } : {}),
              },
            }
          : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { type: { equals: q.toUpperCase() as SurfboardType } },
                { location: { city: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      include: {
        location: { select: { city: true, town: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    getFilterOptions(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pranchas Disponíveis</h1>
        <p className="text-muted-foreground mt-1">
          {boards.length} prancha{boards.length !== 1 ? "s" : ""} disponível{boards.length !== 1 ? "is" : ""}
        </p>
      </div>

      <div className="flex gap-8 items-start">
        {/* Sidebar filters */}
        <Suspense fallback={null}>
          <BoardFilters shapers={filterOptions.shapers} cities={filterOptions.cities} />
        </Suspense>

        {/* Board grid */}
        <div className="flex-1 min-w-0">
          {boards.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
              <div className="text-5xl mb-4">🏄</div>
              <p className="font-semibold text-lg">Nenhuma prancha encontrada</p>
              <p className="text-muted-foreground text-sm mt-1">
                Tente remover alguns filtros para ver mais opções.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {boards.map((board) => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
