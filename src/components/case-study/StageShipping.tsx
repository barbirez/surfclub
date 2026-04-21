import { StageHeader } from "./StageHeader";

const CUTS = [
  {
    title: "No user accounts in V1.",
    body: "Email confirmation is enough to test the hypothesis.",
  },
  {
    title: "No payment processing in-app.",
    body: "Handled manually. Not a technical gap — a scope decision.",
  },
  {
    title: "No delivery.",
    body: "Pickup only. Stated clearly so expectations land before friction does.",
  },
];

export function StageShipping() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="05"
          name="Shipping"
          question="What's the smallest version that tells the truth about the idea?"
        />

        <p className="text-lg leading-relaxed max-w-3xl mb-16" style={{ color: "var(--cs-ink-soft)" }}>
          Three deliberate cuts.
        </p>

        <ol className="space-y-px border-y" style={{ borderColor: "var(--cs-rule)" }}>
          {CUTS.map((cut, i) => (
            <li key={i} className="grid grid-cols-12 gap-6 py-10 border-t" style={{ borderColor: "var(--cs-rule)" }}>
              <div className="col-span-2 md:col-span-1">
                <span className="font-mono text-sm" style={{ color: "var(--cs-ink-muted)" }}>
                  ×
                </span>
              </div>
              <div className="col-span-10 md:col-span-6">
                <h3 className="font-serif text-2xl md:text-3xl leading-snug" style={{ color: "var(--cs-ink)" }}>
                  {cut.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-5">
                <p className="text-base leading-relaxed pt-2 md:pt-3" style={{ color: "var(--cs-ink-soft)" }}>
                  {cut.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="text-lg leading-relaxed max-w-3xl mt-16" style={{ color: "var(--cs-ink-soft)" }}>
          Shipping isn&apos;t the end of the loop. It&apos;s the stage where the product stops being theoretical and starts producing signal. Surface area small enough to make that signal diagnosable is itself a design decision.
        </p>
      </div>
    </section>
  );
}
