import { Suspense } from "react";
import { db } from "@/lib/db";
import { BoardCard } from "@/components/boards/BoardCard";
import { BoardFilters } from "@/components/boards/BoardFilters";
import type { SurfboardType } from "@prisma/client";

interface PageProps {
  searchParams: Promise<{
    type?: string;
    level?: string;
    minVolume?: string;
    maxVolume?: string;
    locationId?: string;
  }>;
}

export default async function BoardsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { type, level, minVolume, maxVolume, locationId } = params;

  const boards = await db.surfboard.findMany({
    where: {
      status: "AVAILABLE",
      ...(locationId && { locationId }),
      ...(type && type !== "all" && { type: type as SurfboardType }),
      ...(minVolume || maxVolume
        ? {
            volumeLiters: {
              ...(minVolume ? { gte: parseFloat(minVolume) } : {}),
              ...(maxVolume ? { lte: parseFloat(maxVolume) } : {}),
            },
          }
        : {}),
      ...(level && level !== "all"
        ? { conditionProfile: { contains: level, mode: "insensitive" } }
        : {}),
    },
    include: {
      location: { select: { city: true, town: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pranchas Disponíveis</h1>
        <p className="text-muted-foreground mt-1">
          {boards.length} prancha{boards.length !== 1 ? "s" : ""} disponível{boards.length !== 1 ? "is" : ""}
        </p>
      </div>

      <Suspense fallback={null}>
        <BoardFilters />
      </Suspense>

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
  );
}
