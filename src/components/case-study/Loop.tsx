const STAGES = [
  { id: "01", name: "FRAME", question: "what problem is this actually solving, and for whom?" },
  { id: "02", name: "SHAPE", question: "what's the appetite, and what fits inside it?" },
  { id: "03", name: "BREADBOARD", question: "what are the places, the affordances, and the data this needs?" },
  { id: "04", name: "BUILD", question: "how do I keep AI moving without losing the taste?" },
  { id: "05", name: "SHIP", question: "what's the smallest version that tells the truth about the idea?" },
];

export function Loop() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-20">
          <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;The loop I&apos;m developing
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
            Five stages, each with the question it&apos;s built to ask.
          </h2>
          <p className="mt-8 text-lg leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
            Each section that follows walks one stage. The stages are what I&apos;m practicing. The product is the evidence they work.
          </p>
        </div>

        {/* Loop diagram */}
        <div className="rounded-3xl border p-10 md:p-14 overflow-hidden" style={{ borderColor: "var(--cs-rule)", background: "#FFFFFF" }}>
          {/* Return arc */}
          <div className="relative mb-2 hidden md:block" style={{ height: "56px" }}>
            <svg viewBox="0 0 900 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
              {/* dashed arc from right back to left */}
              <path
                d="M 820 50 C 820 16, 80 16, 80 50"
                stroke="#22c55e"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                fill="none"
              />
              {/* arrowhead pointing down on left */}
              <path d="M 80 50 L 75 40 M 80 50 L 85 40" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {/* label */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 text-sm italic px-3"
              style={{ color: "#22c55e", fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}
            >
              each experiment teaches the next
            </div>
          </div>

          {/* Circles + arrows row */}
          <div className="flex items-center justify-between gap-2 md:gap-0">
            {STAGES.map((stage, idx) => (
              <div key={stage.id} className="flex items-center gap-2 md:gap-0 flex-1">
                {/* Stage column */}
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[9px] tracking-[0.18em] uppercase mb-2" style={{ color: "var(--cs-ink-muted)" }}>
                    Stage {stage.id}
                  </div>
                  {/* Circle */}
                  <div
                    className="flex items-center justify-center rounded-full text-[11px] font-bold tracking-[0.12em] uppercase"
                    style={{
                      width: "clamp(80px, 13vw, 130px)",
                      height: "clamp(80px, 13vw, 130px)",
                      background: "#c4b5fd",
                      color: "#3b0764",
                      fontSize: "clamp(9px, 1.1vw, 13px)",
                    }}
                  >
                    {stage.name}
                  </div>
                  {/* Question */}
                  <p
                    className="text-center mt-4 italic leading-snug"
                    style={{
                      color: "var(--cs-ink-soft)",
                      maxWidth: "130px",
                      fontSize: "clamp(10px, 1vw, 12px)",
                    }}
                  >
                    {stage.question}
                  </p>
                </div>

                {/* Arrow between stages */}
                {idx < STAGES.length - 1 && (
                  <div className="hidden md:flex items-center flex-shrink-0 -mt-10" style={{ color: "var(--cs-ink)" }}>
                    <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                      <line x1="0" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M18 2 L26 7 L18 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="mt-10 pt-6 border-t text-[10px] tracking-[0.2em] uppercase text-center" style={{ borderColor: "var(--cs-rule)", color: "var(--cs-ink-muted)" }}>
            WavyClub &nbsp;·&nbsp; Case Study &nbsp;·&nbsp; Barbara Rezende
          </p>
        </div>
      </div>
    </section>
  );
}
