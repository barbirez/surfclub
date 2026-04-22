"use client"

import { useEffect, useCallback } from "react"
import { motion } from "motion/react"

export type LightboxItem =
  | { type: "image"; src: string; label: string }
  | { type: "video"; src: string; label: string }

export function Lightbox({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
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
