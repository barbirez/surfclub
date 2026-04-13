"use client";

import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Link from "next/link";

interface TrialBannerProps {
  daysLeft: number;
}

export function TrialBanner({ daysLeft }: TrialBannerProps) {
  if (daysLeft <= 0) return null;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-accent/20 bg-accent/10 px-4 py-2.5">
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4 text-accent" />
        <span className="text-foreground">
          <span className="font-semibold text-accent">{daysLeft} dias</span> restantes no seu período de avaliação.
        </span>
      </div>
      <Button
        asChild
        size="sm"
        className="h-7 bg-accent px-3 text-xs font-semibold text-accent-foreground hover:bg-accent/90"
      >
        <Link href="/settings/billing">Fazer upgrade</Link>
      </Button>
    </div>
  );
}
