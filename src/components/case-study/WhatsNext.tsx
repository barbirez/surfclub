const NEXT = [
  {
    title: "Payment flow",
    body: "The next build, and the one most likely to reveal new problems.",
  },
  {
    title: "Inventory management",
    body: "The first operational bottleneck as the product scales.",
  },
  {
    title: "Cancel & reschedule",
    body: "The biggest post-launch friction point still unresolved.",
  },
];

export function WhatsNext() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "var(--cs-ink-muted)" }}>
          ✦ &nbsp;What&apos;s next for WavyClub
        </p>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight max-w-3xl mb-16">
          The honest list of what&apos;s still missing.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEXT.map((n, i) => (
            <div
              key={i}
              className="p-8 border rounded-2xl"
              style={{ borderColor: "var(--cs-rule)", background: "var(--cs-bg-alt)" }}
            >
              <div className="font-mono text-xs mb-5" style={{ color: "var(--cs-accent)" }}>
                /next/0{i + 1}
              </div>
              <h3 className="font-serif text-2xl leading-snug mb-4" style={{ color: "var(--cs-ink)" }}>
                {n.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
                {n.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
