"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Camera, MessageCircle, CirclePlay } from "lucide-react";
import { Footer } from "@/components/ui/footer";

export function LandingFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-border/50"
    >
      <Footer
        logo={
          <Image
            src="/logo-wavyclub.svg"
            alt="WavyClub"
            width={130}
            height={30}
            className="w-[130px] h-auto"
          />
        }
        brandName="WavyClub"
        socialLinks={[
          {
            icon: <Camera className="h-4 w-4" />,
            href: "https://instagram.com/wavyclub",
            label: "Instagram",
          },
          {
            icon: <MessageCircle className="h-4 w-4" />,
            href: "https://twitter.com/wavyclub",
            label: "Twitter",
          },
          {
            icon: <CirclePlay className="h-4 w-4" />,
            href: "https://youtube.com/@wavyclub",
            label: "YouTube",
          },
        ]}
        mainLinks={[
          { href: "/boards", label: "Pranchas" },
          { href: "#how-it-works", label: "Como funciona" },
          { href: "#pricing", label: "Planos" },
          { href: "/login", label: "Entrar" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacidade" },
          { href: "/terms", label: "Termos de uso" },
        ]}
        copyright={{
          text: `© ${new Date().getFullYear()} WavyClub`,
          license: "Feito de surfistas para surfistas.",
        }}
      />
    </motion.div>
  );
}
