"use client";

import Link from "next/link";
import { Waves } from "lucide-react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export function LandingFooter() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Waves className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold">EasySurf</span>
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
