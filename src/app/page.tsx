import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  CalendarCheck,
  ShieldCheck,
  Droplets,
  MapPin,
  ArrowRight,
  Star,
} from "lucide-react";
import { PricingSection } from "@/components/layout/PricingSection";
import { LandingNav } from "@/components/layout/LandingNav";
import { LandingFooter } from "@/components/layout/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pt-32">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            🏄 Pranchas disponíveis na sua praia
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Alugue a prancha certa{" "}
            <span className="text-primary">para as condições</span>
            <br />
            de hoje
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Assinatura de aluguel de pranchas com reserva simples: escolha, confirme
            datas, pegue, surfe e devolva. Sem complicação.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 text-base font-semibold"
            >
              <Link href="/login">
                Começar grátis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href="/pricing">Ver planos</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            14 dias grátis · Sem cartão para começar
          </p>
        </div>
      </section>

      {/* Social proof strip */}
      <div className="border-y border-border/50 bg-card/30 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {["Florianópolis", "Ubatuba", "Itacoatiara", "Maresias", "Joaquina"].map((location) => (
              <div key={location} className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {location}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Funcionalidades</Badge>
          <h2 className="text-3xl font-bold">Tudo que você precisa para surfar bem</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Do filtro até a devolução — uma experiência simples e completa.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Search,
              title: "Encontre a prancha certa",
              description:
                "Filtre por tipo, volume, shaper, localização e nível de surf. Cada prancha tem um perfil de condições para você escolher com confiança.",
              color: "text-primary bg-primary/10",
            },
            {
              icon: CalendarCheck,
              title: "Reserva em segundos",
              description:
                "Calendário de disponibilidade em tempo real. Selecione as datas, confirme e pronto. Nada de ligar ou mandar mensagem.",
              color: "text-accent bg-accent/10",
            },
            {
              icon: ShieldCheck,
              title: "Transparência total",
              description:
                "Antes de confirmar, você vê todos os termos, instruções de retirada e devolução. Sem surpresas.",
              color: "text-green-400 bg-green-400/10",
            },
            {
              icon: Droplets,
              title: "Specs que importam",
              description:
                "Volume, tamanho, shaper — e o mais importante: para qual nível e condição de mar cada prancha foi feita.",
              color: "text-blue-400 bg-blue-400/10",
            },
            {
              icon: MapPin,
              title: "Ponto de retirada claro",
              description:
                "Cada prancha tem instruções precisas de onde buscar e devolver. Você recebe tudo por e-mail ao confirmar.",
              color: "text-purple-400 bg-purple-400/10",
            },
            {
              icon: Star,
              title: "Assinatura flexível",
              description:
                "Plano mensal. Reserve quantas vezes quiser durante o mês. Cancele quando quiser, sem fidelidade.",
              color: "text-yellow-400 bg-yellow-400/10",
            },
          ].map((feature) => (
            <Card key={feature.title} className="border-border/50 bg-card/50">
              <CardContent className="pt-6 space-y-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-card/30 border-y border-border/50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Como funciona</Badge>
            <h2 className="text-3xl font-bold">Do sofá à praia em 4 passos</h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Escolha a prancha",
                description: "Filtre por tipo, tamanho, volume e condições ideais.",
              },
              {
                step: "02",
                title: "Selecione as datas",
                description: "Veja a disponibilidade em tempo real e reserve com um clique.",
              },
              {
                step: "03",
                title: "Confirme e busque",
                description: "Receba as instruções de retirada por e-mail e vá pegar sua prancha.",
              },
              {
                step: "04",
                title: "Surfe e devolva",
                description: "Aproveite as ondas e devolva no ponto combinado no prazo.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="text-4xl font-black text-primary/20">{s.step}</div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      <LandingFooter />
    </div>
  );
}
