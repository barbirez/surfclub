export function StageHeader({
  num,
  name,
  question,
}: {
  num: string;
  name: string;
  question: string;
}) {
  return (
    <div className="mb-16 max-w-3xl">
      <p className="text-xs tracking-[0.22em] uppercase mb-4" style={{ color: "var(--cs-ink-muted)" }}>
        ✦ &nbsp;Stage {num}
      </p>
      <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-6">
        {name}
      </h2>
      <p className="font-serif italic text-2xl md:text-3xl leading-snug" style={{ color: "var(--cs-ink-soft)" }}>
        {question}
      </p>
    </div>
  );
}
