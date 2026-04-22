import { StageHeader } from "./StageHeader";

const PLACES = [
  { id: "P1", name: "Landing page", note: "browse CTA, plan card" },
  { id: "P2", name: "Board menu", note: "filters, list, empty state" },
  { id: "P3", name: "Board detail", note: "specs, location, reserve CTA" },
  { id: "P4", name: "Reservation", note: "date picker, summary" },
  { id: "P5", name: "Disclosure", note: "blocking liability gate" },
  { id: "P6", name: "Confirmation", note: "pickup, return loop, contact" },
  { id: "P7", name: "Pricing", note: "plans, comparison" },
  { id: "P8", name: "About / FAQ", note: "trust + return policy" },
];

export function StageBreadboard() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="03"
          name="Breadboarding"
          question="What are the places, the affordances, and the data this needs?"
        />

        <p className="text-lg leading-relaxed max-w-3xl mb-16" style={{ color: "var(--cs-ink-soft)" }}>
          Before any UI, I mapped the whole system as places (the screens and states a user passes through), affordances (what can be clicked, entered, or chosen), and data stores (what the system has to remember).
        </p>

        {/* Places grid — the breadboard as a typographic system */}
        <div className="border rounded-2xl overflow-hidden" style={{ borderColor: "var(--cs-rule)", background: "#FFFFFF" }}>
          <div className="px-6 py-4 border-b flex items-center justify-between text-xs tracking-[0.18em] uppercase" style={{ borderColor: "var(--cs-rule)", color: "var(--cs-ink-muted)" }}>
            <span>Breadboard — Places (P1–P8)</span>
            <span className="font-mono normal-case tracking-normal">shaping.md</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {PLACES.map((p, i) => (
              <div
                key={p.id}
                className="p-6 border-r border-b"
                style={{
                  borderColor: "var(--cs-rule)",
                  borderRightWidth: (i % 4 === 3) ? 0 : 1,
                  borderBottomWidth: (i >= PLACES.length - 4) ? 0 : 1,
                }}
              >
                <div className="text-xs font-mono mb-2" style={{ color: "var(--cs-accent)" }}>
                  {p.id}
                </div>
                <div className="font-serif text-xl leading-tight mb-1" style={{ color: "var(--cs-ink)" }}>
                  {p.name}
                </div>
                <div className="text-xs" style={{ color: "var(--cs-ink-muted)" }}>
                  {p.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Stat label="Places" value="8" />
          <Stat label="UI affordances" value="22+" />
          <Stat label="Data stores" value="9" />
        </div>

        <p className="text-lg leading-relaxed max-w-3xl mt-16" style={{ color: "var(--cs-ink-soft)" }}>
          Eight places, the connections between them, what each screen needed to know and show. Unglamorous as an artifact. The reason the build finished on time. Alongside the breadboard, I wrote out what each screen had to <em>do</em> before I opened Figma. By the time the design work started, the shaping document was nine pages. Every decision afterward had a reason to point back to.
        </p>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 border rounded-2xl" style={{ borderColor: "var(--cs-rule)", background: "var(--cs-bg-alt)" }}>
      <div className="text-xs tracking-[0.22em] uppercase mb-3" style={{ color: "var(--cs-ink-muted)" }}>
        {label}
      </div>
      <div className="font-serif text-4xl" style={{ color: "var(--cs-ink)" }}>
        {value}
      </div>
    </div>
  );
}
