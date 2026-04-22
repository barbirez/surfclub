import { Hero } from "@/components/case-study/Hero";
import { Manifesto } from "@/components/case-study/Manifesto";
import { ProductScroll } from "@/components/case-study/ProductScroll";
import { Loop } from "@/components/case-study/Loop";
import { Reference } from "@/components/case-study/Reference";
import { StageFraming } from "@/components/case-study/StageFraming";
import { StageShaping } from "@/components/case-study/StageShaping";
import { StageBreadboard } from "@/components/case-study/StageBreadboard";
import { StageBuilding } from "@/components/case-study/StageBuilding";
import { StageShipping } from "@/components/case-study/StageShipping";
import { Product } from "@/components/case-study/Product";
import { BuildGallery } from "@/components/case-study/BuildGallery";
import { Reflection } from "@/components/case-study/Reflection";
import { WhatsNext } from "@/components/case-study/WhatsNext";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";
import { StagesMarquee } from "@/components/case-study/Divider";

export default function CaseStudyPage() {
  return (
    <main>
      <Hero />
      <StagesMarquee />
      <Manifesto />
      <ProductScroll />
      <Loop />
      <Reference />
      <StageFraming />
      <StageShaping />
      <StageBreadboard />
      <StageBuilding />
      <StageShipping />
      <Product />
      <BuildGallery />
      <Reflection />
      <WhatsNext />
      <CaseStudyFooter />
    </main>
  );
}
