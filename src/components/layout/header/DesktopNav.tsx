// src/components/layout/header/DesktopNav.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navLinks, NavLink } from "@/config/nav";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  const pathname = usePathname();
  // We don't need hover state if we use layout animations on a shared element
  // The magic happens with `layoutId`

  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navLinks.map((link) => (
        <div key={link.label} className="relative">
          {link.isDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    "text-muted-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  {link.label} <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <AnimatePresence>
                <DropdownMenuContent
                  asChild
                  className="mt-2 w-48 origin-top-right"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    {link.items.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </motion.div>
                </DropdownMenuContent>
              </AnimatePresence>
            </DropdownMenu>
          ) : (
            <Link
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                "text-muted-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              {link.label}
            </Link>
          )}
          {/* Animated underline */}
          {((!link.isDropdown && pathname === link.href) ||
            (link.isDropdown &&
              link.items.some((item) => pathname === item.href))) && (
            <motion.div
              layoutId="desktop-nav-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      ))}
    </nav>
  );
}