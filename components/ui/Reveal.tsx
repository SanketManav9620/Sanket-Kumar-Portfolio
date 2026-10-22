"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { EASE, DURATIONS } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  width?: "fit-content" | "100%";
}

export function Reveal({
  children,
  delay = 0,
  duration = DURATIONS.reveal,
  yOffset = 24,
  className,
  width = "fit-content",
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: yOffset }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : duration,
        delay,
        ease: EASE,
      }}
      className={cn(className)}
      style={{ width }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
