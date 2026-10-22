"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TiltCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees
  perspective?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 6,
  perspective = 1000,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const disabled = isTouch || shouldReduceMotion;

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // RotateX rotates around horizontal axis (Y movement controls it)
  // RotateY rotates around vertical axis (X movement controls it)
  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  // Glare position
  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={cn("relative", isHovered && !disabled && "will-change-transform")}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-[rgba(175,221,229,0.1)] bg-[#003135] card-hover-lift",
          className
        )}
        {...props}
      >
        {/* Subtle Glare Layer */}
        {!disabled && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl z-20 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.12 : 0,
              background: `radial-gradient(circle 350px at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.8), transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}
        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    </div>
  );
}
