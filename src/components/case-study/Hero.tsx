import Image from "next/image";

export function Hero() {
  return (
    <section className="relative">
      {/* Top meta bar */}
      <div className="mx-auto max-w-7xl px-6 pt-10 flex items-center justify-between text-xs tracking-[0.18em] uppercase" style={{ color: "var(--cs-ink-muted)" }}>
        <span>Barbara Rezende — Case Study</span>
        <span>Experiments in building with AI &nbsp;·&nbsp; №02</span>
      </div>

      {/* Headline block */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-20">
        <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "var(--cs-accent)" }}>
          ✦ &nbsp;Wavyclub
        </p>
        <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight cs-rise">
          A two-day experiment <br />
          in building real products <br />
          <em className="italic" style={{ color: "var(--cs-ink-soft)" }}>with AI in the loop.</em>
        </h1>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
          The product is the evidence. The process is the point.
        </p>

        {/* Meta line */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm" style={{ color: "var(--cs-ink-soft)" }}>
          <MetaItem label="Duration" value="2 days" />
          <MetaItem label="Team" value="1 designer-engineer" />
          <MetaItem label="Method" value="AI-assisted build" />
          <MetaItem label="Stack" value="Next.js + Vercel" />
        </div>
      </div>

      {/* Hero split-screen visual */}
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left: shaping.md mock */}
          <div className="rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: "var(--cs-rule)", background: "#FFFFFF" }}>
            <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: "var(--cs-rule)" }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E2DCD0" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E2DCD0" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E2DCD0" }} />
              <span className="ml-3 text-xs" style={{ color: "var(--cs-ink-muted)" }}>shaping.md</span>
            </div>
            <pre className="px-6 py-6 text-[11px] leading-relaxed font-mono whitespace-pre-wrap" style={{ color: "var(--cs-ink-soft)" }}>
{`# WavyClub — Shaping

## Problem
Surfers without the right board for the
session — travelers, or local quivers
mismatched to today's swell.

## Appetite
1 day build + 1 buffer day.
Decided before scoping a single feature.

## Solution outline
P1 Landing → P2 Board menu → P3 Detail
→ P4 Reservation → P5 Disclosure → P6 ✓

## What's out
× User accounts (V1)
× In-app payment (V1)
× Delivery — pickup only`}
            </pre>
          </div>

          {/* Right: live landing screenshot mock */}
          <div className="rounded-2xl overflow-hidden border relative aspect-[4/5] md:aspect-auto" style={{ borderColor: "var(--cs-rule)", background: "var(--cs-product-bg)" }}>
            <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
              <span className="ml-3 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>wavyclub.app</span>
            </div>
            <div className="relative w-full h-full" style={{ minHeight: "420px" }}>
              <Image
                src="/hero-beach.jpg"
                alt="WavyClub landing page"
                fill
                className="object-cover opacity-90"
                priority
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10" style={{ background: "linear-gradient(to top, rgba(26,29,41,0.85), rgba(26,29,41,0.1))" }}>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: "#F5C542" }}>
                  Unlimited surfboards
                </p>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: "var(--cs-product-ink)" }}>
                  The right board, <br />wherever you surf.
                </h2>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-xs tracking-wider uppercase text-center" style={{ color: "var(--cs-ink-muted)" }}>
          From text document to shipped Next.js / Vercel app — in 48 hours.
        </p>
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--cs-ink-muted)" }}>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
