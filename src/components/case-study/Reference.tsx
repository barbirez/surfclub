import Image from "next/image";

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
          I chose it because I already use it. I&apos;m a partner through my YouTube channel, and I know the system from the inside. I love the solution — which is exactly what made it the right reference. The small gaps that keep an experience from being delightful only reveal themselves once you&apos;ve lived with a product long enough to stop noticing them.
        </p>
        <p className="font-serif italic text-2xl mt-10 mb-14" style={{ color: "var(--cs-ink)" }}>
          The comparison isn&apos;t the point. The interpretation is.
        </p>

        {/* Scenario cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScenarioCard
            scenario="Scenario A"
            heading="The traveling surfer"
            body="Arrives in a new place without a board. Wants equipment access that feels as simple as hotel check-in."
            imageSrc="/cs-wavyclub-thaveller.png"
            imageAlt="Illustration of a traveling surfer at a rental counter"
          />
          <ScenarioCard
            scenario="Scenario B"
            heading="The wrong-board-for-today surfer"
            body="Has their own quiver, but the swell doesn't match what's in the car. Wants to swap into an appropriate shape for the session — not commit to a week of the wrong board."
            imageSrc="/cs-wavyclub-wrongboard.png"
            imageAlt="Illustration of a surfer with the wrong board at their car"
          />
        </div>
      </div>
    </section>
  );
}

function ScenarioCard({
  scenario,
  heading,
  body,
  imageSrc,
  imageAlt,
}: {
  scenario: string;
  heading: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden border flex flex-col"
      style={{ borderColor: "var(--cs-rule)", background: "#FFFFFF" }}
    >
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="px-6 pb-8 pt-5 flex flex-col gap-2">
        <p className="text-xs tracking-[0.18em] uppercase font-medium" style={{ color: "var(--cs-accent)" }}>
          {scenario}
        </p>
        <h3 className="font-serif text-xl leading-snug" style={{ color: "var(--cs-ink)" }}>
          {heading}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
          {body}
        </p>
      </div>
    </div>
  );
}
