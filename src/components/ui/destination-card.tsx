"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  category: string;
  title: string;
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  ({ className, imageUrl, category, title, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative grid h-full w-full transform-gpu overflow-hidden rounded-2xl border border-border/50 shadow-sm transition-all duration-300 ease-in-out group cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Background Image with Hover Animation */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/600x900/1A1D29/4F89FF?text=${encodeURIComponent(title)}`;
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Text Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white transition-transform duration-500 ease-in-out group-hover:-translate-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
            {category}
          </p>
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white">
            {title}
          </h2>
        </div>
      </div>
    );
  }
);
DestinationCard.displayName = "DestinationCard";

export { DestinationCard };
