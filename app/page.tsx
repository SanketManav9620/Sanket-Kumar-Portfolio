import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Dynamic imports for heavy below-the-fold sections to optimize initial page weight & TBT
const About = dynamic(
  () => import("@/components/sections/About").then((mod) => mod.About),
  {
    loading: () => (
      <div className="w-full min-h-[600px] flex items-center justify-center opacity-0" />
    ),
  }
);

const Projects = dynamic(
  () => import("@/components/sections/Projects").then((mod) => mod.Projects),
  {
    loading: () => (
      <div className="w-full min-h-[750px] flex items-center justify-center opacity-0" />
    ),
  }
);

const Experience = dynamic(
  () => import("@/components/sections/Experience").then((mod) => mod.Experience),
  {
    loading: () => (
      <div className="w-full min-h-[600px] flex items-center justify-center opacity-0" />
    ),
  }
);

const TechStack = dynamic(
  () => import("@/components/sections/TechStack").then((mod) => mod.TechStack),
  {
    loading: () => (
      <div className="w-full min-h-[500px] flex items-center justify-center opacity-0" />
    ),
  }
);

const Contact = dynamic(
  () => import("@/components/sections/Contact").then((mod) => mod.Contact),
  {
    loading: () => (
      <div className="w-full min-h-[600px] flex items-center justify-center opacity-0" />
    ),
  }
);

const Footer = dynamic(
  () => import("@/components/sections/Footer").then((mod) => mod.Footer),
  {
    loading: () => (
      <div className="w-full min-h-[300px] flex items-center justify-center opacity-0" />
    ),
  }
);

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section (Above the fold - critical paint) */}
      <Hero />

      {/* 2. About Me Section (Dynamically loaded) */}
      <About />

      {/* 3. Featured Projects Section (Dynamically loaded) */}
      <Projects />

      {/* 4. Experience & Training Section (Dynamically loaded) */}
      <Experience />

      {/* 5. Tech Stack & Skills Section (Dynamically loaded) */}
      <TechStack />

      {/* 6. Contact Section (Dynamically loaded) */}
      <Contact />

      {/* 7. Minimal Footer (Dynamically loaded) */}
      <Footer />
    </div>
  );
}
