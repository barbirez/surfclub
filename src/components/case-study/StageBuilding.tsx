"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "motion/react"
import { StageHeader } from "./StageHeader"

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
]

type LightboxItem = { type: "image"; src: string; label: string } | { type: "video"; src: string; label: string }

function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-16"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Close button — sits above the image, top-right corner */}
        <div className="flex justify-end mb-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
            aria-label="Close"
          >
            <span className="text-xs tracking-widest uppercase opacity-70">Close</span>
            <span className="text-base leading-none">✕</span>
          </button>
        </div>

        {/* Media */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          {item.type === "video" ? (
            <video
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full block"
            />
          ) : (
            <img src={item.src} alt={item.label} className="w-full block" />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function StageBuilding() {
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null)

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
              src="/casestudy/AIGeneration-easysurf.jpg"
              onClick={() => setLightbox({ type: "image", src: "/casestudy/AIGeneration-easysurf.jpg", label: "Initial AI generation" })}
            />
            <div
              className="rounded-2xl border overflow-hidden cursor-zoom-in"
              style={{ borderColor: "var(--cs-rule)", background: "#000000" }}
              onClick={() => setLightbox({ type: "video", src: "/casestudy/wavyclub-mockup-pricing.mp4", label: "After taste passes" })}
            >
              <div className="px-5 py-3 border-b text-xs tracking-[0.18em] uppercase" style={{ borderColor: "var(--cs-rule)", color: "var(--cs-ink-muted)", background: "#FFFFFF" }}>
                <span>After taste passes</span>
              </div>
              <video
                src="/casestudy/wavyclub-mockup-pricing.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full block pointer-events-none"
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

      <AnimatePresence>
        {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  )
}

function ArtifactFrame({
  label,
  src,
  onClick,
}: {
  label: string
  src: string
  onClick: () => void
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden cursor-zoom-in"
      style={{ borderColor: "var(--cs-rule)", background: "#FFFFFF" }}
      onClick={onClick}
    >
      <div className="px-5 py-3 border-b text-xs tracking-[0.18em] uppercase" style={{ borderColor: "var(--cs-rule)", color: "var(--cs-ink-muted)" }}>
        <span>{label}</span>
      </div>
      <img
        src={src}
        alt={label}
        className="w-full block"
        style={{ aspectRatio: "16 / 10", objectFit: "cover" }}
      />
    </div>
  )
}
