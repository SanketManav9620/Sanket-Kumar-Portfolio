"use client";

import React from "react";
import { motion } from "framer-motion";
import { EASE, DURATIONS, STAGGER } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  mode?: "words" | "lines";
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export function SplitText({
  text,
  mode = "words",
  className,
  wordClassName,
  delay = 0,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const items = mode === "words" ? text.split(" ") : text.split("\n");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: STAGGER.default,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: "115%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: DURATIONS.reveal,
        ease: EASE,
      },
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {items.map((item, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden py-0.5 leading-[1.15]"
        >
          <motion.span
            variants={itemVariants}
            className={cn("inline-block", wordClassName)}
          >
            {item}
            {mode === "words" && index < items.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
