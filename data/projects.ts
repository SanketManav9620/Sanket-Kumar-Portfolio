export type ProjectCategory = "All" | "Full-Stack" | "AI" | "Backend";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  oneLiner: string;
  description: string;
  category: "Full-Stack" | "AI" | "Backend";
  filterCategories: ("Full-Stack" | "AI" | "Backend")[];
  metric: string;
  metricLabel: string;
  bullets: string[];
  techStack: string[];
  highlights?: string[];
  image: string;
  gallery?: string[];
  imageFit?: "cover" | "contain";
  links: {
    live?: string;
    github?: string;
  };
  featured: boolean;
  accentColor: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "outskill",
    title: "OutSkill Mailer",
    subtitle: "Automated Multi-Sender Email Dispatch & Queue",
    oneLiner:
      "Automated multi-sender email queue system with BullMQ + Redis background workers, token-bucket rate limiting, and Slack alerts.",
    description:
      "A distributed background task processor built to handle bursty email dispatches, webhook notifications, and automated Slack escalations with guaranteed delivery semantics.",
    category: "Backend",
    filterCategories: ["Backend"],
    metric: "1,000+ Jobs",
    metricLabel: "15 Concurrent Workers",
    bullets: [
      "BullMQ + Redis asynchronous queue architecture handling 1,000+ jobs across 15 concurrent workers with exponential backoffs.",
      "Sender-based token-bucket rate limiting (100 emails/hour/sender) with automated job postponement.",
      "Slack OAuth 2.0 alerting pipeline, incident escalations, and resilient third-party API error recovery.",
      "12 optimized REST APIs with Prisma indexing, eager relation loading, and sub-50ms response times.",
      "Elasticsearch-to-PostgreSQL fallback mechanism ensuring continuous query uptime during service failovers.",
    ],
    techStack: [
      "Node.js",
      "TypeScript",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "Prisma ORM",
      "Elasticsearch",
      "Slack OAuth 2.0",
      "Docker",
    ],
    image: "/projects/outskill.png",
    imageFit: "cover",
    links: {
      live: "https://outskill-app-frontend.vercel.app/",
      github: "https://github.com/SanketManav9620/Outskill-app",
    },
    featured: true,
    accentColor: "#0FA4AF",
  },
  {
    id: "proresume-ai",
    title: "ProResume AI",
    subtitle: "AI-Powered Job Recommendation & Resume Analyzer",
    oneLiner:
      "AI-powered job recommendation and resume analyzer evaluating keyword relevance, ATS scores, and real-time LinkedIn matching.",
    description:
      "An intelligent ATS and resume ranking platform that analyzes applicant resumes through keyword density, semantic skill relevance, and ML-based ranking algorithms, producing quantified feedback to maximize interview callbacks.",
    category: "AI",
    filterCategories: ["AI", "Full-Stack"],
    metric: "88% ATS Score",
    metricLabel: "3.3s Match Latency",
    bullets: [
      "AI-powered resume analyzer comparing applicant resumes directly against live job descriptions using keyword matching and semantic skill relevance.",
      "Engineered a proprietary weighted scoring matrix across five dimensions (Skills, Experience, Achievements, Format, Education) normalized to 100 points.",
      "Integrated real-time LinkedIn job matching with 3.3s average latency for rapid career alignment.",
      "Ultra-optimized client bundle achieving a 70.35 KB gzipped production build with aggressive Vite code splitting.",
      "Intuitive analytical dashboard featuring candidate profile benchmarks, skill gap diagnostics, and market salary estimations.",
    ],
    techStack: [
      "React.js",
      "Vite",
      "TypeScript",
      "Node.js",
      "OpenAI API",
      "Tailwind CSS",
      "Zod",
    ],
    image: "/projects/proresume-ai.png",
    imageFit: "cover",
    links: {
      live: "https://proresume-ai-wine.vercel.app/",
      github: "https://github.com/SanketManav9620/Proresume-AI",
    },
    featured: true,
    accentColor: "#0FA4AF",
  },
  {
    id: "reel-food",
    title: "Reel Food",
    subtitle: "Short-Video Food Discovery & Ordering Platform",
    oneLiner:
      "TikTok-style food discovery and ordering platform with 60 FPS gesture-driven video reels, menu popups, and instant checkout.",
    description:
      "A viral TikTok-style video discovery platform tailored for foodies and restaurants. Features smooth gesture-driven reels, menu popups, frictionless cart management, and secure payments.",
    category: "Full-Stack",
    filterCategories: ["Full-Stack"],
    metric: "60 FPS",
    metricLabel: "Smooth Reels Feed",
    bullets: [
      "Gesture-driven 60 FPS vertical video feed enabling interactive restaurant food discovery, dish exploration, and quick ordering.",
      "End-to-end shopping cart, multi-vendor menu browsing, checkout flow, and integrated payment gateway transactions.",
      "Architected secure stateless authentication via JWT stored in HTTP-only cookies with Bcrypt password hashing.",
      "Integrated ImageKit CDN for real-time video transcoding, adaptive bitrate streaming, and zero-buffering playback.",
      "Scalable RESTful microservice endpoints built with Node.js, Express, and MongoDB Mongoose ODM.",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Bcrypt",
      "ImageKit",
      "JWT",
      "Tailwind CSS",
    ],
    image: "/projects/reel-food.png",
    gallery: ["/projects/reel-food.png", "/projects/reel-food-mobile.png"],
    imageFit: "cover",
    links: {
      live: "https://reel-style-foodordering-app.vercel.app/",
      github: "https://github.com/SanketManav9620/Reel-style-foodorderingApp",
    },
    featured: true,
    accentColor: "#964734",
  },
  {
    id: "nk-enterprises",
    title: "NK Enterprises",
    subtitle: "Full-Stack Baby Care E-Commerce & Retail Store",
    oneLiner:
      "Full-stack MERN baby care e-commerce platform transitioning retail operations online with Razorpay checkout and admin inventory.",
    description:
      "A complete MERN e-commerce application engineered to transition offline retail store inventory into a digital marketplace with dynamic SEO, secure checkout, and comprehensive admin order tracking.",
    category: "Full-Stack",
    filterCategories: ["Full-Stack"],
    metric: "40% Boost",
    metricLabel: "Order Fulfillment Efficiency",
    bullets: [
      "Full-stack MERN e-commerce platform with dynamic product catalogs, category filtering, cart management, and SEO metadata.",
      "Integrated Razorpay payment gateway API for fast, reliable, and PCI-compliant online transactions.",
      "Built a comprehensive administrative dashboard for real-time order tracking, stock alerts, and inventory fulfillment.",
      "Optimized client rendering using debounced search and React.lazy code splitting, achieving sub-1.5s initial page loads.",
      "Engineered automated test suites using Jest and Supertest achieving 90%+ code coverage on core payment paths.",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Tailwind CSS",
      "Jest",
      "Vitest",
    ],
    image: "/projects/nk-enterprises.png",
    imageFit: "cover",
    links: {
      live: "https://nkenterprises.store",
      github: "https://github.com/SanketManav9620/NK-Enterprises",
    },
    featured: true,
    accentColor: "#AFDDE5",
  },
  {
    id: "yes-bank",
    title: "YES Bank ML Forecasting",
    subtitle: "Stock Price Prediction & Financial Analytics",
    oneLiner:
      "Financial time-series predictive modeling analyzing fraud impacts and stock trends with Optuna Bayesian regression models.",
    description:
      "A financial machine learning pipeline developed to forecast stock price trends and analyze historical equity volatility around major market events and RBI interventions. Evaluated 8 distinct models and deployed predictions using Dockerized Streamlit.",
    category: "AI",
    filterCategories: ["AI"],
    metric: "41.7%",
    metricLabel: "R² Accuracy Improvement",
    bullets: [
      "Analyzed monthly financial records to model stock performance, pricing volatility, and market trend indicators around 2018 fraud and 2020 RBI interventions.",
      "Benchmarked 8 regression algorithms and optimized 170+ hyperparameter configurations using Optuna Bayesian Optimization.",
      "Achieved a 41.7% R² improvement and significant RMSE reduction over linear baselines.",
      "Built interactive prediction dashboards and deployed containerized ML inference pipelines using Docker and Streamlit.",
    ],
    techStack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Optuna",
      "Streamlit",
      "Docker",
    ],
    image: "/projects/yes-bank.png",
    gallery: ["/projects/yes-bank.png", "/projects/yes-bank-modeling.png"],
    imageFit: "cover",
    links: {
      live: "https://github.com/SanketManav9620/YESBANK_project",
      github: "https://github.com/SanketManav9620/YESBANK_project",
    },
    featured: false,
    accentColor: "#c2573f",
  },
];
