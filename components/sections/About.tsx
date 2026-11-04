"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { CountUp } from "@/components/ui/CountUp";
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
    <section id="about" className="relative py-10 sm:py-14 md:py-14 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#162032]">
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
            <div className="w-full max-w-[245px] sm:max-w-[250px] mx-auto lg:mx-0 relative">
              {/* Funky Persona Comic Sticker */}
              <div className="absolute -top-3.5 -right-2 z-30 btn-funky-tactile rotate-6 px-2.5 py-0.5 rounded-sm bg-[#4A0E17] text-[#F28EA9] border-2 border-[#D45476] shadow-[3px_3px_0px_#000000] font-mono text-[10px] font-black uppercase tracking-wider">
                ★ BPIT DELHI 2027
              </div>
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
                        "conic-gradient(from 0deg at 50% 50%, #B23A5B 0deg, #F5EBE0 120deg, #D45476 240deg, #18191f 300deg, #B23A5B 360deg)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Ambient Glow Halo */}
                  <div
                    className="absolute -inset-2 opacity-50 blur-lg animate-[spin_8s_linear_infinite] motion-reduce:animate-none"
                    style={{
                      background:
                        "conic-gradient(from 0deg at 50% 50%, #B23A5B 0deg, #F5EBE0 120deg, #D45476 240deg, #18191f 300deg, #B23A5B 360deg)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Inner Photo Wrapper */}
                  <div className="relative rounded-[14px] overflow-hidden bg-[#18191f] z-10">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3a3229]/90 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Location & Role Pill */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 p-2 rounded-lg bg-[#3a3229]/95 backdrop-blur-md border border-[#E8D5C4]/30 text-[10px] font-mono">
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
              <div className="mt-2.5 btn-funky-tactile -rotate-1 p-2 rounded-md border-2 border-[#D45476] bg-[#4A0E17] shadow-[4px_4px_0px_#000000] flex items-center justify-between gap-2 text-[11px] font-mono text-[#F28EA9]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping motion-reduce:animate-none" />
                  <span className="text-white/90 font-medium">Open to Roles</span>
                </div>
                <span className="text-primary-light font-semibold">Full-Stack & Backend</span>
              </div>
            </div>

            {/* 2. B.Tech in CSE Education Card (Positioned directly below Image) */}
            <SpotlightCard
              spotlightColor="rgba(178, 58, 91, 0.25)"
              className="p-3.5 sm:p-4 rounded-xl border-2 border-[#E8D5C4]/25 bg-[#3a3229] hover:border-[#B23A5B] transition-all shadow-brutal-black card-hover-lift group"
            >
              <div className="flex flex-col gap-2 pb-2.5 mb-2.5 border-b border-white/[0.06]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#4A0E17] border-2 border-[#D45476] flex items-center justify-center text-[#F28EA9] shadow-[3px_3px_0px_#7A172B] shadow-glow icon-hover-lift shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xs sm:text-[13.5px] font-black text-[#F5EBE0] leading-tight">
                        B.Tech in Computer Science & Engineering
                      </h3>
                      <p className="font-mono text-[11px] text-[#E8D5C4] mt-0.5 font-bold">
                        Bhagwan Parshuram Institute of Technology, Delhi
                      </p>
                    </div>
                  </div>

                  {/* "Current" Badge */}
                  <div className="btn-funky-tactile rotate-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md border-2 border-[#4A0E17] bg-gradient-to-r from-[#7A172B] to-[#D45476] text-white font-mono text-[10px] font-black shrink-0 shadow-[3px_3px_0px_#4A0E17]">
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
                  <span className="font-bold text-[#F28EA9] bg-[#4A0E17] px-2 py-0.5 rounded border border-[#D45476]">CGPA: 9.05 / 10 (90.07%)</span>
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
              {STORY_PARAGRAPHS.map((paragraph, index) => {
                const stepLabels = [
                  "// 01 ARCHITECTURE & SCALABILITY",
                  "// 02 PRODUCTION PERFORMANCE & CACHING",
                  "// 03 ALGORITHMIC MASTERY (400+ DSA)"
                ];
                const badgeBorders = ["border-[#D45476]", "border-[#B23A5B]", "border-[#7A172B]"];
                const badgeColors = ["text-[#F28EA9]", "text-[#FAF5EE]", "text-[#FBD5DF]"];
                return (
                <div
                  key={index}
                  className="p-3.5 sm:p-4 rounded-xl border-2 border-[#E8D5C4]/25 bg-[#3a3229] shadow-brutal-black text-[#F5EBE0] relative group hover:border-[#D45476] transition-all"
                >
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/[0.06]">
                    <span className={`font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#4A0E17] border ${badgeBorders[index]} ${badgeColors[index]} shadow-[2px_2px_0px_#000000]`}>
                      {stepLabels[index]}
                    </span>
                  </div>
                  <ScrollWordParagraph paragraph={paragraph} />
                </div>
                );
              })}
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
                  spotlightColor="rgba(178, 58, 91, 0.25)"
                  className="p-3.5 sm:p-4 rounded-xl border-2 border-[#E8D5C4]/25 bg-[#3a3229] shadow-brutal-black hover:border-primary/50 transition-all flex flex-col justify-between card-hover-lift"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono text-muted/80">LeetCode/GFG</span>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5EBE0] tracking-tight">
                      <CountUp to={400} suffix="+" duration={2} />
                    </div>
                    <p className="font-mono text-xs text-[#E8D5C4] mt-0.5 font-bold">
                      DSA Problems
                    </p>
                    <p className="text-[11px] text-muted/70 mt-1 leading-snug">
                      Solved with optimized algorithms
                    </p>
                  </div>
                </SpotlightCard>

                {/* 2. 90.07% Academic Score */}
                <SpotlightCard
                  spotlightColor="rgba(245, 235, 224, 0.2)"
                  className="p-3.5 sm:p-4 rounded-xl border-2 border-[#E8D5C4]/25 bg-[#3a3229] shadow-brutal-black hover:border-[#B23A5B] transition-all flex flex-col justify-between card-hover-lift"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-4 h-4 text-[#E8D5C4]" />
                    <span className="text-[10px] font-mono text-muted/80">9.05 CGPA</span>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5EBE0] tracking-tight">
                      <CountUp to={90.07} decimals={2} suffix="%" duration={2.2} />
                    </div>
                    <p className="font-mono text-xs text-[#E8D5C4] mt-0.5 font-bold">
                      Academic Score
                    </p>
                    <p className="text-[11px] text-muted/70 mt-1 leading-snug">
                      Consistent top-tier academic rank
                    </p>
                  </div>
                </SpotlightCard>

                {/* 3. 10+ Live Projects */}
                <SpotlightCard
                  spotlightColor="rgba(212, 84, 118, 0.25)"
                  className="p-3.5 sm:p-4 rounded-xl border-2 border-[#E8D5C4]/25 bg-[#3a3229] shadow-brutal-black hover:border-primary/50 transition-all flex flex-col justify-between card-hover-lift"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Layers className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-mono text-muted/80">Deployed</span>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5EBE0] tracking-tight">
                      <CountUp to={10} suffix="+" duration={1.8} />
                    </div>
                    <p className="font-mono text-xs text-[#D45476] mt-0.5 font-bold">
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
