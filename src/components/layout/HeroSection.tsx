"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const cities = ["Floripa", "Rio de Janeiro", "Ubatuba", "Itacaré", "Bahia"];

export function HeroSection() {
  const [cityIndex, setCityIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCityIndex((prev) => (prev + 1) % cities.length);
        setVisible(true);
      }, 300);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pt-32 min-h-[600px] flex items-center">
      {/* Background image */}
      <Image
        src="/hero-beach.jpg"
        alt="Beach waves at sunrise"
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />

      {/* Gradient overlay — ensures text legibility on both themes */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/75 via-background/60 to-background/85" />
      {/* Side vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

      <div className="relative mx-auto w-full max-w-4xl text-center">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Pranchas disponíveis agora
        </div>

        {/* Headline with animated city tag */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg">
          Chegou em{" "}
          <span
            className="inline-block rounded-lg bg-primary px-3 py-0.5 text-primary-foreground transition-all duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.97)",
            }}
          >
            {cities[cityIndex]}
          </span>
          .
          <br />
          Prancha esperando.{" "}
          <span className="text-primary">Bora.</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 leading-relaxed drop-shadow-sm">
          Assine e tenha acesso a um quiver completo — escolha a prancha certa para
          as condições do dia, retire, surfe e devolva. Simples assim.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="h-12 px-8 text-base font-semibold shadow-lg">
            <Link href="/boards">
              Ver pranchas disponíveis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base backdrop-blur-sm bg-background/30 border-foreground/30 hover:bg-background/50"
          >
            <Link href="/#pricing">Ver planos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
