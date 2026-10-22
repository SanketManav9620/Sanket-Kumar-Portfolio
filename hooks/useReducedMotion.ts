"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const framerReduced = useFramerReducedMotion();
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return Boolean(framerReduced || prefersReduced);
}
