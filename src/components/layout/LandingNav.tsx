"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function LandingNav() {
  const { scrollTo } = useSmoothScroll();

  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    scrollTo(id);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/surfpack-logo.svg"
            alt="EasySurf"
            width={150}
            height={34}
            className="w-[150px] h-auto dark:invert"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/boards"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pranchas
          </Link>
          <a
            href="#features"
            onClick={(e) => handleAnchor(e, "features")}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Funcionalidades
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleAnchor(e, "how-it-works")}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Como funciona
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleAnchor(e, "pricing")}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Preços
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/pricing">Assinar agora</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
