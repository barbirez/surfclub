export function Divider({ label }: { label?: string }) {
  return (
    <div className="cs-divider mx-auto max-w-5xl px-6 py-16">
      {label ? <span>{label}</span> : <span>✦</span>}
    </div>
  );
}

export function StagesMarquee() {
  const items = [
    "FRAME",
    "SHAPE",
    "BREADBOARD",
    "BUILD",
    "SHIP",
  ];
  const repeated = Array.from({ length: 6 }, () => items).flat();
  return (
    <div className="overflow-hidden border-y" style={{ borderColor: "var(--cs-rule)" }}>
      <div className="cs-marquee py-4 text-sm tracking-[0.2em] uppercase" style={{ color: "var(--cs-ink-soft)" }}>
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
            <span aria-hidden>✦</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
