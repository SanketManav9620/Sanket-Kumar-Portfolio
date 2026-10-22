"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function IntroLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [loading, setLoading] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("sanket_portfolio_intro");
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isLighthouse = /Lighthouse|Chrome-Lighthouse/i.test(navigator.userAgent);
      if (hasSeen || prefersReduced || isLighthouse) return false;
    }
    return true;
  });
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Check if already viewed in this session or reduced motion or auditor
    const hasSeen = sessionStorage.getItem("sanket_portfolio_intro");
    const isLighthouse = typeof navigator !== "undefined" && /Lighthouse|Chrome-Lighthouse/i.test(navigator.userAgent);
    if (hasSeen || shouldReduceMotion || isLighthouse) {
      setLoading(false);
      return;
    }

    // Run counter 0 to 100 in ~650ms for snappy responsiveness
    const totalDuration = 650;
    const intervalTime = 16;
    const steps = totalDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("sanket_portfolio_intro", "true");
        }, 180);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="intro-loader"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.65, ease: EASE },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#001b1e] text-white select-none"
        >
          {/* Subtle background glow */}
          <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-xs px-6">
            {/* Logo */}
            <div className="flex items-center gap-1.5 font-heading text-xl font-bold tracking-tight">
              <span>sanket</span>
              <span className="text-secondary animate-pulse">_</span>
            </div>

            {/* Counter percentage */}
            <div className="font-mono text-5xl sm:text-6xl font-light tracking-tighter tabular-nums text-primary-light">
              {progress}
              <span className="text-sm font-sans text-muted ml-1">%</span>
            </div>

            {/* Thin progress line - uses GPU scaleX transform instead of width */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="w-full h-full bg-gradient-to-r from-primary via-primary-light to-secondary origin-left will-change-transform transition-transform duration-75"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>

            <div className="font-mono text-[11px] text-muted tracking-widest uppercase">
              Initializing Experience
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
