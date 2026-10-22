"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layout, Server, Database, Sparkles } from "lucide-react";
import { EASE } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface NodeData {
  id: string;
  title: string;
  badge: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgGlow: string;
  x: number; // percentage
  y: number; // percentage
}

const NODES: NodeData[] = [
  {
    id: "frontend",
    title: "Client Layer",
    badge: "React & Next.js",
    metric: "60 FPS UI",
    icon: Layout,
    color: "#0FA4AF",
    bgGlow: "rgba(15, 164, 175, 0.18)",
    x: 50,
    y: 8,
  },
  {
    id: "backend",
    title: "Distributed Core",
    badge: "Node & BullMQ",
    metric: "1k+ jobs/min",
    icon: Server,
    color: "#964734",
    bgGlow: "rgba(150, 71, 52, 0.18)",
    x: 90,
    y: 50,
  },
  {
    id: "database",
    title: "Storage Tier",
    badge: "Postgres & Redis",
    metric: "Failover Ready",
    icon: Database,
    color: "#024950",
    bgGlow: "rgba(2, 73, 80, 0.3)",
    x: 50,
    y: 92,
  },
  {
    id: "ai",
    title: "Intelligence",
    badge: "OpenAI & Optuna",
    metric: "+41.7% R²",
    icon: Sparkles,
    color: "#AFDDE5",
    bgGlow: "rgba(175, 221, 229, 0.18)",
    x: 10,
    y: 50,
  },
];

export function SystemArchitectureVisual() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto select-none flex items-center justify-center">
      {/* Background radial gradient halos */}
      <div className="absolute inset-0 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-10 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

      {/* Orbit Rings */}
      <div className="absolute inset-12 rounded-full border border-[rgba(175,221,229,0.06)] pointer-events-none" />
      <div className="absolute inset-24 rounded-full border border-dashed border-primary/25 animate-[spin_60s_linear_infinite] motion-reduce:animate-none pointer-events-none" />

      {/* SVG Connecting Circuit Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 400 400"
        fill="none"
      >
        <defs>
          <linearGradient id="lineGrad1" x1="200" y1="200" x2="200" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0FA4AF" stopOpacity="0.8" />
            <stop offset="1" stopColor="#0FA4AF" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="200" y1="200" x2="352" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#964734" stopOpacity="0.8" />
            <stop offset="1" stopColor="#964734" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineGrad3" x1="200" y1="200" x2="200" y2="352" gradientUnits="userSpaceOnUse">
            <stop stopColor="#024950" stopOpacity="0.8" />
            <stop offset="1" stopColor="#024950" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineGrad4" x1="200" y1="200" x2="48" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#AFDDE5" stopOpacity="0.8" />
            <stop offset="1" stopColor="#AFDDE5" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Dynamic connecting lines with pathLength animation */}
        <motion.line
          x1="200"
          y1="200"
          x2="200"
          y2="55"
          stroke="url(#lineGrad1)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: EASE }}
        />
        <motion.line
          x1="200"
          y1="200"
          x2="345"
          y2="200"
          stroke="url(#lineGrad2)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.08, ease: EASE }}
        />
        <motion.line
          x1="200"
          y1="200"
          x2="200"
          y2="345"
          stroke="url(#lineGrad3)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.16, ease: EASE }}
        />
        <motion.line
          x1="200"
          y1="200"
          x2="55"
          y2="200"
          stroke="url(#lineGrad4)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.24, ease: EASE }}
        />

        {/* Travelling Signal Pulses along paths - disabled on reduced motion */}
        {!shouldReduceMotion && (
          <>
            <motion.circle
              r="3"
              fill="#0FA4AF"
              animate={{
                cx: [200, 200, 200],
                cy: [200, 60, 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              r="3"
              fill="#964734"
              animate={{
                cx: [200, 345, 200],
                cy: [200, 200, 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
            />
            <motion.circle
              r="3"
              fill="#024950"
              animate={{
                cx: [200, 200, 200],
                cy: [200, 345, 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
            />
            <motion.circle
              r="3"
              fill="#AFDDE5"
              animate={{
                cx: [200, 55, 200],
                cy: [200, 200, 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </>
        )}
      </svg>

      {/* Central "SK" Core Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
        className="relative z-10 w-20 h-20 rounded-2xl p-0.5 bg-gradient-to-br from-primary via-[#AFDDE5] to-secondary shadow-glow flex items-center justify-center group"
      >
        <div className="w-full h-full rounded-[14px] bg-[#003135] flex flex-col items-center justify-center p-1.5 text-center transition-all duration-300 group-hover:bg-[#024950]">
          <span className="font-heading text-xl font-black tracking-tight text-white flex items-center gap-0.5">
            SK
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block animate-ping motion-reduce:animate-none" />
          </span>
          <span className="font-mono text-[8px] uppercase tracking-wider text-[#AFDDE5] mt-0.5">
            Architect
          </span>
        </div>

        {/* Pulsing halo */}
        <span className="absolute -inset-2 rounded-2xl border border-primary/30 animate-pulse motion-reduce:animate-none pointer-events-none" />
      </motion.div>

      {/* Orbiting Satellite Nodes */}
      {NODES.map((node, index) => {
        const IconComponent = node.icon;
        const isHovered = activeNode === node.id;

        return (
          <div
            key={node.id}
            style={{
              position: "absolute",
              top: `${node.y}%`,
              left: `${node.x}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="z-20 cursor-pointer group pointer-events-auto"
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.24 + index * 0.08,
                ease: EASE,
              }}
            >
              <div
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#003135]/95 border transition-all duration-300 shadow-md backdrop-blur-md card-hover-lift"
                style={{
                  borderColor: isHovered ? node.color : "rgba(175, 221, 229, 0.12)",
                  boxShadow: isHovered ? `0 0 25px -5px ${node.color}` : "none",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 icon-hover-lift"
                  style={{
                    backgroundColor: isHovered ? node.color : node.bgGlow,
                    color: isHovered ? "#001b1e" : node.color,
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white tracking-tight flex items-center gap-1">
                    {node.title}
                  </span>
                  <span className="text-[10px] font-mono text-muted">
                    {node.badge}
                  </span>
                </div>
              </div>

              {/* Hover Floating Pill Metric */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-0.5 rounded-full bg-black/90 border border-white/20 text-[10px] font-mono text-secondary whitespace-nowrap shadow-lg z-30"
                >
                  {node.metric}
                </motion.div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
