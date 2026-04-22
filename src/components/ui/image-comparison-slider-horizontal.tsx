"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageComparisonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftImage: string
  rightImage: string
  altLeft?: string
  altRight?: string
  initialPosition?: number
}

export const ImageComparisonSlider = React.forwardRef<HTMLDivElement, ImageComparisonSliderProps>(
  (
    {
      className,
      leftImage,
      rightImage,
      altLeft = "Left image",
      altRight = "Right image",
      initialPosition = 50,
      ...props
    },
    ref
  ) => {
    const [sliderPosition, setSliderPosition] = React.useState(initialPosition)
    const [isDragging, setIsDragging] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const handleMove = (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderPosition(newPosition)
    }

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    }, [isDragging])

    const handleTouchMove = React.useCallback((e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    }, [isDragging])

    const handleInteractionEnd = React.useCallback(() => {
      setIsDragging(false)
    }, [])

    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("touchmove", handleTouchMove)
        document.addEventListener("mouseup", handleInteractionEnd)
        document.addEventListener("touchend", handleInteractionEnd)
        document.body.style.cursor = "ew-resize"
      } else {
        document.body.style.cursor = ""
      }
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("mouseup", handleInteractionEnd)
        document.removeEventListener("touchend", handleInteractionEnd)
        document.body.style.cursor = ""
      }
    }, [isDragging, handleMouseMove, handleTouchMove, handleInteractionEnd])

    return (
      <div
        ref={containerRef}
        className={cn("relative w-full h-full overflow-hidden select-none group", className)}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        {...props}
      >
        <img
          src={rightImage}
          alt={altRight}
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
          draggable={false}
        />
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={leftImage}
            alt={altLeft}
            className="w-full h-full object-cover object-top"
            draggable={false}
          />
        </div>
        <div
          className="absolute top-0 h-full w-1 cursor-ew-resize"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className="absolute inset-y-0 w-1 bg-white/20 backdrop-blur-sm" />
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white/80 text-neutral-800 shadow-xl backdrop-blur-md",
              "transition-transform duration-200 ease-out",
              "group-hover:scale-105",
              isDragging && "scale-110"
            )}
            role="slider"
            aria-valuenow={sliderPosition}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-orientation="horizontal"
            aria-label="Image comparison slider"
          >
            <div className="flex items-center">
              <ChevronLeft className="h-5 w-5" />
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

ImageComparisonSlider.displayName = "ImageComparisonSlider"
