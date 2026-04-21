import { StageHeader } from "./StageHeader";

const OBSERVATIONS = [
  {
    num: "01",
    title: "Specification is the new craft.",
    body: "A clearer brief upstream means less correction downstream. The thinking moved earlier in the process — not away from me.",
  },
  {
    num: "02",
    title: "Taste is the part that can't be delegated.",
    body: "AI produces the average of what it has seen. The designer's job becomes editorial: knowing what to keep, what to reject, and when to stop.",
  },
  {
    num: "03",
    title: "The question is the output.",
    body: "\"Make this better\" produces noise. A specific, well-framed question produces something usable. Writing good questions is its own design skill.",
  },
  {
    num: "04",
    title: "Rhythm matters more than speed.",
    body: "Knowing when to specify, when to let AI explore, when to redirect — that's feel, not formula. Built through reps.",
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
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--cs-rule)", background: "#000000" }}>
              <div className="px-5 py-3 border-b flex items-center justify-between text-xs tracking-[0.18em] uppercase" style={{ borderColor: "var(--cs-rule)", color: "var(--cs-ink-muted)", background: "#FFFFFF" }}>
                <span>After taste passes</span>
                <span className="text-[10px] normal-case tracking-normal">Hour 36, current production</span>
              </div>
              <video
                src="/casestudy/wavyclub-mockup-pricing.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full block"
                style={{ aspectRatio: "16 / 10", objectFit: "cover" }}
              />
            </div>
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
