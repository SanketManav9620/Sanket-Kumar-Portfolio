"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  maxDistance?: number;
  href?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className,
  maxDistance = 8,
  onClick,
  href,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const disabled = isTouch || shouldReduceMotion;

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Constrain pull to maxDistance (8px)
    const pullX = (distanceX / (width / 2)) * maxDistance;
    const pullY = (distanceY / (height / 2)) * maxDistance;

    x.set(Math.max(-maxDistance, Math.min(maxDistance, pullX)));
    y.set(Math.max(-maxDistance, Math.min(maxDistance, pullY)));
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: disabled ? 0 : x,
        y: disabled ? 0 : y,
      }}
      className={cn("inline-block", isHovered && !disabled && "will-change-transform")}
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className={cn(
            "relative inline-flex items-center justify-center font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className
          )}
        >
          {children}
        </a>
      ) : (
        <button
          onClick={onClick}
          className={cn(
            "relative inline-flex items-center justify-center font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
