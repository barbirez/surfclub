import { StageHeader } from "./StageHeader";

export function StageShipping() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="05"
          name="Shipping"
          question="What's the smallest version that tells the truth about the idea?"
        />

        <p className="text-lg leading-relaxed max-w-3xl mb-16" style={{ color: "var(--cs-ink-soft)" }}>
          Two days forces choices. Here&apos;s what I chose to finish, and what I left rough:
        </p>

        <div className="border-y divide-y" style={{ borderColor: "var(--cs-rule)" }}>
          <div className="grid grid-cols-12 gap-6 py-12" style={{ borderColor: "var(--cs-rule)" }}>
            <div className="col-span-12 md:col-span-5">
              <h3 className="font-serif text-2xl md:text-3xl leading-snug" style={{ color: "var(--cs-ink)" }}>
                What I finished.
              </h3>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-base leading-relaxed pt-2 md:pt-3" style={{ color: "var(--cs-ink-soft)" }}>
                The core loop — browse available boards, book one, see the reservation, cancel if needed. The thing that had to actually work, actually works.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 py-12" style={{ borderColor: "var(--cs-rule)" }}>
            <div className="col-span-12 md:col-span-5">
              <h3 className="font-serif text-2xl md:text-3xl leading-snug" style={{ color: "var(--cs-ink)" }}>
                What I left rough.
              </h3>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-base leading-relaxed pt-2 md:pt-3" style={{ color: "var(--cs-ink-soft)" }}>
                The filtering system could be smarter. Skill level, wave type, location — each one deserves real thinking, and with two days I gave it a working version instead of a considered one. The UI details in the board browse could hold more polish: card hierarchy, photography treatment, empty states. All of it shippable, none of it finished.
              </p>
            </div>
          </div>
        </div>

        <p className="text-lg leading-relaxed max-w-3xl mt-16" style={{ color: "var(--cs-ink-soft)" }}>
          Shipping at this scope isn&apos;t about calling something done. It&apos;s about knowing what to leave rough so the parts that matter can be right. Tight scope is the discipline that makes AI-assisted building honest — without it, the tool just accelerates drift.
        </p>
      </div>
    </section>
  );
}
