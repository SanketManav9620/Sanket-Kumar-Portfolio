"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";
import { Typewriter } from "@/components/ui/Typewriter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SystemArchitectureVisual } from "@/components/sections/SystemArchitectureVisual";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { profileData } from "@/data/profile";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/Icons";
import { ArrowRight, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const shouldReduceMotion = useReducedMotion();

  // Subtle parallax effect on scroll (disabled on reduced motion)
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  // Mouse-follow glow that lags slightly behind the cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 180 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 180 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const roles = [
    "Full-Stack Developer",
    "Backend Engineer",
    "AI/ML Enthusiast",
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 sm:py-32 px-4 sm:px-6 md:px-12"
    >
      {/* Drifting blurred gradient blobs in background (20s+ loop) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-[130px] pointer-events-none animate-blob-1" />
      <div className="absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-secondary/15 blur-[140px] pointer-events-none animate-blob-2" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-[#024950]/35 blur-[110px] pointer-events-none" />

      {/* Interactive mouse follow glow (disabled on touch & reduced motion) */}
      {!isTouch && !shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px z-0 rounded-full w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
            background: "radial-gradient(circle, rgba(15, 164, 175, 0.28) 0%, rgba(150, 71, 52, 0.12) 50%, transparent 75%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Parallax Wrapper */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : heroY,
          opacity: shouldReduceMotion ? 1 : heroOpacity,
        }}
        className={cn(
          "relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center",
          !shouldReduceMotion && "will-change-transform"
        )}
      >
        {/* Left Column: Headlines, Typewriter, Bio, Actions, Socials */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* 1. Available Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-secondary/30 bg-secondary/[0.06] backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-secondary">
              Available for opportunities
            </span>
          </motion.div>

          {/* 2. Headline: Name */}
          <div className="overflow-hidden mb-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white leading-[1.05]">
              <SplitText text="Sanket Kumar" mode="words" delay={0.35} />
            </h1>
          </div>

          {/* 3. Typewriter Line */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            className="font-mono text-lg sm:text-xl md:text-2xl text-primary-light font-semibold mb-5 flex items-center gap-2"
          >
            <span className="text-muted/60 font-mono text-sm sm:text-base">&gt;</span>
            <Typewriter words={roles} typingSpeed={75} deletingSpeed={35} />
          </motion.div>

          {/* 4. Short Tagline / Bio */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="text-base sm:text-lg text-muted max-w-xl leading-relaxed mb-8 font-sans"
          >
            B.Tech CSE student at <span className="text-white font-medium">BPIT Delhi</span> (graduating 2027) with a <span className="text-secondary font-medium">9.05 CGPA</span> and <span className="text-primary-light font-medium">300+ DSA problems solved</span>. Building scalable, AI-powered products and high-performance distributed systems.
          </motion.p>

          {/* 5. Magnetic CTA Buttons with Micro-interactions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <MagneticButton
              onClick={() => {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-mono text-xs uppercase tracking-wider font-semibold border border-primary/40 shadow-glow hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <MagneticButton
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/[0.04] text-slate-200 font-mono text-xs uppercase tracking-wider font-semibold border border-white/10 hover:border-white/30 hover:bg-white/[0.08] active:scale-95 transition-all flex items-center gap-2 backdrop-blur-sm group cursor-pointer"
            >
              <span>Download CV</span>
              <Download className="w-4 h-4 text-muted group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </motion.div>

          {/* 6. Social Links (GitHub, LinkedIn, LeetCode) with Card Lift & Icon Rotate */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
            className="flex items-center gap-4 text-muted"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-muted/70">
              Profiles:
            </span>

            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 card-hover-lift group"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4 icon-hover-rotate" />
            </a>

            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted hover:text-[#38bdf8] hover:border-[#38bdf8]/50 hover:bg-[#38bdf8]/10 transition-all duration-200 card-hover-lift group"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 icon-hover-rotate" />
            </a>

            <a
              href={profileData.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-muted hover:text-secondary hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-200 card-hover-lift group"
              aria-label="LeetCode Profile (300+ Solved)"
            >
              <LeetcodeIcon className="w-4 h-4 icon-hover-rotate" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Animated System Architecture Visual */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="w-full flex justify-center"
          >
            <SystemArchitectureVisual />
          </motion.div>
        </div>
      </motion.div>

      {/* Bouncing Scroll Indicator at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60">
          Scroll
        </span>
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5 motion-reduce:animate-none"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-secondary motion-reduce:animate-none"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
