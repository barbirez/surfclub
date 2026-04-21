export function CaseStudyFooter() {
  return (
    <footer className="py-24" style={{ background: "var(--cs-product-bg)", color: "var(--cs-product-ink)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs tracking-[0.22em] uppercase mb-8" style={{ color: "rgba(245,243,238,0.5)" }}>
          ✦ &nbsp;Let&apos;s chat and create something together
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight max-w-4xl mb-16">
          See it live, read the code, or say hello.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          <CTALink
            label="Live demo"
            href="https://surfclub-three.vercel.app/"
            arrow="→"
            primary
          />
          <CTALink
            label="Repository"
            href="https://github.com/brzthecreator/surfclub"
            arrow="↗"
          />
          <CTALink
            label="Email me"
            href="mailto:hi@barbararezende.com"
            arrow="✉"
          />
        </div>

        <div className="border-t pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-xs tracking-[0.18em] uppercase" style={{ borderColor: "rgba(245,243,238,0.12)", color: "rgba(245,243,238,0.5)" }}>
          <span>Barbara Rezende — №02 of N</span>
          <span>WavyClub · Experiments in building with AI · 2026</span>
          <a
            href="https://www.barbararezende.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            style={{ color: "var(--cs-product-ink)" }}
          >
            ← back to portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}

function CTALink({
  label,
  href,
  arrow,
  primary = false,
}: {
  label: string;
  href: string;
  arrow: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between p-8 rounded-2xl border transition-colors"
      style={{
        borderColor: primary ? "var(--cs-accent)" : "rgba(245,243,238,0.12)",
        background: primary ? "var(--cs-accent)" : "transparent",
        color: primary ? "var(--cs-product-bg)" : "var(--cs-product-ink)",
      }}
    >
      <span className="font-serif text-2xl">{label}</span>
      <span className="text-2xl transition-transform group-hover:translate-x-1">{arrow}</span>
    </a>
  );
}
