"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const BOARD_TYPE_LABELS: Record<string, string> = {
  SHORTBOARD: "Shortboard",
  LONGBOARD: "Longboard",
  FISH: "Fish",
  FUNBOARD: "Funboard",
  GUN: "Gun",
  SUP: "SUP",
  FOIL: "Foil",
};

interface BoardCardProps {
  board: {
    id: string;
    name: string;
    type: string;
    shaper?: string | null;
    size: string;
    volumeLiters: number;
    images: string[];
    conditionProfile?: string | null;
    location: { city: string; town: string };
  };
}

export function BoardCard({ board }: BoardCardProps) {
  const frontImage = board.images[0];
  const backImage = board.images[1];
  const hasFlip = !!(frontImage && backImage);

  return (
    <Link href={`/boards/${board.id}`} className="group block">
      <Card className="h-full overflow-hidden border-border/50 py-0 gap-0 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
        {/* Flip container */}
        <div
          className="relative aspect-[3/4] bg-secondary"
          style={{ perspective: "900px" }}
        >
          <style>{`
            .board-flip-inner {
              transform-style: preserve-3d;
              transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .group:hover .board-flip-inner {
              transform: rotateY(180deg);
            }
          `}</style>

          <div className="board-flip-inner absolute inset-0">
            {/* Front face */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden" }}
            >
              {frontImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={frontImage}
                  alt={board.name}
                  className="h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-5xl opacity-20">🏄</div>
                </div>
              )}
            </div>

            {/* Back face */}
            {hasFlip && (
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={backImage}
                  alt={`${board.name} — verso`}
                  className="h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
          </div>

          {/* Hover button overlay (sits above the flip) */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center pb-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              size="sm"
              className="pointer-events-none font-semibold tracking-wide shadow-lg"
            >
              VER PRANCHA
            </Button>
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-4 gap-2">
          <p className="font-semibold leading-tight truncate">{board.name}</p>
          <p className="text-xs text-muted-foreground tracking-tight">
            {board.size}&nbsp;&nbsp;|&nbsp;&nbsp;{board.volumeLiters}L&nbsp;&nbsp;|&nbsp;&nbsp;{BOARD_TYPE_LABELS[board.type] ?? board.type}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto pt-1">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{board.location.town}, {board.location.city}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
