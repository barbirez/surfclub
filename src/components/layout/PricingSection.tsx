"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const EASE = [0.16, 1, 0.3, 1] as const;

const PLANS = [
  {
    id: "monthly",
    name: "Go Surf",
    emoji: "🏄",
    tagline: "Mensal",
    price: 289,
    caption: "Renovação mensal",
    highlight: false,
    features: [
      "Acesso ilimitado por 30 dias",
      "Mesma prancha até 5 dias seguidos",
      "Proteção contra danos",
      "Clube de Vantagens",
      "Renovação automática",
    ],
  },
  {
    id: "quarterly",
    name: "Surf's Up",
    emoji: "🌊",
    tagline: "Trimestral",
    price: 199,
    caption: "Total: R$ 597,00",
    highlight: true,
    features: [
      "Acesso ilimitado por 90 dias",
      "Mesma prancha até 10 dias seguidos",
      "Proteção contra danos",
      "Clube de Vantagens",
      "Renovação automática",
    ],
  },
  {
    id: "annual",
    name: "Wave Life",
    emoji: "⚡",
    tagline: "Anual",
    price: 149,
    caption: "Total: R$ 1.788,00",
    highlight: false,
    features: [
      "Acesso ilimitado por 365 dias",
      "Mesma prancha até 15 dias seguidos",
      "Proteção contra danos",
      "Clube de Vantagens",
      "Renovação automática",
    ],
  },
];

const AVULSO_BASE = 80;
const AVULSO_PER_DAY = 3.7;
const AVULSO_MAX_DAYS = 30;

function avulsoPrice(days: number) {
  return AVULSO_BASE + (days - 1) * AVULSO_PER_DAY;
}

export function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [days, setDays] = useState(1);
  const totalAvulso = avulsoPrice(days);

  async function handleCheckout(planId: string) {
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      if (res.status === 401) { window.location.href = "/login"; return; }
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao iniciar pagamento.");
      setLoadingPlan(null);
    }
  }

  return (
    <section id="pricing" className="relative overflow-hidden py-24">

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 space-y-20">

        {/* ── Header ── */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-sm font-bold uppercase tracking-widest text-primary-light">
            Preço simples
          </p>
          <div className="relative inline-block">
            <h2 className="text-4xl font-extrabold sm:text-5xl">
              Escolha seu plano 🤙
            </h2>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-2 bg-primary/20 rounded-full blur-sm" />
          </div>
          <p className="text-muted-foreground max-w-md mx-auto pt-4">
            Assine e surfe sem limites. Quanto mais você compromete, mais você economiza.
          </p>
        </motion.div>

        {/* ── 3 plans ── */}
        <div className="grid gap-8 sm:grid-cols-3 items-start pt-2">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
              className={cn(
                "group relative transition-all duration-300",
                i === 0 && "sm:rotate-[-1.5deg]",
                i === 1 && "sm:rotate-[1deg]",
                i === 2 && "sm:rotate-[-1deg]",
              )}
            >
              <div
                className={cn(
                  "relative rounded-2xl border-2 p-6 flex flex-col gap-5",
                  "transition-all duration-300",
                  "group-hover:-translate-x-1 group-hover:-translate-y-1",
                  plan.highlight
                    ? "border-accent bg-accent/5 [box-shadow:4px_4px_0px_0px_var(--color-accent)] group-hover:[box-shadow:8px_8px_0px_0px_var(--color-accent)]"
                    : "border-border bg-card [box-shadow:4px_4px_0px_0px_var(--color-border)] group-hover:[box-shadow:8px_8px_0px_0px_var(--color-border)]",
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 -right-3 z-10 bg-accent text-accent-foreground font-extrabold text-xs px-3 py-1 rounded-full rotate-12 border-2 border-accent/80 shadow-sm">
                    Popular! 🔥
                  </div>
                )}

                {/* Icon + name */}
                <div className="space-y-3">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl",
                      plan.highlight ? "border-accent" : "border-border",
                    )}
                  >
                    {plan.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {plan.tagline}
                    </p>
                    <h3 className="text-2xl font-extrabold">{plan.name}</h3>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tabular-nums">R$ {plan.price}</span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{plan.caption}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <div
                        className={cn(
                          "mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                          plan.highlight
                            ? "border-accent text-accent"
                            : "border-primary-light text-primary-light",
                        )}
                      >
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={cn(
                    "w-full h-11 font-bold rounded-full border-2",
                    "transition-all duration-300",
                    "hover:-translate-x-0.5 hover:-translate-y-0.5",
                    plan.highlight
                      ? "bg-accent text-accent-foreground border-accent/80 hover:bg-accent/90 [box-shadow:3px_3px_0px_0px_var(--color-accent)] hover:[box-shadow:6px_6px_0px_0px_var(--color-accent)]"
                      : "bg-transparent text-foreground border-border hover:bg-secondary [box-shadow:3px_3px_0px_0px_var(--color-border)] hover:[box-shadow:6px_6px_0px_0px_var(--color-border)]",
                  )}
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loadingPlan === plan.id}
                >
                  {loadingPlan === plan.id ? "Aguarde..." : "Assinar agora"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Avulso ── */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="text-center space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Sem compromisso
            </p>
            <h3 className="text-3xl font-extrabold">Compre por dias 📅</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Surfe quando quiser, sem assinatura. Escolha os dias e pague só por isso.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div
              className={cn(
                "rounded-2xl border-2 border-border bg-card p-8 space-y-7",
                "[box-shadow:4px_4px_0px_0px_var(--color-border)]",
              )}
            >
              {/* Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Dias de uso</span>
                  <span className="text-3xl font-black tabular-nums">
                    {days} dia{days !== 1 ? "s" : ""}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={AVULSO_MAX_DAYS}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3366FF 0%, #3366FF ${((days - 1) / (AVULSO_MAX_DAYS - 1)) * 100}%, #2A2F45 ${((days - 1) / (AVULSO_MAX_DAYS - 1)) * 100}%, #2A2F45 100%)`,
                    accentColor: "#3366FF",
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 dia</span>
                  <span>{AVULSO_MAX_DAYS} dias</span>
                </div>
              </div>

              {/* Price display */}
              <div className="rounded-xl border-2 border-border bg-secondary p-5 text-center space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total a pagar</p>
                <p className="text-5xl font-black tabular-nums">
                  R$ {totalAvulso.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {days === 1
                    ? "R$ 80,00 para o primeiro dia"
                    : `R$ 80,00 + ${days - 1} dia${days - 1 !== 1 ? "s" : ""} × R$ 3,70`}
                </p>
              </div>

              <Button
                className={cn(
                  "w-full h-12 font-bold rounded-full border-2 border-accent",
                  "bg-accent text-accent-foreground hover:bg-accent/90",
                  "[box-shadow:4px_4px_0px_0px_var(--color-accent)]",
                  "hover:[box-shadow:6px_6px_0px_0px_var(--color-accent)] hover:-translate-x-0.5 hover:-translate-y-0.5",
                  "transition-all duration-300",
                )}
                onClick={() => handleCheckout("avulso")}
                disabled={loadingPlan === "avulso"}
              >
                <Zap className="h-4 w-4 mr-2" />
                {loadingPlan === "avulso"
                  ? "Aguarde..."
                  : `Comprar ${days} dia${days !== 1 ? "s" : ""} — R$ ${totalAvulso.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Pagamento único · Sem renovação automática · Sem fidelidade
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
