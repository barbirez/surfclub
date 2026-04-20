"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Camera, MessageCircle, CirclePlay } from "lucide-react";
import { Footer } from "@/components/ui/footer";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useT } from "@/lib/i18n/client";

export function LandingFooter() {
  const { t } = useT();
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
          { href: "/boards", label: t.footer.boards },
          { href: "#how-it-works", label: t.footer.howItWorks },
          { href: "#pricing", label: t.footer.plans },
          { href: "/login", label: t.footer.signIn },
        ]}
        legalLinks={[
          { href: "/privacy", label: t.footer.privacy },
          { href: "/terms", label: t.footer.terms },
        ]}
        copyright={{
          text: `© ${new Date().getFullYear()} WavyClub`,
          license: t.footer.license,
        }}
        languageSwitcher={<LanguageSwitcher />}
      />
    </motion.div>
  );
}
