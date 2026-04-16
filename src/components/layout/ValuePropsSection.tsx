"use client";

import { MagicText } from "@/components/ui/magic-text";

const VALUE_PROPS = [
  {
    emoji: "\uD83C\uDF0A",
    title: "Voc\u00ea \u00e9 viajante?",
    text: "Chegou numa praia nova sem prancha? A gente tem o quiver local esperando por voc\u00ea.",
  },
  {
    emoji: "\uD83C\uDFC4",
    title: "Voc\u00ea surfa sempre na mesma praia?",
    text: "Para de perder sess\u00e3o por falta de prancha certa. Com o EasySurf voc\u00ea tem um quiver completo dispon\u00edvel.",
  },
  {
    emoji: "\uD83D\uDCC8",
    title: "Voc\u00ea est\u00e1 evoluindo?",
    text: "Testa diferentes volumes e shapes antes de investir na sua pr\u00f3pria prancha.",
  },
];

export function ValuePropsSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 space-y-20">
      {VALUE_PROPS.map((prop) => (
        <div key={prop.title} className="space-y-2">
          <h3 className="text-lg font-bold text-primary px-4">
            {prop.emoji} {prop.title}
          </h3>
          <MagicText text={prop.text} />
        </div>
      ))}
    </section>
  );
}
