"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap } from "lucide-react";
import { toast } from "sonner";

const SUBSCRIPTION_PLANS = [
  {
    id: "monthly",
    tag: "Mensal — Go Surf Now!",
    multiplier: "1x",
    price: 289,
    total: null,
    highlight: false,
    features: [
      "Acesso ilimitado às pranchas por 30 dias",
      "Mesma prancha por até 5 dias seguidos",
      "Proteção contra danos na água",
      "Clube de Vantagens com descontos",
      "Renovação automática",
    ],
  },
  {
    id: "quarterly",
    tag: "Trimestral — Surf's Up!",
    multiplier: "3x",
    price: 199,
    total: 597,
    highlight: true,
    features: [
      "Acesso ilimitado às pranchas por 90 dias",
      "Mesma prancha por até 10 dias seguidos",
      "Proteção contra danos na água",
      "Clube de Vantagens com descontos",
      "Renovação automática",
    ],
  },
  {
    id: "annual",
    tag: "Anual — The Wave Never Ends!",
    multiplier: "12x",
    price: 149,
    total: 1788,
    highlight: false,
    features: [
      "Acesso ilimitado às pranchas por 365 dias",
      "Mesma prancha por até 15 dias seguidos",
      "Proteção contra danos na água",
      "Clube de Vantagens com descontos",
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
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 space-y-16">

      {/* ── Header ── */}
      <div className="text-center space-y-3">
        <Badge className="bg-accent/10 text-accent border-accent/20">Preço simples</Badge>
        <h2 className="text-4xl font-bold">Escolha seu plano</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Assine e surfe sem limites. Quanto mais você compromete, mais você economiza.
        </p>
      </div>

      {/* ── 3 subscription plans ── */}
      <div className="grid gap-6 sm:grid-cols-3">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`relative overflow-hidden flex flex-col ${
              plan.highlight
                ? "border-accent/50 shadow-lg shadow-accent/5"
                : "border-border/50"
            }`}
          >
            {plan.highlight && (
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0" />
            )}
            <CardHeader className="pb-4">
              <Badge
                className={`self-start mb-3 text-xs font-bold uppercase tracking-wide ${
                  plan.highlight
                    ? "bg-accent/15 text-accent border-accent/30"
                    : "bg-primary/10 text-primary border-primary/20"
                }`}
              >
                {plan.tag}
              </Badge>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-muted-foreground">{plan.multiplier}</span>
                <span className="text-4xl font-black">R$ {plan.price}</span>
                <span className="text-muted-foreground text-sm">/mês</span>
              </div>
              {plan.total ? (
                <p className="text-xs text-muted-foreground">
                  Total: R$ {plan.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">Renovação mensal</p>
              )}
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full font-semibold ${
                  plan.highlight ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""
                }`}
                variant={plan.highlight ? "default" : "outline"}
                onClick={() => handleCheckout(plan.id)}
                disabled={loadingPlan === plan.id}
              >
                {loadingPlan === plan.id ? "Aguarde..." : "Assinar"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Plano Avulso ── */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Badge className="bg-secondary text-muted-foreground border-border">Plano Avulso</Badge>
          <h3 className="text-2xl font-bold">Compre por dias de uso</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Surfe quando quiser, sem compromisso de assinatura. Escolha os dias e pague só por isso.
          </p>
        </div>

        <Card className="max-w-xl mx-auto border-border/50">
          <CardContent className="pt-8 pb-8 space-y-7">
            {/* Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Dias de uso</span>
                <span className="text-2xl font-black tabular-nums">
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

            {/* Price */}
            <div className="rounded-2xl bg-secondary p-5 text-center space-y-1">
              <p className="text-sm text-muted-foreground">Total a pagar</p>
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
              className="w-full h-11 font-semibold bg-accent text-accent-foreground hover:bg-accent/90"
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
          </CardContent>
        </Card>
      </div>

    </section>
  );
}
