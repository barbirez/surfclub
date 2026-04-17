import { Badge } from "@/components/ui/badge";
import { FeaturesSection } from "@/components/layout/FeaturesSection";
import { PricingSection } from "@/components/layout/PricingSection";
import { LandingNav } from "@/components/layout/LandingNav";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { HeroSection } from "@/components/layout/HeroSection";
import { BoardCarousel } from "@/components/boards/BoardCarousel";
import { ValuePropsSection } from "@/components/layout/ValuePropsSection";
import { TestimonialsSection } from "@/components/layout/TestimonialsSection";
import { db } from "@/lib/db";

export default async function LandingPage() {
  const boards = await db.surfboard.findMany({
    where: { status: "AVAILABLE" },
    include: { location: { select: { city: true, town: true } } },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      <HeroSection />

      {/* Board carousel */}
      <BoardCarousel boards={boards} />

      {/* Value props — scroll reveal */}
      <ValuePropsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Features */}
      <FeaturesSection />

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
