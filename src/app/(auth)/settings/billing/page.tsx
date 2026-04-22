"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function BillingPage() {
  const { data: session } = useSession();
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);

  async function handleUpgrade() {
    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao iniciar pagamento.");
      setLoadingCheckout(false);
    }
  }

  async function handlePortal() {
    setLoadingPortal(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao abrir portal.");
      setLoadingPortal(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Faturamento</h1>
        <p className="text-muted-foreground mt-1">Gerencie sua assinatura WavyClub.</p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-5 w-5 text-accent" />
            Plano atual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">Wavy Club PRO</p>
              <p className="text-sm text-muted-foreground">R$ 289,00 / mês</p>
            </div>
            <Badge className="bg-accent/15 text-accent border-accent/30">
              PRO
            </Badge>
          </div>

          <Separator />

          <ul className="space-y-2">
            {[
              "Reservas ilimitadas",
              "Acesso a todas as pranchas",
              "Filtros avançados",
              "Suporte prioritário",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Fazer upgrade para PRO</CardTitle>
            <CardDescription>
              Desbloqueie reservas e acesso completo às pranchas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              onClick={handleUpgrade}
              disabled={loadingCheckout}
            >
              {loadingCheckout ? "Aguarde..." : "Assinar — R$ 289/mês"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Gerenciar assinatura
            </CardTitle>
            <CardDescription>
              Altere o método de pagamento ou cancele sua assinatura.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={handlePortal}
              disabled={loadingPortal}
            >
              {loadingPortal ? "Abrindo..." : "Abrir portal do cliente"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          Os pagamentos são processados com segurança pelo Stripe. O WavyClub não armazena dados do seu cartão.
          Ao cancelar, você mantém acesso até o fim do período pago.
        </p>
      </div>
    </div>
  );
}
