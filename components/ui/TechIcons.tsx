import React from "react";

export interface TechItem {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Databases" | "AI/ML" | "Tools";
  color: string;
  glow: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

// Crisp SVG Icons for the Tech Stack
export const TechIcons: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  React: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
    </svg>
  ),
  Nextjs: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1.2" />
      <path d="M7 8.5v7l9-10.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 8.5v7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  TypeScript: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M4 10.5h6m-3 0V18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 16c.8 1.2 2 1.8 3.5 1.8 1.5 0 2.5-.8 2.5-1.8 0-2.2-4.5-1.5-4.5-3.5 0-1 .9-1.8 2.3-1.8 1.3 0 2.3.5 3 1.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  JavaScript: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path d="M8 12v4.5c0 1.2-.8 1.8-1.8 1.8-.8 0-1.5-.4-1.8-1" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 16.5c.8.8 1.8 1.2 2.8 1.2 1.4 0 2.2-.6 2.2-1.6 0-1.8-3.8-1.2-3.8-3 0-.9.8-1.6 2-1.6 1 0 1.8.4 2.4 1.2" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Tailwind: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 9c1.5-2.5 3.5-3 6-1.5 2.5 1.5 3.5 1 5-1.5-1 3-2.5 4-5 3-2.5-1-3.5-.5-6 0zm-4 6c1.5-2.5 3.5-3 6-1.5 2.5 1.5 3.5 1 5-1.5-1 3-2.5 4-5 3-2.5-1-3.5-.5-6 0z" fill="#06B6D4" />
    </svg>
  ),
  Nodejs: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z" stroke="#5FA04E" strokeWidth="1.5" fill="#5FA04E" fillOpacity="0.1" />
      <path d="M12 7v10m-5-5l5 2.5 5-2.5" stroke="#5FA04E" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Express: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
      <text x="5" y="16" fill="#f4f4f5" fontSize="10" fontFamily="monospace" fontWeight="bold">ex</text>
    </svg>
  ),
  MongoDB: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C12 2 6 8.5 6 13.5c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5C18 8.5 12 2 12 2z" stroke="#47A248" strokeWidth="1.5" fill="#47A248" fillOpacity="0.15" />
      <path d="M12 3v18" stroke="#47A248" strokeWidth="1.5" />
    </svg>
  ),
  PostgreSQL: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3a8 8 0 00-8 8c0 3.5 2.2 6.5 5.5 7.6.5.1.7-.2.7-.5v-1.8c-2.4.5-2.9-1-2.9-1-.4-1-.9-1.3-.9-1.3-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.4.7.1-.5.3-.9.5-1.1-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.9-2.2-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.3.9.7-.2 1.4-.3 2.1-.3s1.4.1 2.1.3c1.6-1.1 2.3-.9 2.3-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.2 0 3.3-2 4-4 4.2.3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5A8 8 0 0020 11a8 8 0 00-8-8z" fill="#4169E1" />
    </svg>
  ),
  Prisma: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4.5 19.5L12 3l7.5 16.5-7.5-3.5-7.5 3.5z" stroke="#6875F5" strokeWidth="1.6" fill="#6875F5" fillOpacity="0.15" strokeLinejoin="round" />
      <path d="M12 3v13" stroke="#6875F5" strokeWidth="1.5" />
    </svg>
  ),
  Redis: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 8.5L12 4l9 4.5-9 4.5-9-4.5z" stroke="#DC382D" strokeWidth="1.5" fill="#DC382D" fillOpacity="0.2" />
      <path d="M3 13.5l9 4.5 9-4.5" stroke="#DC382D" strokeWidth="1.5" />
      <path d="M3 18.5l9 4.5 9-4.5" stroke="#DC382D" strokeWidth="1.5" />
    </svg>
  ),
  Elasticsearch: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="#005571" strokeWidth="1.5" />
      <path d="M7 9.5h10M6 14.5h12" stroke="#FEC514" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Docker: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 13h18c-.5 4-4 7-9 7s-8.5-3-9-7z" fill="#2496ED" fillOpacity="0.2" stroke="#2496ED" strokeWidth="1.5" />
      <rect x="5" y="10" width="2.5" height="2" fill="#2496ED" />
      <rect x="8.5" y="10" width="2.5" height="2" fill="#2496ED" />
      <rect x="12" y="10" width="2.5" height="2" fill="#2496ED" />
      <rect x="8.5" y="7.5" width="2.5" height="2" fill="#2496ED" />
      <rect x="12" y="7.5" width="2.5" height="2" fill="#2496ED" />
    </svg>
  ),
  Azure: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13.5 3L5 17h6l2.5-4 4 8H20L13.5 3z" fill="#0078D4" />
    </svg>
  ),
  Git: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" transform="rotate(45 12 12)" fill="#F05032" fillOpacity="0.15" stroke="#F05032" strokeWidth="1.5" />
      <circle cx="8" cy="12" r="1.5" fill="#F05032" />
      <circle cx="16" cy="8" r="1.5" fill="#F05032" />
      <circle cx="16" cy="16" r="1.5" fill="#F05032" />
      <path d="M8 12h5l3-4m-3 4l3 4" stroke="#F05032" strokeWidth="1.5" />
    </svg>
  ),
  GitHub: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  Python: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M11.9 2c-3.1 0-5 1.4-5 3.5v2.5h5.5v.8H4.6C2.5 8.8 1 10.6 1 13.5s1.8 4.7 4.2 4.7h2.2v-2.3c0-1.7 1.5-3.1 3.2-3.1h5.3c1.5 0 2.7-1.2 2.7-2.7V6.3c0-2.2-1.9-4.3-6.7-4.3z" fill="#3776AB" />
      <path d="M12.1 22c3.1 0 5-1.4 5-3.5V16h-5.5v-.8h7.8c2.1 0 3.6-1.8 3.6-4.7s-1.8-4.7-4.2-4.7h-2.2v2.3c0 1.7-1.5 3.1-3.2 3.1H8.1c-1.5 0-2.7 1.2-2.7 2.7v3.8c0 2.2 1.9 4.3 6.7 4.3z" fill="#FFD43B" />
      <circle cx="8.5" cy="5.2" r="1" fill="#fff" />
      <circle cx="15.5" cy="18.8" r="1" fill="#fff" />
    </svg>
  ),
  Cpp: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z" fill="#00599C" fillOpacity="0.15" stroke="#00599C" strokeWidth="1.5" />
      <text x="5" y="15" fill="#00599C" fontSize="9" fontWeight="bold" fontFamily="monospace">C++</text>
    </svg>
  ),
  Vite: ({ className = "w-5 h-5" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M19.5 3.5l-8 16-7.5-13.5 15.5-2.5z" fill="#646CFF" fillOpacity="0.2" stroke="#646CFF" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M13.5 2.5l-6 10h4l-2 8 8-12h-4.5l.5-6z" fill="#BD34FE" />
    </svg>
  ),
};

