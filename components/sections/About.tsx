"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { CountUp } from "@/components/ui/CountUp";
import { EASE } from "@/lib/motion";
import {
  GraduationCap,
  Sparkles,
  Calendar,
  MapPin,
  Award,
  Code2,
  Layers,
} from "lucide-react";

const STORY_PARAGRAPHS = [
  "I am a Computer Science undergraduate at BPIT, Delhi, obsessed with building resilient, production-grade distributed architectures and high-impact web products. My path blends algorithmic precision with deep hands-on full-stack development, moving from clean UI layers down into background queues, cache tiers, and containerized backends.",
  "At Winovation Services and NK Enterprises, I transformed complex business bottlenecks into performant code: engineering automated email workflows, cutting page load latencies to 1.5s with debounced caching, and implementing end-to-end payment integrations. I build software that stays solid under concurrent loads.",
  "Beyond production systems, I continuously sharpen my problem-solving depth across 400+ Data Structures & Algorithms challenges. I focus on high-throughput backend services, ML-assisted recommendation workflows, and modern cloud deployment patterns—always writing maintainable, rigorously tested code engineered for real-world impact.",
];

function ScrollWordParagraph({ paragraph }: { paragraph: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 92%", "end 55%"],
  });

  const words = paragraph.split(" ");

  return (
    <p
      ref={containerRef}
      className="text-xs sm:text-[12.5px] text-slate-300 font-sans leading-relaxed tracking-normal"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <React.Fragment key={i}>
            <Word word={word} range={[start, end]} progress={scrollYProgress} />
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </p>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgba(148, 163, 184, 0.25)", "rgba(248, 250, 252, 1)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block transition-colors duration-75"
    >
      {word}
    </motion.span>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-10 sm:py-14 md:py-14 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-secondary/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading with 33% reduced title & subtitle */}
        <SectionHeading
          label="// ABOUT ME"
          title="Curiosity, Code & Concurrency"
          subtitle="A glimpse into my background, engineering philosophy, and the drive to build resilient distributed software."
          className="mb-5 md:mb-6"
          titleClassName="!text-2xl sm:!text-3xl md:!text-3xl tracking-tight"
          subtitleClassName="!mt-1.5 !text-xs sm:!text-[13px] text-muted max-w-2xl"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ================= LEFT COLUMN: Compact Photo (Reduced 40%) + Status Chip + Education Card ================= */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 w-full">
            {/* 1. Portrait Photo Card - 40% reduced width/height (max-w-[245px]) */}
            <div className="w-full max-w-[245px] sm:max-w-[250px] mx-auto lg:mx-0">
              <TiltCard
                maxTilt={8}
                perspective={1200}
                className="p-0 border-0 bg-transparent overflow-visible"
              >
                {/* Rotating Glowing Gradient Border Container */}
                <div className="relative p-[2.5px] rounded-2xl overflow-hidden group/portrait shadow-glass">
                  {/* Rotating Conic Gradient Outer Border */}
                  <div
                    className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] motion-reduce:animate-none"
                    style={{
                      background:
                        "conic-gradient(from 0deg at 50% 50%, #0FA4AF 0deg, #964734 120deg, #AFDDE5 240deg, #024950 300deg, #0FA4AF 360deg)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Ambient Glow Halo */}
                  <div
                    className="absolute -inset-2 opacity-50 blur-lg animate-[spin_8s_linear_infinite] motion-reduce:animate-none"
                    style={{
                      background:
                        "conic-gradient(from 0deg at 50% 50%, #0FA4AF 0deg, #964734 120deg, #AFDDE5 240deg, #024950 300deg, #0FA4AF 360deg)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Inner Photo Wrapper */}
                  <div className="relative rounded-[14px] overflow-hidden bg-[#003135] z-10">
                    <div className="relative w-full aspect-[4/5] overflow-hidden">
                      <Image
                        src="/profile.jpg"
                        alt="Sanket Kumar Portrait - Full-Stack and Systems Engineer"
                        fill
                        priority
                        unoptimized
                        sizes="(max-width: 768px) 240px, 250px"
                        className="object-cover object-top filter contrast-[1.03] transition-transform duration-700 ease-out group-hover/portrait:scale-105"
                      />

                      {/* Vignette bottom gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/90 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Location & Role Pill */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 p-2 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono">
                        <div className="flex items-center gap-1.5 text-white/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse motion-reduce:animate-none" />
                          <span>Rohini, Delhi</span>
                        </div>
                        <span className="text-secondary font-semibold">BPIT CSE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Status & Availability Chip */}
              <div className="mt-2.5 p-2 rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex items-center justify-between gap-2 text-[11px] font-mono text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping motion-reduce:animate-none" />
                  <span className="text-white/90 font-medium">Open to Roles</span>
                </div>
                <span className="text-primary-light font-semibold">Full-Stack & Backend</span>
              </div>
            </div>

            {/* 2. B.Tech in CSE Education Card (Positioned directly below Image) */}
            <SpotlightCard
              spotlightColor="rgba(15, 164, 175, 0.22)"
              className="p-3.5 sm:p-4 rounded-xl border border-[rgba(175,221,229,0.12)] bg-[#003135]/85 backdrop-blur-xl hover:border-primary/40 transition-all shadow-glass card-hover-lift group"
            >
              <div className="flex flex-col gap-2 pb-2.5 mb-2.5 border-b border-white/[0.06]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#024950]/50 border border-primary/30 flex items-center justify-center text-[#AFDDE5] shadow-glow icon-hover-lift shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xs sm:text-[13.5px] font-bold text-white leading-tight">
                        B.Tech in Computer Science & Engineering
                      </h3>
                      <p className="font-mono text-[11px] text-secondary mt-0.5 font-medium">
                        Bhagwan Parshuram Institute of Technology, Delhi
                      </p>
                    </div>
                  </div>

                  {/* "Current" Badge */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-secondary/40 bg-secondary/15 text-[#e07e68] font-mono text-[10px] font-semibold shrink-0 shadow-glow-warm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 motion-reduce:animate-none" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary" />
                    </span>
                    <span>Current</span>
                  </div>
                </div>
              </div>

              {/* Education Details Grid */}
              <div className="grid grid-cols-2 gap-2 pt-0.5 text-[11px] font-mono text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-muted" />
                  <span>2023 – 2027</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-muted" />
                  <span>Delhi, India</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 pt-0.5">
                  <Award className="w-3 h-3 text-primary-light" />
                  <span className="text-primary-light font-semibold">CGPA: 9.05 / 10 (90.07%)</span>
                </div>
              </div>

              {/* Coursework & Focus Pillars */}
              <div className="mt-2.5 pt-2.5 border-t border-white/[0.04] flex flex-wrap gap-1">
                {[
                  "Data Structures & Algorithms",
                  "Operating Systems",
                  "Concurrency",
                  "DBMS & SQL",
                  "Computer Networks",
                  "Distributed Systems",
                ].map((course) => (
                  <span
                    key={course}
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono border border-white/[0.07] bg-white/[0.02] text-slate-300 hover:border-white/25 hover:text-white transition-colors"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>

          {/* ================= RIGHT COLUMN: 3-paragraph Story (33% smaller) & Quantified Metrics ================= */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
            {/* Story Paragraphs with Word-by-Word Scroll Illumination */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {STORY_PARAGRAPHS.map((paragraph, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-md shadow-glass"
                >
                  <ScrollWordParagraph paragraph={paragraph} />
                </div>
              ))}
            </div>

            {/* Animated CountUp Stats in Glass Cards - Same Font Size as original */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                  Quantified Engineering Metrics
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. 400+ DSA Problems */}
                <SpotlightCard
                  spotlightColor="rgba(15, 164, 175, 0.25)"
                  className="p-3.5 sm:p-4 rounded-xl border border-[rgba(175,221,229,0.1)] bg-[#003135]/60 backdrop-blur-xl hover:border-primary/50 transition-all flex flex-col justify-between card-hover-lift"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono text-muted/80">LeetCode/GFG</span>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      <CountUp to={400} suffix="+" duration={2} />
                    </div>
                    <p className="font-mono text-xs text-primary-light mt-0.5 font-medium">
                      DSA Problems
                    </p>
                    <p className="text-[11px] text-muted/70 mt-1 leading-snug">
                      Solved with optimized algorithms
                    </p>
                  </div>
                </SpotlightCard>

                {/* 2. 90.07% Academic Score */}
                <SpotlightCard
                  spotlightColor="rgba(175, 221, 229, 0.22)"
                  className="p-3.5 sm:p-4 rounded-xl border border-[rgba(175,221,229,0.1)] bg-[#003135]/60 backdrop-blur-xl hover:border-[#AFDDE5]/50 transition-all flex flex-col justify-between card-hover-lift"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-4 h-4 text-[#AFDDE5]" />
                    <span className="text-[10px] font-mono text-muted/80">9.05 CGPA</span>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      <CountUp to={90.07} decimals={2} suffix="%" duration={2.2} />
                    </div>
                    <p className="font-mono text-xs text-[#AFDDE5] mt-0.5 font-medium">
                      Academic Score
                    </p>
                    <p className="text-[11px] text-muted/70 mt-1 leading-snug">
                      Consistent top-tier academic rank
                    </p>
                  </div>
                </SpotlightCard>

                {/* 3. 10+ Live Projects */}
                <SpotlightCard
                  spotlightColor="rgba(2, 73, 80, 0.35)"
                  className="p-3.5 sm:p-4 rounded-xl border border-[rgba(175,221,229,0.1)] bg-[#003135]/60 backdrop-blur-xl hover:border-primary/50 transition-all flex flex-col justify-between card-hover-lift"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Layers className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono text-muted/80">Deployed</span>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      <CountUp to={10} suffix="+" duration={1.8} />
                    </div>
                    <p className="font-mono text-xs text-primary mt-0.5 font-medium">
                      Live Projects
                    </p>
                    <p className="text-[11px] text-muted/70 mt-1 leading-snug">
                      Deployed & production-tested apps
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
