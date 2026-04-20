"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export function LandingNav() {
  const { scrollTo } = useSmoothScroll();

  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    scrollTo(id);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-wavyclub.svg"
            alt="WavyClub"
            width={150}
            height={34}
            className="w-[180px] h-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/boards"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pranchas
          </Link>
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
            Planos
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="font-medium">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild size="sm" className="h-9 px-5 font-semibold rounded-full">
            <Link href="/pricing">Assinar agora</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
