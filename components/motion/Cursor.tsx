"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Cursor() {
  const isTouch = useIsTouch();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view">("default");

  const disabled = isTouch || shouldReduceMotion;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing physics for outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering over interactive clickable buttons/links first
      const isInteractive = target.closest("a, button, input, textarea, select, [data-cursor='hover']");
      if (isInteractive && !isInteractive.hasAttribute("data-cursor-force-view")) {
        setCursorType("hover");
        return;
      }

      // Check if hovering over project card or element with data-cursor="view"
      const isProjectCard = target.closest("[data-cursor='view']") || target.closest(".project-card");
      if (isProjectCard) {
        setCursorType("view");
        return;
      }

      setCursorType("default");
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [disabled, isVisible, mouseX, mouseY]);

  if (disabled || !isVisible) return null;

  // Animate transform scale instead of mutating layout width/height
  const ringScales = {
    default: 0.5,
    hover: 0.85,
    view: 1.2,
  };

  const targetScale = ringScales[cursorType];

  return (
    <div className="pointer-events-none fixed inset-0 z-[99998] overflow-hidden select-none">
      {/* Center dot - precise positioning */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: cursorType === "view" ? 0 : 1,
        }}
      />

      {/* Trailing Ring - fixed 64px base with GPU transform scale */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform border"
        style={{
          x: ringX,
          y: ringY,
          borderColor: cursorType === "view" ? "#0FA4AF" : "rgba(175, 221, 229, 0.75)",
          backgroundColor:
            cursorType === "view"
              ? "rgba(15, 164, 175, 0.22)"
              : cursorType === "hover"
              ? "rgba(150, 71, 52, 0.25)"
              : "transparent",
          backdropFilter: cursorType === "view" ? "blur(4px)" : "none",
        }}
        animate={{
          scale: targetScale,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {cursorType === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#AFDDE5] select-none"
          >
            View
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
