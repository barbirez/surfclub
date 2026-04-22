import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal"

export function Reference() {
  return (
    <section className="py-24" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "var(--cs-ink-muted)" }}>
          ✦ &nbsp;The reference, and why I used one
        </p>
        <p className="font-serif text-3xl md:text-4xl leading-snug mb-8" style={{ color: "var(--cs-ink)" }}>
          SurfsUp solves a real problem: matching surfers to the right rental board. The core flow works.
        </p>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--cs-ink-soft)" }}>
          I chose it because I already use it. I&apos;m a partner through my <a href="https://www.youtube.com/@FinFunSurf/featured" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: "var(--cs-ink)" }}>YouTube channel</a>, and I know the system from the inside. I love the solution — which is exactly what made it the right reference. The small gaps that keep an experience from being delightful only reveal themselves once you&apos;ve lived with a product long enough to stop noticing them.
        </p>
        <p className="font-serif italic text-2xl mt-10 mb-10" style={{ color: "var(--cs-ink)" }}>
          The comparison isn&apos;t the point. The interpretation is.
        </p>

        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--cs-rule)", aspectRatio: "16/9" }}>
          <ImageComparisonSlider
            leftImage="/casestudy/Comparison-boardmenu-surfsup.png"
            rightImage="/casestudy/Comparison-boardmenu-wavyclub.png"
            altLeft="SurfsUp board listing"
            altRight="WavyClub board listing"
            initialPosition={50}
            autoPeek
          />
        </div>
        <div className="flex justify-between mt-4 text-xs tracking-[0.14em] uppercase" style={{ color: "var(--cs-ink-muted)" }}>
          <span>← SurfsUp</span>
          <span>WavyClub →</span>
        </div>
      </div>
    </section>
  );
}
