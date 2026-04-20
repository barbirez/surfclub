"use client";

import { MagicText } from "@/components/ui/magic-text";
import { useT } from "@/lib/i18n/client";

export function ValuePropsSection() {
  const { t } = useT();
  const items = [
    { emoji: "\uD83C\uDF0A", title: t.valueProps.traveler.title, text: t.valueProps.traveler.text },
    { emoji: "\uD83C\uDFC4", title: t.valueProps.local.title, text: t.valueProps.local.text },
    { emoji: "\uD83D\uDCC8", title: t.valueProps.evolving.title, text: t.valueProps.evolving.text },
  ];
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 space-y-20">
      {items.map((prop) => (
        <div key={prop.title} className="space-y-2">
          <h3 className="text-lg font-bold text-primary-light px-4">
            {prop.emoji} {prop.title}
          </h3>
          <MagicText text={prop.text} />
        </div>
      ))}
    </section>
  );
}
