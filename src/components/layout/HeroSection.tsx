"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";

const TRUST_SIGNALS = [
  "Cadastro em 2 minutos",
  "80+ picos no Brasil",
  "Cobertura de danos incluída",
  "Clube de vantagens",
];

const YT_SRC =
  "https://www.youtube-nocookie.com/embed/o8kisgyhnos" +
  "?autoplay=1&mute=1&controls=0&loop=1&playlist=o8kisgyhnos" +
  "&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0" +
  "&playsinline=1&start=8&end=53";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background layer: fallback image → video fade-in */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0a1220]">
          {/* Poster image — visible instantly, stays underneath */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-video-poster.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* YouTube iframe — fades in once loaded */}
          <iframe
            src={YT_SRC}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            onLoad={() => {
              // Buffer ~1.5 s after iframe load so the video is actually playing
              setTimeout(() => setVideoReady(true), 500);
            }}
            style={{
              position: "absolute",
              width: "100vw",
              height: "56.25vw",
              minHeight: "100%",
              minWidth: "177.78vh",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "none",
              pointerEvents: "none",
              opacity: videoReady ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

        <div className="relative w-full px-4 sm:px-6 lg:px-20 py-32">
          <div className="max-w-xl">
            <motion.h1
              className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              Sua próxima sessão de surf começa aqui!
            </motion.h1>

            <motion.p
              className="mt-6 text-lg leading-relaxed text-white/75 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            >
              Acesso ilimitado a pranchas de surf e todas as vantagens que os surfistas precisam.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            >
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-base font-semibold rounded-full shadow-lg"
              >
                <Link href="/boards">
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base rounded-full backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Link href="/#pricing">Ver planos</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <motion.div
        className="border-y border-border/50 bg-card/40 px-4 py-[50px] sm:px-6 lg:px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
      >
        <div className="mx-auto max-w-6xl flex flex-wrap justify-center gap-x-10 gap-y-3">
          {TRUST_SIGNALS.map((signal, i) => (
            <motion.div
              key={signal}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground/55"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.9 + i * 0.07 }}
            >
              <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              {signal}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
