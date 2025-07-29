// src/components/layout/header/Header.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

const headerVariants = {
  top: {
    backgroundColor: "rgba(255, 255, 255, 0.05)", 
    backdropFilter: "blur(0px)",
    borderColor: "rgba(231, 231, 231, 0)", 
    boxShadow: "0 0 0 0 rgba(0,0,0,0)",
  },
  scrolled: {
    backgroundColor: "hsla(var(--background) / 0.8)",
    backdropFilter: "blur(12px)",
    borderColor: "hsl(var(--border) / 0.1)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
};

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b"
      initial="top"
      animate={scrolled ? "scrolled" : "top"}
      variants={headerVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Area */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/logo.svg"
                alt="Gallery Logo"
                width={36}
                height={36}
                priority
              />
            </motion.div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Gallery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Right-side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default" }), // Changed to default for more prominence
                "hidden sm:flex items-center gap-2 group",
                "transition-all duration-300 ease-out hover:shadow-lg hover:scale-105"
              )}
            >
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
              联系我
            </Link>

            {/* Mobile Navigation Trigger */}
            <MobileNav />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;