"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function ProductScroll() {
  return (
    <section style={{ background: "var(--cs-bg)" }}>
      <ContainerScroll
        titleComponent={
          <div className="mb-6">
            <p className="text-xs tracking-[0.22em] uppercase mb-4" style={{ color: "var(--cs-accent)" }}>
              ✦ &nbsp;The product
            </p>
            <h2
              className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight"
              style={{ color: "var(--cs-ink)" }}
            >
              48 hours, end to end.
            </h2>
          </div>
        }
      >
        <video
          src="/casestudy/wavyclub-mockup-reservation.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-2xl"
        />
      </ContainerScroll>
    </section>
  );
}
