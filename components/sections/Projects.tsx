"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { projectsData, ProjectItem, ProjectCategory } from "@/data/projects";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ExternalLink,
  Zap,
  X,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FILTER_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "All", label: "All Projects" },
  { id: "Full-Stack", label: "Full-Stack" },
  { id: "AI", label: "AI / ML" },
  { id: "Backend", label: "Backend" },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPausedByHover, setIsPausedByHover] = useState(false);
  const [cardStepWidth, setCardStepWidth] = useState(484); // card width + gap
  const trackContainerRef = useRef<HTMLDivElement>(null);

  const openProjectModal = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
    setActiveModalImage(project.image);
  }, []);

  // Close modal with Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelectedProject(null);
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, handleKeyDown]);

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    return (
      project.category === activeFilter ||
      project.filterCategories.includes(activeFilter)
    );
  });

  // Calculate dynamic card step width based on viewport
  useEffect(() => {
    const updateCardWidth = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          // Mobile: 86vw card + 16px gap
          setCardStepWidth(Math.round(window.innerWidth * 0.86) + 16);
        } else if (window.innerWidth < 1024) {
          // Tablet: 420px card + 20px gap
          setCardStepWidth(420 + 20);
        } else {
          // Desktop: 460px card + 24px gap (fits 3 cards across in viewport)
          setCardStepWidth(460 + 24);
        }
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  // Duplicate items for continuous seamless sliding loop
  const displayItems =
    filteredProjects.length > 0
      ? [...filteredProjects, ...filteredProjects, ...filteredProjects]
      : [];

  const handleNext = useCallback(() => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => {
      const next = prev + 1;
      // Loop seamlessly once we reach 2 cycles
      if (next >= filteredProjects.length * 2) {
        return next - filteredProjects.length;
      }
      return next;
    });
  }, [filteredProjects.length]);

  const handlePrev = useCallback(() => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return filteredProjects.length - 1;
      }
      return prev - 1;
    });
  }, [filteredProjects.length]);

  // Automatic continuous sliding: slides every 3.8s, stops immediately when mouse points to ANY part of projects section
  useEffect(() => {
    if (isPausedByHover || filteredProjects.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(timer);
  }, [isPausedByHover, filteredProjects.length, handleNext]);

  const activeDisplayIndex =
    filteredProjects.length > 0
      ? currentIndex % filteredProjects.length
      : 0;

  return (
    <section
      id="projects"
      onMouseEnter={() => setIsPausedByHover(true)}
      onMouseLeave={() => setIsPausedByHover(false)}
      className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden bg-transparent"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full blur-[180px] bg-primary/[0.04] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-secondary/[0.03] rounded-full blur-[160px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto relative z-10 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeading
            label="// FEATURED PROJECTS"
            title="Engineered for Impact"
            subtitle="Production-grade systems sliding continuously in one line. Hover any project to pause and interact with live demos."
            className="mb-0 lg:mb-0"
          />

          {/* Filter Pills with Sliding Active Indicator & Counter */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full border border-[rgba(175,221,229,0.12)] bg-[#003135]/85 backdrop-blur-xl shadow-glass">
              {FILTER_CATEGORIES.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={cn(
                      "relative px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors select-none z-10",
                      isActive ? "text-white font-semibold" : "text-muted hover:text-white"
                    )}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-[#024950] shadow-glow -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Current Project Counter Badge */}
            <div className="px-3.5 py-1.5 rounded-full border border-[rgba(175,221,229,0.15)] bg-[#002226]/80 font-mono text-xs font-semibold text-primary-light">
              0{activeDisplayIndex + 1} / 0{filteredProjects.length}
            </div>
          </div>
        </div>
      </div>

      {/* ================= CAROUSEL WRAPPER WITH PROMINENT SIDE ARROWS ================= */}
      <div className="relative w-full max-w-[1536px] mx-auto">
        {/* Left Floating Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Project"
          title="Previous Project"
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#001b1e]/90 hover:bg-[#0FA4AF] border border-[rgba(175,221,229,0.3)] hover:border-primary text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 group/arrow"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-primary-light group-hover/arrow:text-[#001b1e] group-hover/arrow:-translate-x-0.5 transition-all" />
        </button>

        {/* Right Floating Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Project"
          title="Next Project"
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#001b1e]/90 hover:bg-[#0FA4AF] border border-[rgba(175,221,229,0.3)] hover:border-primary text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 group/arrow"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-primary-light group-hover/arrow:text-[#001b1e] group-hover/arrow:translate-x-0.5 transition-all" />
        </button>

        {/* Subtle Edge Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#001b1e] to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#001b1e] to-transparent pointer-events-none z-20" />

        {/* Carousel Sliding Track */}
        <div
          ref={trackContainerRef}
          className="w-full relative overflow-hidden py-4 select-none cursor-grab active:cursor-grabbing px-2 sm:px-6"
        >
          <motion.div
            className="flex items-stretch gap-4 sm:gap-5 md:gap-6 will-change-transform"
            animate={{ x: -currentIndex * cardStepWidth }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            drag="x"
            dragConstraints={{ left: -displayItems.length * cardStepWidth, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipeThreshold = 50;
              if (offset.x < -swipeThreshold || velocity.x < -300) {
                handleNext();
              } else if (offset.x > swipeThreshold || velocity.x > 300) {
                handlePrev();
              }
            }}
          >
            {displayItems.map((project, idx) => {
              const isCenterProject = idx % filteredProjects.length === activeDisplayIndex;

              return (
                <div
                  key={`${project.id}-instance-${idx}`}
                  className={cn(
                    "shrink-0 transition-opacity duration-300 cursor-pointer group",
                    "w-[86vw] sm:w-[420px] md:w-[460px] lg:w-[480px]"
                  )}
                  onClick={() => openProjectModal(project)}
                >
                  <TiltCard maxTilt={5} className="h-full border-0 bg-transparent p-0 overflow-visible">
                    <SpotlightCard
                      spotlightColor={`${project.accentColor}25`}
                      size={480}
                      className={cn(
                        "h-full flex flex-col justify-between p-6 sm:p-7 bg-[#003135]/95 border transition-all duration-300 rounded-3xl shadow-glass relative overflow-hidden",
                        isCenterProject
                          ? "border-primary/50 shadow-[0_0_30px_rgba(15,164,175,0.15)]"
                          : "border-[rgba(175,221,229,0.12)] hover:border-white/30"
                      )}
                    >
                      <div>
                        {/* Top Bar: Number Indicator & Metric Badge */}
                        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-primary-light bg-[#001b1e] px-2.5 py-1 rounded-md border border-[rgba(175,221,229,0.15)]">
                              0{(idx % filteredProjects.length) + 1}
                            </span>
                            <span className="font-mono text-xs text-muted uppercase tracking-wider">
                              {project.category}
                            </span>
                          </div>

                          {/* Metric Badge */}
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-semibold"
                            style={{
                              borderColor: `${project.accentColor}40`,
                              color: project.accentColor,
                              backgroundColor: `${project.accentColor}12`,
                            }}
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>{project.metric}</span>
                          </div>
                        </div>

                        {/* Project Image Snapshot with Reveal & Zoom */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-[rgba(175,221,229,0.1)] bg-[#001b1e] mb-5 flex items-center justify-center group/img">
                          <Image
                            src={project.image}
                            alt={`${project.title} - ${project.subtitle}`}
                            fill
                            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 420px, 480px"
                            loading="lazy"
                            className={cn(
                              "transition-transform duration-500 ease-out group-hover/img:scale-105",
                              project.imageFit === "contain"
                                ? "object-contain p-3"
                                : "object-cover object-top"
                            )}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#003135]/75 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/90 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3 h-3 text-secondary" />
                            <span>Inspect</span>
                          </div>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-primary-light transition-colors mb-1">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-secondary mb-3 font-medium">
                          {project.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-slate-300 font-sans leading-relaxed mb-5 line-clamp-2">
                          {project.oneLiner}
                        </p>

                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="px-1.5 py-0.5 rounded text-[11px] font-mono text-muted">
                              +{project.techStack.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Actions */}
                      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {project.links.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/20 text-xs font-mono font-medium text-white hover:bg-primary/30 hover:border-primary transition-all shadow-glow"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="link-draw-underline pb-0.5">Demo</span>
                              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                            </a>
                          )}
                          {project.links.github && (
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-mono font-medium text-muted hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <GithubIcon className="w-3.5 h-3.5 icon-hover-rotate" />
                              <span className="link-draw-underline pb-0.5">Code</span>
                            </a>
                          )}
                        </div>

                        <div className="inline-flex items-center gap-1 text-xs font-mono text-muted group-hover:text-white transition-colors">
                          <span className="link-draw-underline pb-0.5">Specs</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ================= BOTTOM PROGRESS TRACK & QUICK NAV DOTS ================= */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        {/* Clickable Pagination Dots */}
        <div className="flex items-center gap-2">
          {filteredProjects.map((proj, idx) => {
            const isActive = idx === activeDisplayIndex;
            return (
              <button
                key={proj.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to project ${idx + 1}: ${proj.title}`}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  isActive
                    ? "w-8 h-2 bg-gradient-to-r from-primary to-[#AFDDE5] shadow-glow"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                )}
              />
            );
          })}
        </div>

        {/* Informative Hint */}
        <div className="flex items-center gap-3 text-xs font-mono text-muted">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Auto-sliding active • Hover over any card to pause</span>
        </div>
      </div>

      {/* ================= MODAL DIALOG (DEEP DIVE VIEW) ================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#001417]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Sheet Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[rgba(175,221,229,0.18)] bg-[#00282c] p-6 sm:p-9 shadow-2xl z-10 scrollbar-thin scrollbar-thumb-white/20 select-text"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  {selectedProject.category}
                </span>
                <span className="text-muted/40">•</span>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-semibold"
                  style={{
                    borderColor: `${selectedProject.accentColor}50`,
                    color: selectedProject.accentColor,
                    backgroundColor: `${selectedProject.accentColor}18`,
                  }}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{selectedProject.metric}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                {selectedProject.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-secondary font-medium mb-6">
                {selectedProject.subtitle}
              </p>

              {/* Full Image Banner */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl border border-[rgba(175,221,229,0.15)] bg-[#001b1e] mb-3 flex items-center justify-center">
                <Image
                  src={activeModalImage || selectedProject.image}
                  alt={`${selectedProject.title} Interface & Architecture`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className={cn(
                    (activeModalImage || selectedProject.image).includes("mobile")
                      ? "object-contain p-3"
                      : "object-cover object-top"
                  )}
                />
              </div>

              {/* Gallery Image Switcher (for projects with multiple views) */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {selectedProject.gallery.map((imgSrc, gIdx) => {
                    const currentActive = activeModalImage || selectedProject.image;
                    const isSelected = currentActive === imgSrc;
                    const isMobileImg = imgSrc.includes("mobile");
                    const label = isMobileImg
                      ? "Mobile Reels Feed View"
                      : imgSrc.includes("modeling")
                      ? "Decision Tree Predictor"
                      : imgSrc.includes("stats") || imgSrc.includes("yes-bank.png")
                      ? "ML Analytics & Boxplots"
                      : "Web Portal Platform";

                    return (
                      <button
                        key={gIdx}
                        type="button"
                        onClick={() => setActiveModalImage(imgSrc)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 border",
                          isSelected
                            ? "bg-primary/20 border-primary text-white font-semibold shadow-glow"
                            : "bg-white/[0.03] border-white/10 text-muted hover:text-white hover:border-white/20"
                        )}
                      >
                        <span
                          className="w-2 h-2 rounded-full transition-colors"
                          style={{
                            backgroundColor: isSelected
                              ? selectedProject.accentColor
                              : "rgba(255,255,255,0.3)",
                          }}
                        />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Architectural Overview */}
              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-primary-light font-semibold mb-2">
                  System Architecture & Purpose
                </h4>
                <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
                  {selectedProject.oneLiner}
                </p>
              </div>

              {/* Key Technical Highlights */}
              <div className="mb-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-primary-light font-semibold mb-3">
                  Key Technical Achievements
                </h4>
                <ul className="grid grid-cols-1 gap-2.5">
                  {selectedProject.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-white/10 transition-colors"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: selectedProject.accentColor }}
                      />
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Matrix */}
              <div className="mb-8 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-primary-light" />
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                    Technology Stack & Tooling
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono border border-white/10 bg-white/[0.04] text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject.links.live && (
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/modal-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-primary to-[#024950] hover:from-primary-light hover:to-primary shadow-glow transition-all"
                    >
                      <span className="link-draw-underline pb-0.5">Launch Live Demo</span>
                      <ExternalLink className="w-4 h-4 group-hover/modal-btn:translate-x-0.5 group-hover/modal-btn:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/modal-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-white border border-white/15 bg-white/[0.06] hover:bg-white/10 hover:border-white/30 transition-all"
                    >
                      <GithubIcon className="w-4 h-4 icon-hover-rotate" />
                      <span className="link-draw-underline pb-0.5">Explore GitHub Code</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-muted hover:text-white border border-white/10 hover:border-white/20 transition-all"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
