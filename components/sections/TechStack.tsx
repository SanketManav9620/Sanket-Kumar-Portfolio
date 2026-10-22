"use client";

import React, { useRef } from "react";
import { useScroll, useVelocity, useSpring, useMotionValueEvent } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { MARQUEE_ROW_1, MARQUEE_ROW_2, TechItem } from "@/components/ui/TechIcons";
import {
  Code2,
  Layout,
  Server,
  Database,
  Sparkles,
  Wrench,
  CheckCircle2,
} from "lucide-react";

interface SkillCategoryDef {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  spotlightColor: string;
  description: string;
  skills: { name: string; highlight?: boolean }[];
}

const SKILL_CATEGORIES: SkillCategoryDef[] = [
  {
    id: "languages",
    title: "Languages",
    icon: Code2,
    accentColor: "#0FA4AF",
    spotlightColor: "rgba(15, 164, 175, 0.2)",
    description: "Core programming languages for algorithmic problem-solving and systems.",
    skills: [
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "C++", highlight: true },
      { name: "Python", highlight: true },
      { name: "SQL" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: Layout,
    accentColor: "#AFDDE5",
    spotlightColor: "rgba(175, 221, 229, 0.2)",
    description: "Modern component-driven web architectures and 60 FPS interfaces.",
    skills: [
      { name: "React.js", highlight: true },
      { name: "Next.js 14 (App Router)", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "Vite", highlight: true },
      { name: "Shadcn UI" },
      { name: "HTML5 & Semantic Web" },
      { name: "CSS3 Animations" },
    ],
  },
  {
    id: "backend",
    title: "Backend and APIs",
    icon: Server,
    accentColor: "#964734",
    spotlightColor: "rgba(150, 71, 52, 0.2)",
    description: "Robust asynchronous microservices, queues, and secure RESTful APIs.",
    skills: [
      { name: "Node.js", highlight: true },
      { name: "Express.js", highlight: true },
      { name: "REST APIs", highlight: true },
      { name: "BullMQ & Redis Queues", highlight: true },
      { name: "JWT & HTTP-Only Cookies" },
      { name: "Rate Limiting" },
      { name: "Bcrypt" },
    ],
  },
  {
    id: "databases",
    title: "Databases and Caching",
    icon: Database,
    accentColor: "#0FA4AF",
    spotlightColor: "rgba(15, 164, 175, 0.2)",
    description: "Relational, document, and in-memory stores with resilient failovers.",
    skills: [
      { name: "PostgreSQL", highlight: true },
      { name: "MongoDB & Mongoose", highlight: true },
      { name: "Prisma ORM", highlight: true },
      { name: "Redis Caching", highlight: true },
      { name: "Elasticsearch" },
      { name: "Schema Indexing" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    icon: Sparkles,
    accentColor: "#AFDDE5",
    spotlightColor: "rgba(175, 221, 229, 0.2)",
    description: "Machine learning pipelines, hyperparameter tuning, and LLM integrations.",
    skills: [
      { name: "Machine Learning (Supervised/Unsupervised)", highlight: true },
      { name: "OpenAI API", highlight: true },
      { name: "Optuna Bayesian Optimization", highlight: true },
      { name: "NLP", highlight: true },
      { name: "NumPy & Pandas" },
      { name: "Matplotlib" },
    ],
  },
  {
    id: "tools",
    title: "Tools and Cloud",
    icon: Wrench,
    accentColor: "#964734",
    spotlightColor: "rgba(150, 71, 52, 0.2)",
    description: "Containerization, CI/CD automation, and cloud delivery pipelines.",
    skills: [
      { name: "Docker", highlight: true },
      { name: "Git & GitHub", highlight: true },
      { name: "Azure Cloud", highlight: true },
      { name: "Vercel" },
      { name: "Razorpay Payments" },
      { name: "ImageKit CDN" },
      { name: "Jest & Vitest" },
    ],
  },
];

function MarqueeCard({ item }: { item: TechItem }) {
  const IconComponent = item.icon;

  return (
    <div
      style={
        {
          "--glow-color": item.glow,
          "--brand-color": item.color,
        } as React.CSSProperties
      }
      className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[rgba(175,221,229,0.1)] bg-[#003135]/90 backdrop-blur-md cursor-default select-none transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--brand-color)] hover:shadow-[0_0_28px_var(--glow-color)] shrink-0"
    >
      <div className="w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
        <IconComponent className="w-5 h-5" />
      </div>

      <div className="flex flex-col text-left">
        <span className="text-xs font-semibold text-white tracking-tight group-hover:text-white transition-colors">
          {item.name}
        </span>
        <span className="text-[9px] font-mono uppercase tracking-wider text-muted/70">
          {item.category}
        </span>
      </div>
    </div>
  );
}

export function TechStack() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Scroll velocity coupling
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 200 });

  useMotionValueEvent(smoothVelocity, "change", (latestVelocity) => {
    const absVelocity = Math.abs(latestVelocity);
    // Smooth speedup from 1.0 to max 2.6 based on scroll speed
    const speedMultiplier = Math.max(1.0, Math.min(1.0 + absVelocity / 450, 2.6));

    if (row1Ref.current) {
      row1Ref.current.getAnimations().forEach((anim) => {
        anim.playbackRate = speedMultiplier;
      });
    }
    if (row2Ref.current) {
      row2Ref.current.getAnimations().forEach((anim) => {
        anim.playbackRate = speedMultiplier;
      });
    }
  });

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <SectionHeading
          label="// TECH STACK & CAPABILITIES"
          title="Tools of the Craft"
          subtitle="Battle-tested technologies, distributed engines, and modern frameworks leveraged to build production-grade web systems."
          align="center"
        />

        {/* Infinite Marquee Rows with Edge Fade Masks */}
        <div className="relative my-12 flex flex-col gap-5 marquee-mask overflow-hidden py-3">
          {/* Row 1: Leftward Marquee */}
          <div className="group overflow-hidden flex">
            <div
              ref={row1Ref}
              className="animate-marquee-left flex gap-4 shrink-0 group-hover:[animation-play-state:paused]"
            >
              {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => (
                <MarqueeCard key={`row1-${item.name}-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2: Rightward Marquee */}
          <div className="group overflow-hidden flex">
            <div
              ref={row2Ref}
              className="animate-marquee-right flex gap-4 shrink-0 group-hover:[animation-play-state:paused]"
            >
              {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => (
                <MarqueeCard key={`row2-${item.name}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Categorized Skills Grid with SpotlightCard */}
        <div className="mt-20">
          <Reveal delay={0.1} width="100%">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <h3 className="font-heading text-xl font-bold text-white tracking-tight">
                  Categorized Competencies
                </h3>
              </div>
              <span className="font-mono text-xs text-muted uppercase tracking-wider">
                6 Core Domains
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, index) => {
              const IconComp = cat.icon;

              return (
                <Reveal
                  key={cat.id}
                  delay={0.1 + index * 0.08}
                  width="100%"
                  className="h-full"
                >
                  <SpotlightCard
                    spotlightColor={cat.spotlightColor}
                    className="h-full flex flex-col justify-between p-6 bg-[#003135]/90 border border-[rgba(175,221,229,0.1)] hover:border-primary/40 transition-all duration-300 card-hover-lift group"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 icon-hover-lift"
                          style={{
                            backgroundColor: `${cat.accentColor}18`,
                            color: cat.accentColor,
                          }}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>

                        <span
                          className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border"
                          style={{
                            borderColor: `${cat.accentColor}30`,
                            color: cat.accentColor,
                            backgroundColor: `${cat.accentColor}0c`,
                          }}
                        >
                          {cat.skills.length} skills
                        </span>
                      </div>

                      <h4 className="font-heading text-lg font-bold text-white tracking-tight mb-1">
                        {cat.title}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed mb-6 font-sans">
                        {cat.description}
                      </p>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.05]">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium border transition-all duration-200 bg-white/[0.02] border-white/[0.08] text-slate-300 hover:border-white/25 hover:text-white hover:-translate-y-0.5 cursor-default select-none"
                        >
                          {skill.highlight && (
                            <CheckCircle2
                              className="w-3 h-3 shrink-0"
                              style={{ color: cat.accentColor }}
                            />
                          )}
                          <span>{skill.name}</span>
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
