export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "C++", highlight: true },
      { name: "Python", highlight: true },
      { name: "SQL" },
    ],
  },
  {
    title: "Core Computer Science",
    iconName: "Cpu",
    skills: [
      { name: "Data Structures & Algorithms (300+ Solved)", highlight: true },
      { name: "Object-Oriented Programming (OOP)", highlight: true },
      { name: "DBMS & Relational Modeling", highlight: true },
      { name: "Operating Systems & Concurrency" },
      { name: "System Design & Distributed Patterns" },
    ],
  },
  {
    title: "Frontend Development",
    iconName: "Layout",
    skills: [
      { name: "React.js", highlight: true },
      { name: "Next.js 14 (App Router)", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "Vite" },
      { name: "Shadcn UI" },
      { name: "HTML5 & Semantic Web" },
      { name: "CSS3 & Modern Animations" },
    ],
  },
  {
    title: "Backend & Systems",
    iconName: "Server",
    skills: [
      { name: "Node.js", highlight: true },
      { name: "Express.js", highlight: true },
      { name: "REST APIs Architecture", highlight: true },
      { name: "Redis & BullMQ Queues", highlight: true },
      { name: "JWT & HTTP-Only Cookie Auth" },
      { name: "Bcrypt" },
      { name: "Rate Limiting & Caching" },
    ],
  },
  {
    title: "Databases & Storage",
    iconName: "Database",
    skills: [
      { name: "MongoDB", highlight: true },
      { name: "PostgreSQL", highlight: true },
      { name: "Prisma ORM", highlight: true },
      { name: "Mongoose ODM" },
      { name: "Elasticsearch" },
      { name: "Database Indexing & Optimization" },
    ],
  },
  {
    title: "AI & Machine Learning",
    iconName: "Sparkles",
    skills: [
      { name: "Machine Learning (Supervised/Unsupervised)", highlight: true },
      { name: "Natural Language Processing (NLP)", highlight: true },
      { name: "OpenAI API Integration", highlight: true },
      { name: "Optuna Bayesian Optimization" },
      { name: "NumPy & Pandas" },
      { name: "Matplotlib" },
    ],
  },
  {
    title: "DevOps & Tools",
    iconName: "Wrench",
    skills: [
      { name: "Docker & Containerization", highlight: true },
      { name: "Git & GitHub CI/CD", highlight: true },
      { name: "Vercel Deployment" },
      { name: "Payment Gateway Integration (Razorpay)" },
      { name: "ImageKit Media CDN" },
      { name: "Zod Schema Validation" },
      { name: "Jest, Vitest & Supertest" },
    ],
  },
];
