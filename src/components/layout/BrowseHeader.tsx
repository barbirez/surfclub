"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Waves, Search, CalendarDays, LayoutDashboard, Settings, LogOut, ChevronDown } from "lucide-react";

interface BrowseHeaderProps {
  isLoggedIn: boolean;
  userName: string | null;
  userImage: string | null;
}

export function BrowseHeader({ isLoggedIn, userName, userImage }: BrowseHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Waves className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">EasySurf</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/boards" className="flex items-center gap-1.5">
              <Search className="h-4 w-4" />
              Pranchas
            </Link>
          </Button>
          {isLoggedIn && (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/reservations" className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  Reservas
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard" className="flex items-center gap-1.5">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            </>
          )}
        </nav>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary transition-colors">
              {userImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={userImage} alt={userName || "User"} className="h-7 w-7 rounded-full" />
              ) : (
                <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                  {userName?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              <span className="hidden md:inline text-sm">{userName?.split(" ")[0]}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => router.push("/settings/billing")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Settings className="h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/login">Começar grátis</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
