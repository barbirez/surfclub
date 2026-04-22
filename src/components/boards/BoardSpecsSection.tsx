"use client";

import type { SurfboardType } from "@prisma/client";
import { useT } from "@/lib/i18n/client";

const BOARD_TYPE_LABELS: Record<string, string> = {
  SHORTBOARD: "Shortboard",
  LONGBOARD: "Longboard",
  FISH: "Fish",
  FUNBOARD: "Funboard",
  GUN: "Gun",
  SUP: "SUP",
  FOIL: "Foil",
};

interface BoardSpecsProps {
  board: {
    type: SurfboardType;
    shaper?: string | null;
    size: string;
    volumeLiters: number;
    conditionProfile?: string | null;
    conditionProfileEn?: string | null;
  };
}

interface SpecRowProps {
  label: string;
  value?: string | null;
}

function SpecRow({ label, value }: SpecRowProps) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  );
}

export function BoardSpecsSection({ board }: BoardSpecsProps) {
  const { t, locale } = useT();
  const d = t.boardDetail;
  const conditionProfile =
    (locale === "en" && board.conditionProfileEn) || board.conditionProfile;

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
        {d.specs}
      </h3>
      <div>
        <SpecRow label={d.idealFor} value={conditionProfile} />
        <SpecRow label={d.type} value={BOARD_TYPE_LABELS[board.type] || board.type} />
        <SpecRow label={d.shaper} value={board.shaper} />
        <SpecRow label={d.volume} value={`${board.volumeLiters}L`} />
        <SpecRow label={d.size} value={board.size} />
      </div>
    </section>
  );
}
