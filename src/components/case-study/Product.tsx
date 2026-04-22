const DESIGN_DECISIONS = [
  {
    title: "Tokens first, screens second.",
    body: "Color, type scale, spacing, radius — defined once, consumed everywhere. Hardcoded values are banned. The system is the decision; the screens are the consequence.",
  },
  {
    title: "Atomic, not ornamental.",
    body: "Every component is built from the same small set of primitives. A button and a card share the same spacing logic. A filter chip and a tag share the same type ramp. The constraint is what makes the visual system feel coherent — not taste applied at the end, but structure enforced from the start.",
  },
  {
    title: "Aesthetic direction, chosen fast.",
    body: "One direction, committed to early: dark-mode surfaces, considered type, a warm accent that pulls against the cool neutrals. Decided in the first two hours. Not revisited. Revisiting is the thing that eats time.",
  },
];

export function Product() {
  return (
    <section className="py-32" style={{ background: "var(--cs-product-bg)", color: "var(--cs-product-ink)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "rgba(245,243,238,0.5)" }}>
          ✦ &nbsp;The product
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight max-w-4xl mb-10">
          What &ldquo;make it look nicer&rdquo; actually meant.
        </h2>
        <p className="text-lg leading-relaxed max-w-3xl mb-20" style={{ color: "rgba(245,243,238,0.7)" }}>
          A visual system that belongs to the category. Type read as considered, not corporate. Color decisions made against real screens. Motion used where it clarifies, not where it decorates. A product that feels like it was made by someone who surfs.
        </p>

        {/* Design tokens preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Swatch hex="#3366FF" name="Primary" role="action, focus" />
          <Swatch hex="#F5C542" name="Accent" role="badges, highlights" />
          <Swatch hex="#1A1D29" name="Background" role="canvas" />
          <Swatch hex="#F5F3EE" name="Foreground" role="type" />
        </div>

        {/* Type spec */}
        <div className="rounded-2xl border p-10 mb-16" style={{ borderColor: "rgba(245,243,238,0.12)", background: "rgba(245,243,238,0.04)" }}>
          <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "rgba(245,243,238,0.5)" }}>
            Type system
          </p>
          <div className="space-y-6">
            <div className="flex flex-wrap items-baseline gap-4 pb-6 border-b" style={{ borderColor: "rgba(245,243,238,0.08)" }}>
              <div className="text-5xl md:text-6xl" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
                The right board, wherever you surf.
              </div>
              <div className="text-xs tracking-[0.18em] uppercase" style={{ color: "rgba(245,243,238,0.5)" }}>
                Plus Jakarta Sans · Display
              </div>
            </div>
            <div className="flex flex-wrap items-baseline gap-4 pb-6 border-b" style={{ borderColor: "rgba(245,243,238,0.08)" }}>
              <div className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                Reserve a board for next weekend
              </div>
              <div className="text-xs tracking-[0.18em] uppercase" style={{ color: "rgba(245,243,238,0.5)" }}>
                Headline
              </div>
            </div>
            <div className="flex flex-wrap items-baseline gap-4">
              <div className="text-base" style={{ fontFamily: "var(--font-sans)" }}>
                Pickup at Maresias by 10am, return by 6pm.
              </div>
              <div className="text-xs tracking-[0.18em] uppercase" style={{ color: "rgba(245,243,238,0.5)" }}>
                Body
              </div>
            </div>
          </div>
        </div>

        {/* Design decisions */}
        <div className="border-y" style={{ borderColor: "rgba(245,243,238,0.12)" }}>
          {DESIGN_DECISIONS.map((d, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-6 py-10 border-b last:border-b-0"
              style={{ borderColor: "rgba(245,243,238,0.12)" }}
            >
              <div className="col-span-12 md:col-span-5">
                <h3 className="font-serif text-2xl md:text-3xl leading-snug">
                  {d.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-7">
                <p className="text-base leading-relaxed" style={{ color: "rgba(245,243,238,0.7)" }}>
                  {d.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Swatch({ hex, name, role }: { hex: string; name: string; role: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(245,243,238,0.12)" }}>
      <div className="aspect-[4/3]" style={{ background: hex }} />
      <div className="p-4">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs mt-1" style={{ color: "rgba(245,243,238,0.5)" }}>
          {hex.toLowerCase()} &nbsp;·&nbsp; {role}
        </div>
      </div>
    </div>
  );
}
