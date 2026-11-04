"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { EASE, DURATIONS, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    if (latest > 120 && diff > 5) {
      setHidden(true);
    } else if (diff < -5 || latest <= 80) {
      setHidden(false);
    }

    setIsScrolled(latest > 40);
  });

  // Track active section using IntersectionObserver
  useEffect(() => {
    const sectionIds = ["about", "projects", "experience", "skills", "contact"];
    const handleScrollSpy = () => {
      const currentScroll = window.scrollY;
      const aboutEl = document.getElementById("about");
      if (aboutEl && currentScroll < aboutEl.offsetTop - 280) {
        setActiveSection("");
        return;
      }
      const scrollPosition = currentScroll + 280;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Scroll Progress Bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#B23A5B] via-[#D45476] to-[#F5EBE0] z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main Sticky Navbar */}
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: DURATIONS.hover * 1.5, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 pb-2 transition-all will-change-transform"
      >
        <div
          className={cn(
            "w-full max-w-5xl flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300",
            isScrolled
              ? "glass-panel shadow-glass border-[#F5EBE0]/15 bg-[#3a3229]/90 backdrop-blur-xl border-[#F5EBE0]/15"
              : "bg-transparent border border-transparent"
          )}
        >
          {/* Funky Skewed Brand Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="btn-funky-tactile -rotate-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4A0E17] text-[#F28EA9] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#D45476] shadow-[4px_4px_0px_#7A172B] hover:border-[#F28EA9] hover:rotate-0 transition-transform select-none focus:outline-none"
            aria-label="Sanket Kumar Portfolio Home"
          >
            <span className="text-[#B23A5B] font-black">&lt;SK/&gt;</span>
            <span className="text-[#F5EBE0]">SANKET</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#162032]/80 p-1.5 rounded-full border border-[#F5EBE0]/10">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-1.5 text-xs uppercase tracking-wider font-mono font-medium transition-colors select-none rounded-full",
                    isActive ? "text-white" : "text-muted hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-[#B23A5B] rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Hire Me CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const contactEl = document.getElementById("contact");
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.href = "mailto:0sanket0kumar@gmail.com";
                }
              }}
              className="btn-funky-tactile rotate-2 hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#7A172B] to-[#D45476] text-white font-mono text-xs font-black tracking-wider border-2 border-black shadow-[4px_4px_0px_#4A0E17] hover:rotate-0 hover:from-[#D45476] hover:to-[#F28EA9] hover:text-black hover:shadow-[5px_5px_0px_#4A0E17] transition-all cursor-pointer select-none"
            >
              <span>⚡ HIRE ME</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>

            {/* Mobile Menu Button - Persona 5 Styled MENU Badge */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-funky-tactile -rotate-3 px-3 py-1.5 bg-[#F5EBE0] text-black border-2 border-black shadow-brutal-black md:hidden hover:rotate-0 active:scale-95 transition-all focus:outline-none font-mono text-xs font-black tracking-wider flex items-center gap-1.5"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-primary" />
                  <span>CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-primary" />
                  <span>MENU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#162032]/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden select-none"
          >
            {/* Background ambient accents */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />

            <div className="pt-20 flex flex-col gap-6">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {"// Navigation"}
              </span>
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: DURATIONS.reveal,
                      delay: index * STAGGER.default,
                      ease: EASE,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between text-3xl font-heading font-extrabold text-white hover:text-primary-light transition-colors py-2 border-b border-white/[0.06]"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight className="w-6 h-6 text-muted group-hover:text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Footer & Direct Contact */}
            <div className="flex flex-col gap-4 pb-6">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary text-white font-mono text-sm font-semibold tracking-wide shadow-glow"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="text-center font-mono text-xs text-muted">
                0sanket0kumar@gmail.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
