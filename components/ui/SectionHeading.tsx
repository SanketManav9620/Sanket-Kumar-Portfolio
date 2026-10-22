"use client";

import React from "react";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-3xl",
        className
      )}
    >
      {/* Small mono label */}
      <Reveal delay={0.1}>
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono uppercase tracking-widest text-primary-light",
            align === "center" && "mx-auto"
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span>{label}</span>
        </div>
      </Reveal>

      {/* Large Title with Mask Reveal */}
      <div className="overflow-hidden">
        <h2
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white",
            titleClassName
          )}
        >
          <SplitText text={title} mode="words" delay={0.15} />
        </h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <Reveal delay={0.3} yOffset={16}>
          <p
            className={cn(
              "mt-4 text-base sm:text-lg text-muted font-sans leading-relaxed",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
