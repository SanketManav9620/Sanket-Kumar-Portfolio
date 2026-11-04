"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { SystemArchitectureVisual } from "@/components/sections/SystemArchitectureVisual";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { profileData } from "@/data/profile";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/Icons";
import { ArrowRight, Download, Zap, Check, Terminal, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const shouldReduceMotion = useReducedMotion();
  const [pluggedInSurge, setPluggedInSurge] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 90]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Dynamic subtle mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 180 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 180 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 200);
    mouseY.set(e.clientY - rect.top - 200);
  };

  const handlePlugClick = () => {
    setPluggedInSurge(true);
    setTimeout(() => setPluggedInSurge(false), 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden pt-24 sm:pt-28 pb-16 px-4 sm:px-6 md:px-10 bg-[#162032]"
    >
      {/* ==========================================================
          DYNAMIC FUNKY BACKGROUND: DARK GREY, BEIGE & BURGUNDY
          ========================================================== */}

      {/* 1. Dark Charcoal Grey Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#162032] via-[#16171d] to-[#0d0e10] -z-30" />

      {/* 2. Comic Halftone Dots in Lighter Burgundy */}
      <div className="absolute inset-0 comic-halftone opacity-40 pointer-events-none -z-20" />

      {/* Interactive mouse follow glow */}
      {!isTouch && !shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px -z-10 rounded-full w-[420px] h-[420px] blur-3xl opacity-25"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
            background: "radial-gradient(circle, rgba(178, 58, 91, 0.45) 0%, rgba(245, 235, 224, 0.15) 50%, transparent 75%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* 3. Bold Persona 5-Style Dynamic Diagonal Speed Slash */}
      <div
        className="absolute top-0 right-[-15%] sm:right-[5%] w-[130%] sm:w-[65%] h-[160%] -top-[30%] pointer-events-none -z-10 origin-center rotate-[-22deg] overflow-hidden"
        aria-hidden="true"
      >
        {/* Main Solid Diagonal Speed Stripe in Dark Slate Grey */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e2a42] via-[#263756] to-[#151f33] border-l-4 border-r-4 border-[#B23A5B]/40 shadow-[0_0_80px_rgba(178,58,91,0.2)] opacity-95" />
        
        {/* Burgundy & Beige Accent Lines slicing through */}
        <div className="absolute top-0 left-0 w-2.5 h-full bg-[#B23A5B] shadow-[0_0_15px_#B23A5B]" />
        <div className="absolute top-0 right-0 w-2.5 h-full bg-[#F5EBE0] shadow-[0_0_15px_#F5EBE0]" />
        
        {/* Halftone Dot pattern inside the diagonal slash */}
        <div className="absolute inset-0 comic-halftone-burgundy opacity-30" />
        
        {/* Speed streaks inside slash */}
        <div className="absolute inset-0 comic-speed-lines opacity-35" />
      </div>

      {/* 4. Ambient Energy Blobs in Burgundy & Warm Beige */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#B23A5B]/15 blur-[120px] pointer-events-none -z-10 animate-blob-1" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#F5EBE0]/10 blur-[130px] pointer-events-none -z-10 animate-blob-2" />

      {/* ==========================================================
          MAIN HERO PARALLAX WRAPPER
          ========================================================== */}
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : heroY,
          opacity: shouldReduceMotion ? 1 : heroOpacity,
        }}
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center"
      >
        {/* --------------------------------------------------------
            LEFT COLUMN: COMIC HEADLINE, BIO, BUTTONS, BADGES
            -------------------------------------------------------- */}
        <div className="lg:col-span-7 flex flex-col items-start text-left relative">
          
          {/* Top Row: "TAKE YOUR TIME" Rubber Stamp & Skewed Role Badge */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 select-none">
            {/* 1. "TAKE YOUR TIME" Vintage Comic Rubber Stamp in Warm Beige */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="px-3 py-1 comic-stamp-box bg-[#3a3229]/90 backdrop-blur-sm -rotate-6 hover:rotate-0 transition-transform duration-200 cursor-default"
              title="Persona 5 homage stamp"
            >
              <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#F5EBE0]/90">
                TAKE YOUR TIME
              </span>
            </motion.div>

            {/* 2. Skewed Tactile Role Badge in Warm Beige */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#F5EBE0] text-black font-heading font-black text-xs uppercase tracking-wider -rotate-2 shadow-brutal-black border-2 border-black hover:rotate-0 transition-transform"
            >
              <Zap className="w-3.5 h-3.5 fill-[#B23A5B] text-[#B23A5B]" />
              <span>SOFTWARE DEVELOPER</span>
            </motion.div>

            {/* 3. Live Status Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#4A0E17]/85 border-2 border-[#D45476] text-[11px] font-mono text-[#F28EA9] shadow-[3px_3px_0px_#000000]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B23A5B] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B23A5B]" />
              </span>
              <span>OPEN TO ROLES</span>
            </motion.div>
          </div>

          {/* Main Display Headline: SANKET KUMAR with 3D Pop Drop Shadow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="relative mb-3 select-none"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black tracking-tighter text-[#F5EBE0] uppercase leading-[0.95] text-pop-3d-contrast">
              Sanket Kumar
            </h1>

            {/* Sub-headline / Specialty Bar in Burgundy & Beige */}
            <div className="mt-2.5 flex items-center gap-2 font-mono text-sm sm:text-base text-[#E8D5C4] font-bold">
              <span className="text-[#B23A5B] font-black">&gt;&gt;</span>
              <span>FULL-STACK &bull; DISTRIBUTED SYSTEMS &bull; AI</span>
            </div>
          </motion.div>

          {/* ========================================================
              FUNKY COMIC DESCRIPTION BOX (with Plugged-In Badge)
              ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            className="relative w-full max-w-xl mt-6 mb-7"
          >
            {/* The Funky Floating "PLUGGED IN" Power Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0 z-20">
              <button
                type="button"
                onClick={handlePlugClick}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-md font-mono text-xs font-black uppercase tracking-wider transition-all duration-200 select-none",
                  "bg-[#4A0E17] text-[#F28EA9] border-2 border-[#D45476] shadow-[4px_4px_0px_#000000] active:scale-95 hover:border-[#F28EA9]",
                  pluggedInSurge && "bg-[#B23A5B] text-white border-black shadow-brutal-black ring-4 ring-[#B23A5B]/40 animate-bounce"
                )}
                title="Click to surge power!"
              >
                {/* Comic Power Plug / Lightning SVG */}
                <div className="relative">
                  <svg
                    className={cn(
                      "w-4 h-4 transition-transform",
                      pluggedInSurge ? "scale-125 text-white" : "text-[#B23A5B]"
                    )}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v6" />
                    <path d="M7 8h10" />
                    <rect x="5" y="8" width="14" height="8" rx="2" fill="currentColor" fillOpacity="0.2" />
                    <path d="M12 16v6" />
                    <path d="M9 22h6" />
                  </svg>
                  {pluggedInSurge && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FAF5EE] opacity-90" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FAF5EE]" />
                    </span>
                  )}
                </div>
                <span>{pluggedInSurge ? "100% CHARGED!" : "PLUGGED IN"}</span>
                <span className="text-[10px] text-[#E8D5C4] opacity-80 font-normal">
                  {pluggedInSurge ? "⚡ SURGE" : "// ACTIVE"}
                </span>
              </button>
            </div>

            {/* Main Comic Bio Card in Dark Slate Grey with Beige Border & Burgundy Shadow */}
            <div className="relative pt-6 pb-5 px-5 sm:px-6 bg-[#3a3229]/95 rounded-lg border-2 border-[#E8D5C4] shadow-[6px_6px_0px_#4A0E17] hover:shadow-[8px_8px_0px_#D45476] backdrop-blur-md transition-shadow hover:shadow-[8px_8px_0px_#D45476]">
              {/* Corner Screws / Accents */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#F5EBE0]/50" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#F5EBE0]/50" />
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#F5EBE0]/50" />
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#F5EBE0]/50" />

              <p className="text-sm sm:text-base text-[#F5EBE0] font-sans leading-relaxed font-medium">
                Software Developer focused on building <strong className="text-white underline decoration-[#B23A5B] decoration-2 underline-offset-2">reliable & scalable systems</strong>, specializing in Backend Architectures, High-Throughput Distributed Queues, and AI Applications.
              </p>

              {/* Fast Facts / Academic Punchline */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#C4B4A5]">
                <div className="flex items-center gap-1.5 text-[#F5EBE0] font-semibold">
                  <Trophy className="w-3.5 h-3.5 text-[#E8D5C4]" />
                  <span>9.05 CGPA</span>
                  <span className="text-[#A09A92] font-normal">&bull; BPIT Delhi &apos;27</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#F5EBE0] font-semibold">
                  <Flame className="w-3.5 h-3.5 text-[#B23A5B]" />
                  <span>300+ DSA Solved</span>
                  <span className="text-[#A09A92] font-normal">&bull; LeetCode</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================
              FUNKY TACTILE STICKER BUTTONS
              ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="flex flex-wrap items-center gap-4 sm:gap-5 mb-8 select-none"
          >
            {/* Button 1: VIEW PROJECTS (Warm Beige Sticker with Black Border & Shadow) */}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-funky-tactile -rotate-2 inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#F5EBE0] text-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-black shadow-[5px_5px_0px_#4A0E17] hover:bg-white hover:shadow-[7px_7px_0px_#D45476] cursor-pointer group"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Button 2: READ RESUME (Lighter Burgundy Sticker with White Text & Black Shadow) */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-funky-tactile rotate-2 inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#7A172B] to-[#D45476] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-black shadow-[5px_5px_0px_#4A0E17] hover:from-[#9B2242] hover:to-[#F28EA9] hover:text-black hover:shadow-[7px_7px_0px_#4A0E17] cursor-pointer group"
            >
              <span>READ RESUME</span>
              <Download className="w-4 h-4 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Quick Email Copy Pill */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3.5 py-2 rounded bg-[#4A0E17]/80 border-2 border-[#D45476]/60 hover:border-[#D45476] text-xs font-mono text-[#F28EA9] shadow-[3px_3px_0px_#000000] hover:text-white hover:border-[#B23A5B] transition-colors flex items-center gap-1.5"
              title="Copy email to clipboard"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#B23A5B]" />
                  <span className="text-[#F5EBE0]">Copied!</span>
                </>
              ) : (
                <>
                  <Terminal className="w-3.5 h-3.5 text-[#B23A5B]" />
                  <span>0sanket0kumar@gmail.com</span>
                </>
              )}
            </button>
          </motion.div>

          {/* ========================================================
              TACTILE COMIC SOCIAL STAMPS
              ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
            className="flex items-center gap-3 select-none"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#E8D5C4]/80 font-bold">
              CONNECT:
            </span>

            {/* GitHub Stamp */}
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-funky-tactile -rotate-3 p-2.5 bg-[#3a3229] text-[#F5EBE0] border-2 border-[#F5EBE0] shadow-brutal-burgundy hover:bg-[#B23A5B] hover:text-white hover:border-black transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* LinkedIn Stamp */}
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-funky-tactile rotate-2 p-2.5 bg-[#3a3229] text-[#F5EBE0] border-2 border-[#F5EBE0] shadow-brutal-black hover:bg-[#0077b5] hover:text-white transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* LeetCode Stamp */}
            <a
              href={profileData.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-funky-tactile -rotate-2 p-2.5 bg-[#3a3229] text-[#F5EBE0] border-2 border-[#F5EBE0] shadow-brutal-beige hover:bg-[#B23A5B] hover:text-white hover:border-black transition-all"
              aria-label="LeetCode Profile (300+ Problems Solved)"
            >
              <LeetcodeIcon className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* --------------------------------------------------------
            RIGHT COLUMN: SYSTEM ARCHITECTURE HUD & STICKERS
            -------------------------------------------------------- */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          
          {/* Interactive Floating Stickers in Beige & Burgundy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="relative w-full max-w-[460px]"
          >
            {/* Floating Sticker 1: 9.05 CGPA in Warm Beige */}
            <div
              className="absolute -top-4 -left-3 sm:-left-6 z-30 sticker-wiggle select-none pointer-events-auto"
              style={{ "--base-rotate": "-6deg" } as React.CSSProperties}
            >
              <div className="px-3 py-1.5 bg-[#F5EBE0] text-black font-heading font-black text-xs uppercase tracking-wider border-2 border-black shadow-brutal-black -rotate-6">
                <span className="flex items-center gap-1">
                  <span className="text-[#B23A5B]">★</span>
                  <span>9.05 CGPA</span>
                </span>
              </div>
            </div>

            {/* Floating Sticker 2: 300+ DSA in Lighter Burgundy */}
            <div
              className="absolute -top-3 -right-2 sm:-right-4 z-30 sticker-wiggle select-none pointer-events-auto"
              style={{ "--base-rotate": "5deg" } as React.CSSProperties}
            >
              <div className="px-3 py-1.5 bg-[#B23A5B] text-white font-heading font-black text-xs uppercase tracking-wider border-2 border-black shadow-brutal-black rotate-6">
                <span className="flex items-center gap-1">
                  <span>🔥</span>
                  <span>300+ DSA</span>
                </span>
              </div>
            </div>

            {/* Cockpit HUD Frame for the Architecture Visual in Dark Charcoal */}
            <div className="relative p-3 sm:p-5 rounded-2xl bg-[#3a3229]/90 border-2 border-[#F5EBE0]/20 shadow-2xl backdrop-blur-xl">
              {/* HUD Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 font-mono text-[11px] text-[#A09A92] select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B23A5B] animate-pulse" />
                  <span className="text-[#F5EBE0] font-bold tracking-wider">SYSTEM ARCHITECTURE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-black/60 text-[#E8D5C4] text-[10px]">
                    LIVE CORE
                  </span>
                </div>
              </div>

              {/* Interactive Core System Architecture Visual */}
              <SystemArchitectureVisual />

              
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ==========================================================
          BOTTOM BOUNCING SCROLL INDICATOR
          ========================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none z-10"
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#E8D5C4]/90">
          SCROLL TO EXPLORE
        </span>
        <div className="w-4 h-7 rounded-full border-2 border-[#F5EBE0]/40 flex items-start justify-center p-1">
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-[#B23A5B]"
          />
        </div>
      </motion.div>
    </section>
  );
}