// Row 1 & Row 2 Datasets
export const MARQUEE_ROW_1: TechItem[] = [
  { name: "React", category: "Frontend", color: "#61DAFB", glow: "rgba(97, 218, 251, 0.35)", icon: TechIcons.React },
  { name: "Next.js", category: "Frontend", color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.35)", icon: TechIcons.Nextjs },
  { name: "TypeScript", category: "Languages", color: "#3178C6", glow: "rgba(49, 120, 198, 0.35)", icon: TechIcons.TypeScript },
  { name: "JavaScript", category: "Languages", color: "#F7DF1E", glow: "rgba(247, 223, 30, 0.35)", icon: TechIcons.JavaScript },
  { name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", glow: "rgba(6, 182, 212, 0.35)", icon: TechIcons.Tailwind },
  { name: "Node.js", category: "Backend", color: "#5FA04E", glow: "rgba(95, 160, 78, 0.35)", icon: TechIcons.Nodejs },
  { name: "Express", category: "Backend", color: "#E4E4E7", glow: "rgba(228, 228, 231, 0.35)", icon: TechIcons.Express },
  { name: "MongoDB", category: "Databases", color: "#47A248", glow: "rgba(71, 162, 72, 0.35)", icon: TechIcons.MongoDB },
  { name: "PostgreSQL", category: "Databases", color: "#4169E1", glow: "rgba(65, 105, 225, 0.35)", icon: TechIcons.PostgreSQL },
  { name: "Prisma", category: "Databases", color: "#6875F5", glow: "rgba(104, 117, 245, 0.35)", icon: TechIcons.Prisma },
];

export const MARQUEE_ROW_2: TechItem[] = [
  { name: "Redis", category: "Databases", color: "#DC382D", glow: "rgba(220, 56, 45, 0.35)", icon: TechIcons.Redis },
  { name: "Elasticsearch", category: "Databases", color: "#FEC514", glow: "rgba(254, 197, 20, 0.35)", icon: TechIcons.Elasticsearch },
  { name: "Docker", category: "Tools", color: "#2496ED", glow: "rgba(36, 150, 237, 0.35)", icon: TechIcons.Docker },
  { name: "Azure", category: "Tools", color: "#0078D4", glow: "rgba(0, 120, 212, 0.35)", icon: TechIcons.Azure },
  { name: "Git", category: "Tools", color: "#F05032", glow: "rgba(240, 80, 50, 0.35)", icon: TechIcons.Git },
  { name: "GitHub", category: "Tools", color: "#F0F6FC", glow: "rgba(240, 246, 252, 0.35)", icon: TechIcons.GitHub },
  { name: "Python", category: "Languages", color: "#3776AB", glow: "rgba(55, 118, 171, 0.35)", icon: TechIcons.Python },
  { name: "C++", category: "Languages", color: "#00599C", glow: "rgba(0, 89, 156, 0.35)", icon: TechIcons.Cpp },
  { name: "Vite", category: "Frontend", color: "#646CFF", glow: "rgba(100, 108, 255, 0.35)", icon: TechIcons.Vite },
];
