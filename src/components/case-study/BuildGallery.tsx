"use client"

import { useEffect, useRef } from "react"
import { useInView } from "motion/react"
import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate"

const SCREENS = [
  {
    label: "Board listing",
    caption: "Browse what's available.",
    video: "/casestudy/features-boardlisting.mp4",
    img: null,
  },
  {
    label: "Board detail",
    caption: "Shape, size, and where to get it.",
    img: "/casestudy/features-boarddetail.jpg",
  },
  {
    label: "Reservation",
    caption: "Confirmed. Dates, board, pickup spot.",
    img: "/casestudy/features-reservation.jpg",
  },
  {
    label: "Confirmation",
    caption: "One last look before it's locked in.",
    video: "/casestudy/features-confirmation.mp4",
    img: null,
  },
]

function ScreenItem({
  index,
  item,
  onInView,
}: {
  index: number
  item: (typeof SCREENS)[number]
  onInView: (inView: boolean) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" })

  useEffect(() => {
    onInView(isInView)
  }, [isInView, onInView])

  return (
    <div ref={ref} className="h-screen flex items-center justify-center snap-center px-6">
      <div className="w-[90%] rounded-2xl overflow-hidden border shadow-lg" style={{ borderColor: "var(--cs-rule)", background: "#0f1117" }}>
        {"video" in item && item.video ? (
          <video
            src={item.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block"
          />
        ) : item.img ? (
          <img
            src={item.img}
            alt={item.label}
            className="w-full h-auto block"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full aspect-[16/10] flex items-center justify-center text-xs tracking-widest uppercase"
            style={{
              background: "repeating-linear-gradient(45deg, var(--cs-bg-alt) 0 8px, var(--cs-bg) 8px 16px)",
              color: "var(--cs-ink-muted)",
            }}
          >
            Coming soon
          </div>
        )}
      </div>
    </div>
  )
}

export function BuildGallery() {
  const textRotateRef = useRef<TextRotateRef>(null)
  const captionRotateRef = useRef<TextRotateRef>(null)

  const handleInView = (index: number, inView: boolean) => {
    if (inView) {
      textRotateRef.current?.jumpTo(index)
      captionRotateRef.current?.jumpTo(index)
    }
  }

  return (
    <section style={{ background: "var(--cs-bg)" }}>
      <div className="w-full flex">
        {/* Left: scrollable screens */}
        <div className="w-1/2 relative">
          <div className="snap-y snap-mandatory">
            {SCREENS.map((item, index) => (
              <ScreenItem
                key={index}
                index={index}
                item={item}
                onInView={(inView) => handleInView(index, inView)}
              />
            ))}
          </div>
        </div>

        {/* Right: sticky rotating label */}
        <div className="w-1/2 sticky top-0 h-screen flex flex-col items-start justify-center pl-8 pr-12">
          <p className="text-xs tracking-[0.22em] uppercase mb-6" style={{ color: "var(--cs-ink-muted)" }}>
            ✦ &nbsp;Four screens shipped
          </p>
          <div className="overflow-hidden" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--cs-ink)" }}>
            <TextRotate
              ref={textRotateRef}
              texts={SCREENS.map((s) => s.label)}
              mainClassName="font-serif leading-tight"
              splitLevelClassName="overflow-hidden"
              staggerFrom="first"
              animatePresenceMode="wait"
              loop={false}
              auto={false}
              staggerDuration={0.015}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            />
          </div>
          <div className="mt-4" style={{ color: "var(--cs-ink-soft)" }}>
            <TextRotate
              ref={captionRotateRef}
              texts={SCREENS.map((s) => s.caption)}
              mainClassName="text-base"
              splitBy="words"
              animatePresenceMode="wait"
              loop={false}
              auto={false}
              staggerDuration={0.04}
              staggerFrom="first"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
