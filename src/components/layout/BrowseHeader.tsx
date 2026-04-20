"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Settings, LogOut, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/client";

interface BrowseHeaderProps {
  isLoggedIn: boolean;
  userName: string | null;
  userImage: string | null;
}

export function BrowseHeader({ isLoggedIn, userName, userImage }: BrowseHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useT();

  const navLinks = isLoggedIn
    ? [
        { label: t.nav.boards, href: "/boards" },
        { label: t.nav.reservations, href: "/reservations" },
        { label: t.nav.dashboard, href: "/dashboard" },
      ]
    : [{ label: t.nav.boards, href: "/boards" }];

  return (
    <div className="sticky top-0 z-50 flex justify-center w-full px-6 py-3">
      <motion.div
        className="flex items-center justify-between px-4 py-2 rounded-full w-full max-w-5xl bg-background/70 backdrop-blur-xl border border-border/40 shadow-sm"
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
              <Link href={item.href} className="text-base font-medium text-white/60 hover:text-white transition-colors">
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm hover:bg-white/10 transition-colors outline-none">
                {userImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={userImage} alt={userName || "User"} className="h-7 w-7 rounded-full" />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                    {userName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="hidden md:inline text-base text-white/80">{userName?.split(" ")[0]}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push("/settings/billing")} className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  {t.nav.settings}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  {t.nav.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div className="hidden md:block" whileHover={{ scale: 1.03 }}>
              <Button asChild size="sm" className="h-9 px-5 font-semibold rounded-full">
                <Link href="/login">{t.nav.signIn}</Link>
              </Button>
            </motion.div>
          )}

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
                  <Link href={item.href} className="text-2xl font-semibold text-foreground" onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {!isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4"
                >
                  <Button asChild className="w-full h-12 rounded-full font-semibold text-base">
                    <Link href="/login" onClick={() => setIsOpen(false)}>{t.nav.signIn}</Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
