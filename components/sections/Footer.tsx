"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/components/motion/SmoothScroll";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE } from "@/lib/motion";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const { lenis } = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative pt-20 pb-12 px-4 sm:px-6 md:px-12 border-t border-[rgba(175,221,229,0.08)] bg-[#00171a] overflow-hidden">
      {/* Subtle top edge glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Top Tier: Brand, Navigation links, and Back-to-Top Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/[0.05]">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#003135] border border-[rgba(175,221,229,0.2)] flex items-center justify-center text-primary font-mono text-xs font-bold shadow-glow">
              SK
            </div>
            <div>
              <p className="font-heading font-bold text-white text-base tracking-tight">
                Sanket Kumar
              </p>
              <p className="font-mono text-xs text-muted/80">
                Full-Stack & Systems Engineer
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-wider text-muted hover:text-primary transition-colors link-draw-underline pb-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to Top Button using Lenis */}
          <div>
            <MagneticButton
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/30 bg-[#003135]/80 hover:bg-primary/20 hover:border-primary text-primary-light font-mono text-xs font-semibold transition-all shadow-glow group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 icon-hover-lift transition-transform" />
            </MagneticButton>
          </div>
        </div>

        {/* Large Faded "SANKET KUMAR" Wordmark that reveals on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          whileInView={{ opacity: 0.06, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="w-full text-center overflow-hidden py-4 select-none pointer-events-none"
        >
          <span className="font-heading font-black text-[12vw] leading-none tracking-tighter text-white uppercase whitespace-nowrap block drop-shadow-sm">
            SANKET KUMAR
          </span>
        </motion.div>

        {/* Bottom Tier: Copyright, Tech disclaimer, and Timezone */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted/70 pt-2">
          <p>© {new Date().getFullYear()} Sanket Kumar. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span>Engineered with Next.js 14 & Framer Motion</span>
            <span>•</span>
            <span className="text-primary-light font-medium">REFIRE Aesthetic</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
            <span>Rohini, Delhi • UTC +05:30</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
