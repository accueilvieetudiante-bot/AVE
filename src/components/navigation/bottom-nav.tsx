"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, CalendarDays, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/evenements", label: "Événements", icon: CalendarDays },
  { href: "/assistance", label: "Assistance", icon: LifeBuoy },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-md items-center justify-between rounded-2xl glass px-2 py-2"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.5rem)" }}
    >
      {tabs.map((tab) => {
        const active =
          tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="relative flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium text-muted-foreground"
          >
            {active && (
              <motion.span
                layoutId="bottom-nav-active"
                className="absolute inset-0 rounded-xl gradient-brand shadow-soft"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <tab.icon
              className={cn(
                "relative size-5",
                active && "text-primary-foreground",
              )}
            />
            <span className={cn("relative", active && "text-primary-foreground")}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
