"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/lib/i18n/client";

export default function BillingPage() {
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const { t } = useT();
  const b = t.billing;

  async function handleUpgrade() {
    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : b.upgradeError);
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
      toast.error(err instanceof Error ? err.message : b.manageError);
      setLoadingPortal(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{b.title}</h1>
        <p className="text-muted-foreground mt-1">{b.subtitle}</p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-5 w-5 text-accent" />
            {b.currentPlan}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">{b.planName}</p>
              <p className="text-sm text-muted-foreground">{b.planPrice}</p>
            </div>
            <Badge className="bg-accent/15 text-accent border-accent/30">
              PRO
            </Badge>
          </div>

          <Separator />

          <ul className="space-y-2">
            {b.features.map((feature) => (
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
            <CardTitle className="text-sm">{b.upgradeTitle}</CardTitle>
            <CardDescription>{b.upgradeDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              onClick={handleUpgrade}
              disabled={loadingCheckout}
            >
              {loadingCheckout ? b.upgradeLoading : b.upgradeCta}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {b.manageTitle}
            </CardTitle>
            <CardDescription>{b.manageDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={handlePortal}
              disabled={loadingPortal}
            >
              {loadingPortal ? b.manageLoading : b.manageCta}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
        <p>{b.disclaimer}</p>
      </div>
    </div>
  );
}
