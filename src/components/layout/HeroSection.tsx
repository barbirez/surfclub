"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const cities = ["Floripa", "Rio de Janeiro", "Ubatuba", "Itacaré", "Bahia"];

const SPOTLIGHT_BOARDS = [
  {
    src: "/boards/surfboard-1.png",
    label: "Shortboard",
    rotate: "-rotate-6",
    z: "z-10",
    translate: "-translate-x-8 translate-y-4",
  },
  {
    src: "/boards/surfboard-2.png",
    label: "Fish",
    rotate: "rotate-0",
    z: "z-20",
    translate: "translate-x-0 -translate-y-2",
  },
  {
    src: "/boards/surfboard-3.png",
    label: "Longboard",
    rotate: "rotate-6",
    z: "z-10",
    translate: "translate-x-8 translate-y-4",
  },
];

function SpotlightCard({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      style={{ width: 160, height: 260 }}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(circle 120px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.12), transparent 70%)`,
        }}
      />
      {/* Board image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="h-full w-full object-contain p-4"
      />
      {/* Label */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-xs font-medium text-white/70 backdrop-blur-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [cityIndex, setCityIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCityIndex((i) => (i + 1) % cities.length);
        setVisible(true);
      }, 300);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pt-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[700px] w-[700px] rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            {/* Animated city tag */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="text-sm text-muted-foreground">Chegou em</span>
              <span
                className="text-sm font-semibold text-primary transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-6px)",
                }}
              >
                {cities[cityIndex]}
              </span>
              <span className="text-base">🏄</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Prancha esperando.
              <br />
              <span className="text-primary">Bora.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed lg:mx-0">
              Assine e tenha acesso a um quiver completo. Escolha a prancha certa
              para as condições do dia, retire, surfe e devolva. Simples assim.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-base font-semibold"
              >
                <Link href="/boards">
                  Escolher minha prancha
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base"
              >
                <Link href="/pricing">Ver planos</Link>
              </Button>
            </div>
          </div>

          {/* Right: spotlight cards */}
          <div className="relative flex shrink-0 items-end justify-center gap-2 px-4 lg:px-0">
            {SPOTLIGHT_BOARDS.map((board, i) => (
              <div
                key={i}
                className={`${board.rotate} ${board.z} ${board.translate} transition-transform duration-500 hover:scale-105 hover:z-30`}
              >
                <SpotlightCard src={board.src} label={board.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
