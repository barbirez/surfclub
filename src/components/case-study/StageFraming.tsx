import Image from "next/image";
import { StageHeader } from "./StageHeader";

const SCENARIOS = [
  {
    label: "Scenario A",
    title: "The traveling surfer",
    body: "Arrives in a new place without a board. Wants equipment access that feels as simple as hotel check-in.",
    img: "/cs-wavyclub-thaveller.png",
    alt: "Illustration of a traveling surfer at a rental counter",
  },
  {
    label: "Scenario B",
    title: "The wrong-board-for-today surfer",
    body: "Has their own quiver, but the swell doesn't match what's in the car. Wants to swap into an appropriate shape for the session — not commit to a week of the wrong board.",
    img: "/cs-wavyclub-wrongboard.png",
    alt: "Illustration of a surfer with the wrong board at their car",
  },
];

export function StageFraming() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="01"
          name="Framing"
          question="What problem is this actually solving, and for whom?"
        />

        <p className="text-lg leading-relaxed max-w-3xl mb-12" style={{ color: "var(--cs-ink-soft)" }}>
          Before any design, two scenarios had to be specific.
        </p>

        {/* Scenario cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {SCENARIOS.map((s) => (
            <div
              key={s.label}
              className="border rounded-2xl overflow-hidden"
              style={{ borderColor: "var(--cs-rule)", background: "#FFFFFF" }}
            >
              <div className="pt-8 px-px">
                <div className="relative w-full" style={{ paddingTop: "56%" }}>
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="p-8 pt-6">
                <p className="text-xs tracking-[0.22em] uppercase mb-4" style={{ color: "var(--cs-accent)" }}>
                  {s.label}
                </p>
                <h3 className="font-serif text-2xl leading-tight mb-4" style={{ color: "var(--cs-ink)" }}>
                  {s.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-lg leading-relaxed max-w-3xl" style={{ color: "var(--cs-ink-soft)" }}>
          Different motivations, same barrier. Naming them at this resolution — not <em>users who rent boards</em> — is what made the later decisions possible. It&apos;s the section of the process where most side projects stay vague, and where staying vague costs the most.
        </p>
      </div>
    </section>
  );
}
