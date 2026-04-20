import { PricingSection } from "@/components/layout/PricingSection";
import { HowItWorksSection } from "@/components/layout/HowItWorksSection";
import { LandingNav } from "@/components/layout/LandingNav";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { CTASection } from "@/components/layout/CTASection";
import { HeroSection } from "@/components/layout/HeroSection";
import { BoardCarousel } from "@/components/boards/BoardCarousel";
import { ValuePropsSection } from "@/components/layout/ValuePropsSection";
import { ExplorePlacesSection } from "@/components/layout/ExplorePlacesSection";
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

      {/* Explore por lugares */}
      <ExplorePlacesSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* How it works */}
      <HowItWorksSection />

      {/* Pricing */}
      <PricingSection />

      {/* CTA */}
      <CTASection />

      <LandingFooter />
    </div>
  );
}
