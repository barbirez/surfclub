import { RevealOnView } from "./RevealOnView";
import { StageHeader } from "./StageHeader";

export function StageShaping() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="02"
          name="Shaping"
          question="What's the appetite, and what fits inside it?"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-7 space-y-8 text-lg leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
            <RevealOnView delay={0.12} as="p" className="font-serif text-2xl md:text-3xl leading-snug" style={{ color: "var(--cs-ink)" }}>
              One day to build, one day as buffer. Decided <em>before</em> I scoped a single feature.
            </RevealOnView>
            <p>
              This is the hardest discipline to keep when working with AI, because adding is cheap. The temptation to keep extending scope is constant — another feature is always one prompt away. Setting time before features is the constraint that makes AI-assisted building honest. Without it, the tool accelerates drift.
            </p>
            <p>
              The second time through the shaping process was different from the first. The first time I was learning the form. The second time I could feel which decisions mattered and which were noise — which is what a practice actually is.
            </p>
          </div>

          {/* Appetite card */}
          <div className="md:col-span-5">
            <div className="rounded-2xl border p-8 sticky top-8" style={{ borderColor: "var(--cs-rule)", background: "#FFFFFF" }}>
              <p className="text-xs tracking-[0.22em] uppercase mb-5" style={{ color: "var(--cs-ink-muted)" }}>
                Appetite
              </p>
              <div className="font-serif text-5xl leading-none mb-2" style={{ color: "var(--cs-ink)" }}>
                1<span style={{ color: "var(--cs-ink-muted)" }}> + </span>1
              </div>
              <p className="text-sm mb-8" style={{ color: "var(--cs-ink-soft)" }}>
                day build &nbsp;·&nbsp; day buffer
              </p>
              <div className="border-t pt-6" style={{ borderColor: "var(--cs-rule)" }}>
                <p className="text-xs tracking-[0.18em] uppercase mb-3" style={{ color: "var(--cs-ink-muted)" }}>
                  Out of scope
                </p>
                <ul className="space-y-2 text-sm" style={{ color: "var(--cs-ink-soft)" }}>
                  <li>× User accounts (V1)</li>
                  <li>× In-app payments (V1)</li>
                  <li>× Delivery — pickup only</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
