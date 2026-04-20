"use client";

import { useT } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/dictionaries";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "pt", label: "PT" },
  { value: "en", label: "EN" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useT();

  return (
    <div
      role="group"
      aria-label={t.switcher.label}
      className={cn(
        "inline-flex items-center rounded-full border border-border/70 bg-background/60 p-0.5 text-xs font-semibold",
        className,
      )}
    >
      {OPTIONS.map((opt) => {
        const active = locale === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLocale(opt.value)}
            aria-pressed={active}
            className={cn(
              "px-2.5 py-1 rounded-full transition-colors",
              active
                ? "bg-white/15 text-foreground"
                : "text-muted-foreground/50 hover:text-muted-foreground",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
