"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { BoardCard } from "./BoardCard";
import { useT } from "@/lib/i18n/client";

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
  const [paused, setPaused] = useState(false);
  const items = [...boards, ...boards];
  const { t } = useT();
  const c = t.boardsCarousel;

  if (boards.length === 0) return null;

  return (
    <div className="py-20 space-y-10">
      <style>{`
        @keyframes carousel-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .carousel-track {
          animation: carousel-scroll 40s linear infinite;
        }
        .carousel-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section header */}
      <motion.div
        className="text-center space-y-4 px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-sm font-bold uppercase tracking-widest text-primary-light">
          {c.eyebrow}
        </p>
        <h2 className="text-4xl font-extrabold sm:text-5xl">
          {c.title}
        </h2>
      </motion.div>

      {/* Carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

        <div className="[overflow-x:clip] px-4 py-6">
          <div
            className={`carousel-track flex gap-6${paused ? " paused" : ""}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {items.map((board, i) => (
              <div key={`${board.id}-${i}`} className="w-64 shrink-0">
                <BoardCard board={board} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
