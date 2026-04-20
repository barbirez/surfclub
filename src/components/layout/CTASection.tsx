"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/client";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTASection() {
  const { t } = useT();
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle glow background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[700px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="space-y-4"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-primary-light">
            {t.cta.label}
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-tight">
            {t.cta.headingPart1}<br className="hidden sm:block" /> {t.cta.headingPart2}
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            {t.cta.subheading}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-base font-semibold rounded-full shadow-lg"
          >
            <Link href="/boards">
              {t.cta.button}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
