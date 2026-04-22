"use client";
import { useMemo } from "react";
import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { useT } from "@/lib/i18n/client";

const TESTIMONIAL_IMAGES = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/54.jpg",
  "https://randomuser.me/api/portraits/women/22.jpg",
  "https://randomuser.me/api/portraits/men/76.jpg",
  "https://randomuser.me/api/portraits/women/55.jpg",
  "https://randomuser.me/api/portraits/men/38.jpg",
];

export function TestimonialsSection() {
  const { t } = useT();
  const testimonials = useMemo(
    () =>
      t.testimonials.items.map((item, i) => ({
        ...item,
        image: TESTIMONIAL_IMAGES[i] ?? TESTIMONIAL_IMAGES[0],
      })),
    [t.testimonials.items],
  );
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);
  return (
    <section className="bg-background py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-[540px] mx-auto mb-12"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-primary-light">
            {t.testimonials.label}
          </p>
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            {t.testimonials.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t.testimonials.subheading}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[720px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={16}
          />
        </div>
      </div>
    </section>
  );
}
