"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred, do not enable smooth inertial scrolling
    if (shouldReduceMotion) {
      return;
    }

    let isDestroyed = false;
    let localLenis: Lenis | null = null;
    let cleanupTicker: (() => void) | null = null;
    let cleanupAnchor: (() => void) | null = null;

    // Dynamically load Lenis & GSAP to optimize initial bundle performance
    Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([LenisModule, gsapModule, scrollTriggerModule]) => {
      if (isDestroyed) return;

      const LenisClass = LenisModule.default;
      const gsap = gsapModule.default || gsapModule;
      const { ScrollTrigger } = scrollTriggerModule;

      gsap.registerPlugin(ScrollTrigger);

      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

      const lenis = new LenisClass({
        duration: 1.2,
        easing: easeOutQuart,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      localLenis = lenis;
      setLenisInstance(lenis);

      // Synchronize GSAP ScrollTrigger with Lenis
      lenis.on("scroll", ScrollTrigger.update);

      const handleGsapTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(handleGsapTicker);
      gsap.ticker.lagSmoothing(0);

      cleanupTicker = () => {
        lenis.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(handleGsapTicker);
      };

      // Support smooth scrolling for in-page anchor links (e.g., #projects, #experience)
      const handleAnchorClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href) return;

        // Check if it's an on-page hash link
        if (href.startsWith("#") && href.length > 1) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -80,
              duration: 1.2,
              easing: easeOutQuart,
            });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);
      cleanupAnchor = () => document.removeEventListener("click", handleAnchorClick);
    });

    return () => {
      isDestroyed = true;
      if (cleanupAnchor) cleanupAnchor();
      if (cleanupTicker) cleanupTicker();
      if (localLenis) {
        localLenis.destroy();
        setLenisInstance(null);
      }
    };
  }, [shouldReduceMotion]);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  );
}
