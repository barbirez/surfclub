"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { DestinationCard } from "@/components/ui/destination-card";
import { useT } from "@/lib/i18n/client";

const EASE = [0.16, 1, 0.3, 1] as const;

const DESTINATIONS = [
  {
    id: "bahia",
    title: "Bahia",
    category: "Nordeste",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sao-paulo",
    title: "São Paulo",
    category: "Sudeste",
    imageUrl:
      "https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rio-de-janeiro",
    title: "Rio de Janeiro",
    category: "Sudeste",
    imageUrl:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "santa-catarina",
    title: "Santa Catarina",
    category: "Sul",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "rio-grande-do-norte",
    title: "Rio Grande do Norte",
    category: "Nordeste",
    imageUrl:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "espirito-santo",
    title: "Espírito Santo",
    category: "Sudeste",
    imageUrl:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ceara",
    title: "Ceará",
    category: "Nordeste",
    imageUrl:
      "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=600&q=80",
  },
];

export function ExplorePlacesSection() {
  const [paused, setPaused] = useState(false);
  const { t } = useT();
  const items = [...DESTINATIONS, ...DESTINATIONS];

  return (
    <section className="py-20 space-y-10">
      <style>{`
        @keyframes places-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .places-track {
          animation: places-scroll 36s linear infinite;
        }
        .places-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <motion.div
        className="text-center space-y-4 px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="text-sm font-bold uppercase tracking-widest text-primary-light">
          {t.explore.label}
        </p>
        <h2 className="text-4xl font-extrabold sm:text-5xl">
          {t.explore.heading}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t.explore.subheading}
        </p>
      </motion.div>

      {/* Carousel */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

        <div className="[overflow-x:clip] px-4 py-4">
          <div
            className={`places-track flex gap-4${paused ? " paused" : ""}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {items.map((dest, i) => (
              <div
                key={`${dest.id}-${i}`}
                className="shrink-0"
                style={{ width: "240px", height: "360px" }}
              >
                <DestinationCard
                  imageUrl={dest.imageUrl}
                  category={dest.category}
                  title={dest.title}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
