"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/client";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export function LandingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useT();
  const { scrollTo } = useSmoothScroll();

  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    scrollTo(id);
    setIsOpen(false);
  }

  const navLinks = [
    { label: t.nav.boards, href: "/boards" },
    { label: t.nav.howItWorks, anchor: "how-it-works" },
    { label: t.nav.plans, anchor: "pricing" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-6 py-3">
      <motion.div
        className="flex items-center justify-between px-4 py-2 rounded-full w-full max-w-5xl bg-background/60 backdrop-blur-xl border border-white/10 shadow-md shadow-black/10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo-wavyclub.svg" alt="WavyClub" width={140} height={32} className="w-[140px] h-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              {item.anchor ? (
                <a
                  href={`#${item.anchor}`}
                  onClick={(e) => handleAnchor(e, item.anchor!)}
                  className="text-base font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ) : (
                <Link href={item.href!} className="text-base font-medium text-white/60 hover:text-white transition-colors">
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <Button asChild size="sm" className="h-9 px-5 text-base font-medium rounded-full">
              <Link href="/login">{t.nav.signIn}</Link>
            </Button>
          </motion.div>

          <motion.button
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(true)}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-5 w-5 text-foreground" />
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col pt-24 px-8 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-5 right-5 h-9 w-9 flex items-center justify-center rounded-full border border-border"
              onClick={() => setIsOpen(false)}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.button>

            <div className="flex flex-col gap-7">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {item.anchor ? (
                    <a
                      href={`#${item.anchor}`}
                      onClick={(e) => handleAnchor(e, item.anchor!)}
                      className="text-2xl font-semibold text-foreground"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href!} className="text-2xl font-semibold text-foreground" onClick={() => setIsOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                exit={{ opacity: 0, y: 16 }}
                className="pt-4"
              >
                <Button asChild className="w-full h-12 rounded-full font-semibold text-base">
                  <Link href="/login" onClick={() => setIsOpen(false)}>{t.nav.signIn}</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
