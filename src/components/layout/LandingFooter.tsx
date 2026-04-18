"use client";

import Link from "next/link";
import Image from "next/image";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export function LandingFooter() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/surfpack-logo.svg"
              alt="Surf Pack"
              width={100}
              height={28}
              className="w-[100px] h-auto dark:invert"
            />
          </Link>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EasySurf. Feito com 🏄 para surfistas.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a
              href="#pricing"
              onClick={(e) => { e.preventDefault(); scrollTo("pricing"); }}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Preços
            </a>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
