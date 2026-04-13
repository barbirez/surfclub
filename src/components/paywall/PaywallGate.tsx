"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaywallGateProps {
  children: React.ReactNode;
  hasAccess: boolean;
  title?: string;
  description?: string;
}

export function PaywallGate({
  children,
  hasAccess,
  title = "Plano necessário",
  description = "Escolha um plano para acessar esta funcionalidade e começar a reservar pranchas.",
}: PaywallGateProps) {
  const router = useRouter();

  if (hasAccess) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-30 blur-sm">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="w-full max-w-sm border-accent/30 bg-card/95 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <Lock className="h-6 w-6 text-accent" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">{description}</p>
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              onClick={() => router.push("/pricing")}
            >
              Ver planos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
