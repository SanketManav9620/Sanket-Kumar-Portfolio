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
      {/* Funky Skewed Label Badge */}
      <Reveal delay={0.1}>
        <div
          className={cn(
            "btn-funky-tactile -rotate-1 inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-md border-2 border-[#D45476] bg-[#4A0E17] text-xs font-mono font-black uppercase tracking-widest text-[#F28EA9] shadow-[4px_4px_0px_#000000] hover:shadow-[5px_5px_0px_#7A172B] hover:rotate-0 select-none",
            align === "center" && "mx-auto"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-[#D45476] animate-pulse" />
          <span>{label}</span>
        </div>
      </Reveal>

      {/* Large Title with Mask Reveal & Pop Character */}
      <div className="overflow-hidden">
        <h2
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-[#F5EBE0]",
            titleClassName
          )}
        >
          <SplitText text={title} mode="words" delay={0.15} />
        </h2>
      </div>

      {/* Subtitle with Warm Muted Beige */}
      {subtitle && (
        <Reveal delay={0.3} yOffset={16}>
          <p
            className={cn(
              "mt-3 text-sm sm:text-base text-[#C4B4A5] font-sans leading-relaxed",
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
