import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasAccess } from "@/lib/subscription";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Droplets, Ruler, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReservationModal } from "@/components/reservations/ReservationModal";
import { BoardCard } from "@/components/boards/BoardCard";
import { BoardDetailImage } from "@/components/boards/BoardDetailImage";

const BOARD_TYPE_LABELS: Record<string, string> = {
  SHORTBOARD: "Shortboard",
  LONGBOARD: "Longboard",
  FISH: "Fish",
  FUNBOARD: "Funboard",
  GUN: "Gun",
  SUP: "SUP",
  FOIL: "Foil",
};

export default async function BoardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Auth is optional — page is public
  const session = await auth();

  const board = await db.surfboard.findUnique({
    where: { id },
    include: { location: true },
  });

  if (!board || board.status !== "AVAILABLE") notFound();

  // Determine access level
  let userHasAccess = false;
  let isLoggedIn = false;

  if (session?.user?.id) {
    isLoggedIn = true;
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (user) userHasAccess = hasAccess(user);
  }

  const today = new Date();
  const twoMonthsOut = new Date(today);
  twoMonthsOut.setMonth(twoMonthsOut.getMonth() + 2);

  const unavailability = await db.availability.findMany({
    where: {
      surfboardId: id,
      date: { gte: today, lte: twoMonthsOut },
      isAvailable: false,
    },
    select: { date: true },
  });

  const unavailableDates = unavailability.map(
    (a) => a.date.toISOString().split("T")[0]
  );

  const otherBoards = await db.surfboard.findMany({
    where: { status: "AVAILABLE", id: { not: id } },
    include: { location: { select: { city: true, town: true } } },
    orderBy: [{ type: "asc" }, { createdAt: "desc" }],
    take: 4,
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Back */}
      <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
        <Link href="/boards">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Pranchas
        </Link>
      </Button>

      {/* ── Top section: image + info ── */}
      <div className="grid gap-8 md:grid-cols-2 items-start">
        {/* Left: board image with flip */}
        <BoardDetailImage
          frontImage={board.images[0]}
          backImage={board.images[1]}
          name={board.name}
        />

        {/* Right: details */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              {BOARD_TYPE_LABELS[board.type] || board.type}
            </Badge>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
              Disponível
            </Badge>
          </div>

          <div>
            <h1 className="text-3xl font-bold leading-tight">{board.name}</h1>
            {board.shaper && (
              <p className="text-muted-foreground flex items-center gap-1.5 mt-1.5 text-sm">
                <User className="h-3.5 w-3.5" />
                {board.shaper}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-secondary p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Ruler className="h-3.5 w-3.5" />
                Tamanho
              </div>
              <p className="font-semibold">{board.size}</p>
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Droplets className="h-3.5 w-3.5" />
                Volume
              </div>
              <p className="font-semibold">{board.volumeLiters}L</p>
            </div>
          </div>

          {(board.description || board.conditionProfile) && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm mb-1.5">Descrição</h3>
              {board.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {board.description}
                </p>
              )}
              {board.conditionProfile && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {board.conditionProfile}
                </p>
              )}
            </div>
          )}

          <ReservationModal
            surfboardId={board.id}
            locationId={board.location.id}
            boardName={board.name}
            boardImage={board.images?.[0]}
            pickupInstructions={board.location.pickupInstructions}
            returnInstructions={board.location.returnInstructions}
            unavailableDates={unavailableDates}
            hasAccess={userHasAccess}
            isLoggedIn={isLoggedIn}
          />

          {/* ── Location ── */}
          <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Local de Retirada
            </h3>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Endereço</p>
              <p className="font-medium text-sm">{board.location.town}, {board.location.city}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{board.location.address}</p>
            </div>
            <div className="rounded-lg bg-secondary border border-border p-3">
              <p className="text-xs font-semibold mb-1">Instruções de retirada</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {board.location.pickupInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Other boards ── */}
      {otherBoards.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Outras pranchas disponíveis</h2>
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
                <Link href="/boards">Ver todas →</Link>
              </Button>
            </div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
              {otherBoards.map((b) => (
                <BoardCard key={b.id} board={b} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
