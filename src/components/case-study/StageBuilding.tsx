import { StageHeader } from "./StageHeader";

const OBSERVATIONS = [
  {
    num: "01",
    title: "The shaping document did most of the real work.",
    body: "Where the specification was clear, AI moved fast. Where it was vague, the output needed the most correction. The upstream discipline isn't separate from the build — it is the build.",
  },
  {
    num: "02",
    title: "Taste stayed editorial.",
    body: "Type, motion, spacing, the difference between an interface that feels right and one that feels generic — AI defaults to the average of what it's seen. The job of the designer becomes selection. Knowing which patterns to keep, which to reject, when to stop the machine from producing something competent but forgettable.",
  },
  {
    num: "03",
    title: "Asking the right question is the skill.",
    body: "The quality of the output tracks the quality of the question. \"Make this look better\" produces noise. \"The paddle-out illustration needs to read as motion at a glance, not as decoration — simplify the line weight and remove the background\" produces something useful. Building this vocabulary is a large part of what I'm practicing.",
  },
  {
    num: "04",
    title: "Rhythm is the other skill.",
    body: "When to specify precisely, when to let AI explore, when to stop and redirect. This doesn't come from a tutorial. It comes from reps.",
  },
];

export function StageBuilding() {
  return (
    <section className="py-32" style={{ background: "var(--cs-bg-alt)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <StageHeader
          num="04"
          name="Building with AI"
          question="How do I keep AI moving without losing the taste?"
        />

        <p className="text-lg leading-relaxed max-w-3xl mb-20" style={{ color: "var(--cs-ink-soft)" }}>
          This is the stage the practice is really about. Four observations from this build.
        </p>

        {/* Before / After artifact slot */}
        <div className="mb-20">
          <p className="text-xs tracking-[0.18em] uppercase mb-4" style={{ color: "var(--cs-ink-muted)" }}>
            Before &nbsp;→&nbsp; After
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ArtifactFrame
              label="Initial AI generation"
              caption="Raw output, hour 0"
              src="/case-study/before-landing.jpg"
            />
            <ArtifactFrame
              label="After taste passes"
              caption="Hour 36, current production"
              src="/case-study/after-landing.jpg"
            />
          </div>
        </div>

        {/* Four observations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OBSERVATIONS.map((o) => (
            <div
              key={o.num}
              className="p-10 border rounded-2xl"
              style={{ borderColor: "var(--cs-rule)", background: "#FFFFFF" }}
            >
              <div className="font-mono text-xs mb-6" style={{ color: "var(--cs-accent)" }}>
                /{o.num}
              </div>
              <h3 className="font-serif text-2xl leading-snug mb-5" style={{ color: "var(--cs-ink)" }}>
                {o.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--cs-ink-soft)" }}>
                {o.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtifactFrame({
  label,
  caption,
  src,
}: {
  label: string;
  caption: string;
  src: string;
}) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--cs-rule)", background: "#FFFFFF" }}>
      <div className="px-5 py-3 border-b flex items-center justify-between text-xs tracking-[0.18em] uppercase" style={{ borderColor: "var(--cs-rule)", color: "var(--cs-ink-muted)" }}>
        <span>{label}</span>
        <span className="text-[10px] normal-case tracking-normal">{caption}</span>
      </div>
      <div
        className="relative"
        style={{
          aspectRatio: "16 / 10",
          background: `url(${src}) center/cover no-repeat, repeating-linear-gradient(45deg, var(--cs-bg-alt) 0 8px, var(--cs-bg) 8px 16px)`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-xs" style={{ color: "var(--cs-ink-muted)" }}>
          {/* Visible only when image is missing */}
          <span className="bg-white/80 px-3 py-1 rounded">screenshot drops in here</span>
        </div>
      </div>
    </div>
  );
}
