"use client";

import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CountUp } from "@/components/ui/CountUp";
import { GithubIcon } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Calendar,
  Building2,
  TrendingUp,
  BrainCircuit,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Center line draws itself as the user scrolls through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          label="// EXPERIENCE & INDUSTRY TRAINING"
          title="Career Progression"
          subtitle="Battle-tested production engineering, automated test coverage, and high-impact machine learning optimization."
          align="center"
        />

        {/* Vertical Timeline Container */}
        <div className="relative mt-16 sm:mt-24">
          {/* Timeline Center Line Track */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-white/[0.08]" />

          {/* Animated Drawing Center Line (Outer container holds translateX to prevent Framer transform collision) */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 overflow-hidden z-10 pointer-events-none">
            <motion.div
              style={{ scaleY: shouldReduceMotion ? 1 : scrollYProgress, transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-primary via-[#AFDDE5] to-secondary shadow-glow will-change-transform"
            />
          </div>

          {/* Entries */}
          <div className="flex flex-col gap-14 sm:gap-20">
            {/* ----------------- ENTRY 1: NK Enterprises ----------------- */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
              {/* Desktop Left Column / Mobile Right of Line */}
              <div className="w-full md:w-1/2 pl-14 sm:pl-20 md:pl-0 md:pr-12 md:text-right">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <SpotlightCard
                    spotlightColor="rgba(15, 164, 175, 0.22)"
                    className="p-6 sm:p-8 bg-[#003135]/95 border border-[rgba(175,221,229,0.1)] hover:border-primary/40 transition-all duration-300 shadow-glass text-left"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary-light" />
                        <span className="font-heading text-lg font-bold text-white">
                          NK Enterprises
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary-light text-xs font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>June – August 2026</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xl font-heading font-extrabold text-white tracking-tight">
                        Full-Stack Developer
                      </h3>
                      <p className="font-mono text-xs text-secondary mt-0.5">
                        Internship • Retail Digitization & MERN Architecture
                      </p>
                    </div>

                    {/* Bullets with Highlighted Metrics */}
                    <ul className="flex flex-col gap-3.5 mb-6 text-sm text-slate-300 leading-relaxed font-sans">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>
                          Developed a full-stack MERN e-commerce application to
                          digitize an offline retail store, with product
                          discovery, cart management, and dynamic SEO metadata.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        <span>
                          Integrated the Razorpay payment API and built an admin
                          dashboard for inventory and order tracking, improving
                          order-processing efficiency by{" "}
                          <span className="inline-flex items-baseline font-mono font-bold text-secondary text-base bg-secondary/10 px-1.5 py-0.5 rounded border border-secondary/30">
                            <CountUp to={40} suffix="%" />
                          </span>
                          .
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>
                          Improved frontend performance with debounced search and
                          React.lazy code splitting (
                          <span className="inline-flex items-baseline font-mono font-bold text-primary-light text-base bg-primary/10 px-1.5 py-0.5 rounded border border-primary/30">
                            <CountUp to={1.5} decimals={1} suffix="s" />
                          </span>{" "}
                          initial load); wrote Jest, Supertest, and Vitest suites
                          with{" "}
                          <span className="inline-flex items-baseline font-mono font-bold text-secondary text-base bg-secondary/10 px-1.5 py-0.5 rounded border border-secondary/30">
                            <CountUp to={90} suffix="%+" />
                          </span>{" "}
                          coverage.
                        </span>
                      </li>
                    </ul>

                    {/* Highlight Metric Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/[0.08] border border-secondary/25 text-secondary text-xs font-mono font-semibold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>40% Efficiency Boost</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/[0.08] border border-primary/25 text-primary-light text-xs font-mono font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>1.5s Initial Load</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 text-xs font-mono font-semibold">
                        <span>90%+ Tests</span>
                      </div>

                      <a
                        href="https://github.com/SanketManav9620/NK-Enterprises"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5 icon-hover-rotate text-muted group-hover:text-white transition-colors" />
                        <span className="link-draw-underline pb-0.5">Repository</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </a>
                    </div>
                  </SpotlightCard>
                </motion.div>
              </div>

              {/* Center Dot for Entry 1 */}
              <div className="absolute left-6 sm:left-8 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0.4 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative flex items-center justify-center"
                >
                  {/* Glowing pulsing aura */}
                  <motion.div
                    animate={shouldReduceMotion ? undefined : { scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-2 rounded-full bg-primary/30 blur-md pointer-events-none motion-reduce:animate-none"
                  />
                  <div className="relative w-10 h-10 rounded-full bg-[#001b1e] border-2 border-primary flex items-center justify-center shadow-glow">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_#0FA4AF]" />
                  </div>
                </motion.div>
              </div>

              {/* Right column placeholder on desktop for alternating layout */}
              <div className="hidden md:block md:w-1/2 pl-12" />
            </div>

            {/* ----------------- ENTRY 2: Winovation Services ----------------- */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
              {/* Left column placeholder on desktop for alternating layout */}
              <div className="hidden md:block md:w-1/2 pr-12" />

              {/* Center Dot for Entry 2 */}
              <div className="absolute left-6 sm:left-8 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0.4 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative flex items-center justify-center"
                >
                  {/* Glowing pulsing aura */}
                  <motion.div
                    animate={shouldReduceMotion ? undefined : { scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -inset-2 rounded-full bg-secondary/30 blur-md pointer-events-none motion-reduce:animate-none"
                  />
                  <div className="relative w-10 h-10 rounded-full bg-[#001b1e] border-2 border-secondary flex items-center justify-center shadow-glow-warm">
                    <div className="w-3.5 h-3.5 rounded-full bg-secondary shadow-[0_0_12px_#964734]" />
                  </div>
                </motion.div>
              </div>

              {/* Desktop Right Column / Mobile Right of Line */}
              <div className="w-full md:w-1/2 pl-14 sm:pl-20 md:pl-12">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <SpotlightCard
                    spotlightColor="rgba(150, 71, 52, 0.2)"
                    className="p-6 sm:p-8 bg-[#003135]/95 border border-[rgba(175,221,229,0.1)] hover:border-secondary/40 transition-all duration-300 shadow-glass text-left"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4 text-secondary" />
                        <span className="font-heading text-lg font-bold text-white">
                          Winovation Services Pvt. Ltd.
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>May – July 2025</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xl font-heading font-extrabold text-white tracking-tight">
                        Industry Training in AI & Machine Learning
                      </h3>
                      <p className="font-mono text-xs text-primary-light mt-0.5">
                        Apprenticeship • Time-Series & Bayesian Optimization
                      </p>
                    </div>

                    {/* Bullets with Highlighted Metrics */}
                    <ul className="flex flex-col gap-3.5 mb-6 text-sm text-slate-300 leading-relaxed font-sans">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                        <span>
                          Built and evaluated supervised and unsupervised ML models
                          with Python, NumPy, and Pandas.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span>
                          Evaluated 8 ML models on 185 monthly records, deployed
                          a forecasting system with Docker and Streamlit;
                          optimized 170+ configurations with Optuna, improving R² by{" "}
                          <span className="inline-flex items-baseline font-mono font-bold text-secondary text-base bg-secondary/10 px-1.5 py-0.5 rounded border border-secondary/30">
                            <CountUp to={41.7} decimals={1} suffix="%" />
                          </span>{" "}
                          and reducing RMSE by{" "}
                          <span className="inline-flex items-baseline font-mono font-bold text-primary-light text-base bg-primary/10 px-1.5 py-0.5 rounded border border-primary/30">
                            <CountUp to={35.4} decimals={1} suffix="%" />
                          </span>{" "}
                          versus the linear baseline.
                        </span>
                      </li>
                    </ul>

                    {/* Highlight Metric Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/[0.08] border border-secondary/25 text-secondary text-xs font-mono font-semibold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+41.7% R² Improvement</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/[0.08] border border-primary/25 text-primary-light text-xs font-mono font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>-35.4% RMSE Reduction</span>
                      </div>

                      <a
                        href="https://github.com/SanketManav9620/YESBANK_project"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5 icon-hover-rotate text-muted group-hover:text-white transition-colors" />
                        <span className="link-draw-underline pb-0.5">Repository</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </a>
                    </div>
                  </SpotlightCard>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
