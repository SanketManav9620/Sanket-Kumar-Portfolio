"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profileData } from "@/data/profile";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/Icons";
import {
  Mail,
  Copy,
  Check,
  Send,
  Loader2,
  AlertCircle,
  MapPin,
  Sparkles,
  MessageSquare,
} from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  // Field focused states for floating labels
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Validation logic
  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Your name is required.";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      errors.message = "A message is required.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    return errors;
  };

  const errors = validate();
  const isFormValid = Object.keys(errors).length === 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFocusedField(null);
  };

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isFormValid) {
      setStatus("error");
      setErrorMessage("Please fill in all fields correctly before sending.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to deliver message.");
      }

      setStatus("success");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStatus("error");
      setErrorMessage(msg);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
    setStatus("idle");
    setErrorMessage("");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Background ambient glows in REFIRE palette */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-[600px] h-[600px] bg-secondary/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill Badge */}
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono uppercase tracking-widest text-primary-light">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span>{"// Contact & Collaboration"}</span>
          </div>
        </Reveal>

        {/* Huge SplitText Headline */}
        <div className="mb-6 max-w-4xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-white leading-[1.05]">
            <SplitText text="Let's build something together" mode="words" delay={0.15} />
          </h2>
        </div>

        {/* Subtitle */}
        <Reveal delay={0.25} yOffset={16}>
          <p className="max-w-2xl text-base sm:text-lg text-muted font-sans leading-relaxed mb-16">
            Have a high-throughput backend to scale, an AI project to engineer, or a full-time engineering opportunity?
            Send me a message or connect directly through my communication channels.
          </p>
        </Reveal>

        {/* Main 2-Column Grid: Left Contact Info & Direct Links, Right Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Links & Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Email Direct Card with Copy-to-Clipboard & Tooltip */}
            <div className="p-6 sm:p-7 rounded-2xl border border-[rgba(175,221,229,0.12)] bg-[#003135]/65 backdrop-blur-xl relative overflow-hidden group">
              <div className="flex items-center gap-2.5 mb-2 text-xs font-mono uppercase tracking-wider text-primary-light">
                <Mail className="w-4 h-4 text-primary" />
                <span>Direct Email Inquiry</span>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${profileData.email}`}
                  className="font-mono text-sm sm:text-base font-semibold text-white hover:text-primary transition-colors truncate link-draw-underline pb-0.5"
                >
                  {profileData.email}
                </a>

                {/* Copy to Clipboard Magnetic Button with Animated Tooltip */}
                <div className="relative inline-block self-start sm:self-auto">
                  <MagneticButton
                    onClick={copyEmail}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-primary/20 hover:border-primary/40 text-slate-200 hover:text-white transition-all shadow-sm group"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 icon-hover-rotate" />
                    )}
                  </MagneticButton>

                  {/* "Copied!" Floating Tooltip */}
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                        animate={{ opacity: 1, y: -4, scale: 1 }}
                        exit={{ opacity: 0, y: 2, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full right-0 mb-2 px-3 py-1 rounded-md bg-primary text-[#001b1e] text-[11px] font-mono font-bold whitespace-nowrap shadow-glow pointer-events-none"
                      >
                        Copied to Clipboard!
                        <span className="absolute top-full right-3 -mt-1 border-4 border-transparent border-t-primary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <p className="mt-3 text-xs text-muted leading-relaxed">
                Response typically within 24 hours. For urgent inquiries, mention [Urgent] in your subject line.
              </p>
            </div>

            {/* Social Channels via MagneticButtons */}
            <div className="p-6 sm:p-7 rounded-2xl border border-[rgba(175,221,229,0.12)] bg-[#003135]/65 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-muted">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span>Professional Profiles & Code</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* LinkedIn */}
                <MagneticButton
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#0FA4AF]/15 hover:border-primary/50 text-slate-200 hover:text-white transition-all font-mono text-xs font-semibold group"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#AFDDE5] group-hover:text-primary transition-colors icon-hover-rotate" />
                  <span className="link-draw-underline pb-0.5">LinkedIn</span>
                </MagneticButton>

                {/* GitHub */}
                <MagneticButton
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#0FA4AF]/15 hover:border-primary/50 text-slate-200 hover:text-white transition-all font-mono text-xs font-semibold group"
                >
                  <GithubIcon className="w-4 h-4 text-[#AFDDE5] group-hover:text-primary transition-colors icon-hover-rotate" />
                  <span className="link-draw-underline pb-0.5">GitHub</span>
                </MagneticButton>

                {/* LeetCode */}
                <MagneticButton
                  href={profileData.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#964734]/25 hover:border-secondary/60 text-slate-200 hover:text-white transition-all font-mono text-xs font-semibold group"
                >
                  <LeetcodeIcon className="w-4 h-4 text-[#e07e68] group-hover:text-secondary transition-colors icon-hover-rotate" />
                  <span className="link-draw-underline pb-0.5">LeetCode</span>
                </MagneticButton>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="p-5 rounded-2xl border border-[rgba(175,221,229,0.08)] bg-[#00282c]/50 backdrop-blur-md flex items-center gap-4">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
              </span>
              <div>
                <p className="text-xs font-mono font-semibold text-white">
                  Available for Full-Time Roles
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted/80 mt-0.5">
                  <MapPin className="w-3 h-3 text-primary-light" />
                  <span>Rohini, Delhi, India (IST • UTC +05:30)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form with Floating Labels & PathLength Checkmark (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl border border-[rgba(175,221,229,0.15)] bg-[#003135]/85 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  /* Animated Success State with SVG pathLength checkmark */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="py-12 px-4 text-center flex flex-col items-center justify-center"
                  >
                    {/* SVG Checkmark with pathLength animation */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                      <svg
                        viewBox="0 0 64 64"
                        className="w-20 h-20 text-primary relative z-10"
                      >
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="rgba(15, 164, 175, 0.1)"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeOpacity="0.4"
                        />
                        <motion.path
                          d="M18 34l9 9 19-19"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.65, ease: "easeInOut", delay: 0.15 }}
                        />
                      </svg>
                    </div>

                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2 tracking-tight">
                      Message Dispatched!
                    </h3>

                    <p className="text-sm text-slate-300 font-sans max-w-md leading-relaxed mb-8">
                      Thank you for reaching out, <span className="text-primary font-medium">{formData.name}</span>. Your message has been routed to my personal inbox. I will review it and follow up promptly.
                    </p>

                    <MagneticButton
                      onClick={resetForm}
                      className="px-6 py-3 rounded-xl border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary-light font-mono text-xs font-semibold transition-all shadow-glow"
                    >
                      <span>Send Another Message</span>
                    </MagneticButton>
                  </motion.div>
                ) : (
                  /* Contact Form with Floating Labels */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    <div className="flex items-center gap-2 mb-2 pb-3 border-b border-white/[0.06]">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <h3 className="font-heading text-lg font-bold text-white tracking-tight">
                        Send a Message
                      </h3>
                    </div>

                    {/* Error Banner with shake animation */}
                    {status === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          x: [-5, 5, -3, 3, -1, 1, 0],
                        }}
                        transition={{ duration: 0.4 }}
                        className="p-3.5 rounded-xl border border-secondary/40 bg-secondary/15 text-[#f4937d] text-xs font-mono flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 text-secondary" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* 1. Name Field with Floating Label (Transforms only) */}
                    <div className="relative">
                      <div className="relative">
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus("name")}
                          onBlur={() => handleBlur("name")}
                          className={`w-full pt-6 pb-2 px-4 rounded-xl font-sans text-sm text-white bg-[#002226]/80 border transition-all outline-none ${
                            touched.name && errors.name
                              ? "border-secondary/70 focus:border-secondary"
                              : touched.name && !errors.name
                              ? "border-primary/50 focus:border-primary"
                              : "border-[rgba(175,221,229,0.15)] focus:border-primary"
                          } focus:ring-1 focus:ring-primary/30`}
                        />
                        <label
                          htmlFor="contact-name"
                          className={`absolute left-4 top-4 origin-left pointer-events-none transition-transform duration-200 font-mono text-xs ${
                            focusedField === "name" || formData.name
                              ? "-translate-y-2.5 scale-[0.82] text-primary font-semibold tracking-wider uppercase"
                              : "translate-y-0 scale-100 text-slate-300"
                          }`}
                        >
                          Your Name
                        </label>
                      </div>
                      {touched.name && errors.name && (
                        <p className="mt-1.5 text-[11px] font-mono text-[#e07e68] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* 2. Email Field with Floating Label (Transforms only) */}
                    <div className="relative">
                      <div className="relative">
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus("email")}
                          onBlur={() => handleBlur("email")}
                          className={`w-full pt-6 pb-2 px-4 rounded-xl font-sans text-sm text-white bg-[#002226]/80 border transition-all outline-none ${
                            touched.email && errors.email
                              ? "border-secondary/70 focus:border-secondary"
                              : touched.email && !errors.email
                              ? "border-primary/50 focus:border-primary"
                              : "border-[rgba(175,221,229,0.15)] focus:border-primary"
                          } focus:ring-1 focus:ring-primary/30`}
                        />
                        <label
                          htmlFor="contact-email"
                          className={`absolute left-4 top-4 origin-left pointer-events-none transition-transform duration-200 font-mono text-xs ${
                            focusedField === "email" || formData.email
                              ? "-translate-y-2.5 scale-[0.82] text-primary font-semibold tracking-wider uppercase"
                              : "translate-y-0 scale-100 text-slate-300"
                          }`}
                        >
                          Email Address
                        </label>
                      </div>
                      {touched.email && errors.email && (
                        <p className="mt-1.5 text-[11px] font-mono text-[#e07e68] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* 3. Message Field with Floating Label (Transforms only) */}
                    <div className="relative">
                      <div className="relative">
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus("message")}
                          onBlur={() => handleBlur("message")}
                          className={`w-full pt-6 pb-2 px-4 rounded-xl font-sans text-sm text-white bg-[#002226]/80 border transition-all outline-none resize-none ${
                            touched.message && errors.message
                              ? "border-secondary/70 focus:border-secondary"
                              : touched.message && !errors.message
                              ? "border-primary/50 focus:border-primary"
                              : "border-[rgba(175,221,229,0.15)] focus:border-primary"
                          } focus:ring-1 focus:ring-primary/30`}
                        />
                        <label
                          htmlFor="contact-message"
                          className={`absolute left-4 top-4 origin-left pointer-events-none transition-transform duration-200 font-mono text-xs ${
                            focusedField === "message" || formData.message
                              ? "-translate-y-2.5 scale-[0.82] text-primary font-semibold tracking-wider uppercase"
                              : "translate-y-0 scale-100 text-slate-300"
                          }`}
                        >
                          Your Message / Project Details
                        </label>
                      </div>
                      {touched.message && errors.message && (
                        <p className="mt-1.5 text-[11px] font-mono text-[#e07e68] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button with Loading State */}
                    <div className="pt-2">
                      <MagneticButton
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-mono text-xs font-semibold text-white bg-gradient-to-r from-primary to-[#024950] hover:from-primary-light hover:to-primary shadow-glow transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin motion-reduce:animate-none text-white" />
                            <span>Transmitting Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </MagneticButton>
                    </div>

                    <p className="text-[11px] text-slate-300 text-center font-mono mt-1">
                      Protected by server validation • Delivered via Resend
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
