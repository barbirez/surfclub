"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

export function RevealOnView({
  children,
  delay = 0,
  distance = 6,
  duration = 0.35,
  as: Tag = "div",
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  distance?: number
  duration?: number
  as?: "div" | "span" | "p"
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const mergedStyle: CSSProperties = {
    ...style,
    transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
    transitionDelay: `${delay}s`,
    opacity: seen ? 1 : 0,
    transform: seen ? "translateY(0)" : `translateY(${distance}px)`,
    willChange: "opacity, transform",
  }

  return (
    <Tag ref={ref as React.RefObject<never>} className={cn(className)} style={mergedStyle}>
      {children}
    </Tag>
  )
}
