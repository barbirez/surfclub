"use client";

import { useEffect, useRef, useState } from "react";
import { BoardCard } from "./BoardCard";

interface Board {
  id: string;
  name: string;
  type: string;
  shaper?: string | null;
  size: string;
  volumeLiters: number;
  images: string[];
  conditionProfile?: string | null;
  location: { city: string; town: string };
}

export function BoardCarousel({ boards }: { boards: Board[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Duplicate boards for seamless infinite loop
  const items = [...boards, ...boards];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || paused) return;

    let raf: number;
    const speed = 0.5; // px per frame

    function step() {
      if (!el) return;
      el.scrollLeft += speed;

      // Reset to start when halfway (the duplicated set)
      const halfWidth = el.scrollWidth / 2;
      if (el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }

      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  if (boards.length === 0) return null;

  return (
    <div className="relative overflow-hidden py-8">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="flex gap-4 overflow-x-hidden px-4"
        style={{ scrollBehavior: "auto" }}
      >
        {items.map((board, i) => (
          <div key={`${board.id}-${i}`} className="w-64 shrink-0">
            <BoardCard board={board} />
          </div>
        ))}
      </div>
    </div>
  );
}
