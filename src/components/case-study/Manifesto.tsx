import { RevealOnView } from "./RevealOnView";

export function Manifesto() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnView>
          <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;Why I&apos;m doing this
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight mb-12">
            We&apos;re in the middle of a transition.
          </h2>
        </RevealOnView>
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl" style={{ color: "var(--cs-ink-soft)" }}>
          <RevealOnView delay={0.12} as="p">
            The way we built digital products five years ago — the way I was trained, the way most teams still operate — is already a legacy process. Design tools, specification flows, handoffs between design and engineering, the relationship between thinking and making: all of it was shaped for a world where a person executed every step by hand. That world is ending.
          </RevealOnView>
          <p>
            Six months ago, Figma was my main tool to create and frame ideas. Now I open a shaping document. A new way is forming in real time, where AI is embedded in the loop from framing to shipping, and where the best work comes from people who know which questions to ask the machine and which decisions to keep for themselves.
          </p>
          <p className="font-serif italic text-2xl leading-snug" style={{ color: "var(--cs-ink)" }}>
            I don&apos;t want to watch this transition. I want to be inside it.
          </p>
          <p>
            This series of experiments is how I&apos;m doing that. Each one is designed to let me practice a different part of the new loop — to understand what AI does well, where it fails, where human judgment has to stay editorial, and what a working process actually looks like when you build it around AI rather than bolt AI onto the old one. The goal isn&apos;t to ship side projects. It&apos;s to develop a process I trust.
          </p>
          <p>
            <strong className="font-semibold" style={{ color: "var(--cs-ink)" }}>WavyClub is №02.</strong> SurfsUp — an existing surf rental product — is the reference. A fixed target removes the blank-page problem and turns every decision into one about interpretation, structure, and taste. That&apos;s where the learning lives.
          </p>
        </div>
      </div>
    </section>
  );
}
