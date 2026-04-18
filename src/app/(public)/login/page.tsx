"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("resend", { email, redirect: false, callbackUrl: "/boards" });
      if (result?.error) throw new Error(result.error);
      setSent(true);
    } catch {
      toast.error("Erro ao enviar o link. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/surfpack-logo.svg"
            alt="Surf Pack"
            width={160}
            height={46}
            className="w-[160px] h-auto dark:invert"
          />
          <p className="text-sm text-muted-foreground text-center">
            Alugue a prancha certa para as condições de hoje
          </p>
        </div>

        <Card className="border-border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">Entrar na sua conta</CardTitle>
            <CardDescription>
              Use o Google ou receba um link mágico por e-mail.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google */}
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => signIn("google", { callbackUrl: "/boards" })}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">ou</span>
              </div>
            </div>

            {/* Email magic link */}
            {sent ? (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
                <Mail className="mx-auto h-8 w-8 text-primary mb-2" />
                <p className="font-medium text-sm">Verifique seu e-mail</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Enviamos um link de acesso para <strong>{email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailLogin} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar link de acesso"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Ao entrar, você concorda com nossos{" "}
          <a href="#" className="underline hover:text-foreground">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="underline hover:text-foreground">
            Política de Privacidade
          </a>.
        </p>
      </div>
    </div>
  );
}
