"use client";

import { SlidersHorizontal, CalendarDays, MapPin, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useT } from "@/lib/i18n/client";

const ROTATIONS = [
  "sm:rotate-[-1.5deg]",
  "sm:rotate-[1deg]",
  "sm:rotate-[-1deg]",
  "sm:rotate-[1.5deg]",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function HowItWorksSection() {
  const { t } = useT();
  const steps = [
    {
      step: "01",
      icon: <SlidersHorizontal className="w-5 h-5" />,
      title: t.howItWorks.steps.one.title,
      description: t.howItWorks.steps.one.description,
    },
    {
      step: "02",
      icon: <CalendarDays className="w-5 h-5" />,
      title: t.howItWorks.steps.two.title,
      description: t.howItWorks.steps.two.description,
    },
    {
      step: "03",
      icon: <MapPin className="w-5 h-5" />,
      title: t.howItWorks.steps.three.title,
      description: t.howItWorks.steps.three.description,
    },
    {
      step: "04",
      icon: <Waves className="w-5 h-5" />,
      title: t.howItWorks.steps.four.title,
      description: t.howItWorks.steps.four.description,
    },
  ];
  return (
    <section id="how-it-works" className="bg-card/30 border-y border-border/50 py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Header */}
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-sm font-bold uppercase tracking-widest text-primary-light">
            {t.howItWorks.label}
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            {t.howItWorks.heading}
          </h2>
        </motion.div>

        {/* Cards — staggered */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-start">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className={cn("group relative transition-all duration-300", ROTATIONS[i])}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.09 }}
            >
              <div
                className={cn(
                  "relative rounded-2xl border-2 border-border bg-card p-6 flex flex-col gap-4",
                  "[box-shadow:4px_4px_0px_0px_var(--color-border)]",
                  "transition-all duration-300",
                  "group-hover:-translate-x-1 group-hover:-translate-y-1",
                  "group-hover:[box-shadow:8px_8px_0px_0px_var(--color-border)]",
                )}
              >
                <div className="flex justify-end">
                  <span className="text-5xl font-black tabular-nums text-primary/15 leading-none">
                    {s.step}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-full border-2 border-accent/40 flex items-center justify-center text-accent shrink-0">
                    {s.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base leading-snug">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
