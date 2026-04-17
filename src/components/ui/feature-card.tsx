import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground p-8 rounded-2xl border border-border flex flex-col items-center text-center",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:-translate-y-2 hover:border-primary/20",
        className
      )}
    >
      <div className="mb-6 bg-secondary p-4 rounded-full">
        {icon}
      </div>
      <h3 className="text-base font-semibold mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};
