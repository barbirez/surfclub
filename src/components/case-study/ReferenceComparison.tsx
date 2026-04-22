"use client"

import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal"

export function ReferenceComparison() {
  return (
    <section className="py-24" style={{ background: "var(--cs-bg)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "var(--cs-ink-muted)" }}>
          ✦ &nbsp;Side by side
        </p>
        <h2 className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] tracking-tight max-w-3xl mb-4" style={{ color: "var(--cs-ink)" }}>
          Same problem. Different interpretation.
        </h2>
        <p className="text-base leading-relaxed max-w-2xl mb-12" style={{ color: "var(--cs-ink-soft)" }}>
          Drag to compare the board listing screen from SurfsUp (reference) against WavyClub (this build).
        </p>

        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--cs-rule)", aspectRatio: "16/9" }}>
          <ImageComparisonSlider
            leftImage="/casestudy/Comparison-boardmenu-surfsup.png"
            rightImage="/casestudy/Comparison-boardmenu-wavyclub.png"
            altLeft="SurfsUp board listing"
            altRight="WavyClub board listing"
            initialPosition={50}
          />
        </div>

        <div className="flex justify-between mt-4 text-xs tracking-[0.14em] uppercase" style={{ color: "var(--cs-ink-muted)" }}>
          <span>← SurfsUp</span>
          <span>WavyClub →</span>
        </div>
      </div>
    </section>
  )
}
