"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, CalendarDays, LayoutDashboard, Settings, LogOut, ChevronDown } from "lucide-react";


interface BrowseHeaderProps {
  isLoggedIn: boolean;
  userName: string | null;
  userImage: string | null;
}

export function BrowseHeader({ isLoggedIn, userName, userImage }: BrowseHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
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

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/boards" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-4 w-4" />
            Pranchas
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/reservations" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <CalendarDays className="h-4 w-4" />
                Reservas
              </Link>
              <Link href="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
           
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
              <Link href="/pricing">Assinar agora</Link>
            </Button>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}
