import { RevealOnView } from "./RevealOnView";

export function Reflection() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnView>
          <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;What I learned about my own practice
          </p>

          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-12">
            The second time through a process is where it starts becoming yours.
          </h2>
        </RevealOnView>

        <div className="space-y-8 text-lg leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            The <a href="https://project-o2yph.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: "var(--cs-ink)" }}>first experiment</a> taught me the form — what shaping is, what a breadboard looks like, what it feels like to write requirements before design. This one taught me which parts of the form I can trust, and which parts need more reps. I know now that my framing is getting sharper and my shaping is getting more honest. I know I still over-specify in places AI would have found a better path, and under-specify in places where precision would have saved an hour.
          </RevealOnView>
          <p>
            The next experiment in the series will test a different constraint — probably a greenfield brief instead of a reference, to isolate the framing stage. The one after that, a project where the AI pair is embedded earlier in the loop rather than activating at Build. Each one is designed to stress a different part of the practice.
          </p>
          <p className="font-serif italic text-2xl pt-4" style={{ color: "var(--cs-ink)" }}>
            This case study is №02. There will be more.
          </p>
        </div>
      </div>
    </section>
  );
}
