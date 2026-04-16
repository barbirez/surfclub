import type { SurfboardType } from "@prisma/client";

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
    dimensions?: string | null;
    finSetup?: string | null;
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
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
        Especificações
      </h3>
      <div>
        <SpecRow label="Indicada para" value={board.conditionProfile} />
        <SpecRow label="Tipo" value={BOARD_TYPE_LABELS[board.type] || board.type} />
        <SpecRow label="Shaper" value={board.shaper} />
        <SpecRow label="Volume" value={`${board.volumeLiters}L`} />
        <SpecRow label="Tamanho" value={board.size} />
        <SpecRow label="Dimensão" value={board.dimensions} />
        <SpecRow label="1ª Opção de Quilha" value={board.finSetup} />
      </div>
    </section>
  );
}
