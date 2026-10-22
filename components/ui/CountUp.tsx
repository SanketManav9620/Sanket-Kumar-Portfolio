"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 2,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setValue(to);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    // Cubic-bezier approximation for [0.22, 1, 0.36, 1]
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const updateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutQuart(progress);

      const currentVal = from + (to - from) * easedProgress;
      setValue(currentVal);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      } else {
        setValue(to);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, to, from, duration, shouldReduceMotion]);

  const formattedValue = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
