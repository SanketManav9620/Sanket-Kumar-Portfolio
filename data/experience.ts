export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  type: "Full-Time" | "Internship" | "Training" | "Contract";
  summary: string;
  bullets: string[];
  skills: string[];
  statsBadge?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "nk-enterprises",
    role: "Full-Stack Developer",
    company: "NK Enterprises",
    period: "June – August 2026",
    type: "Internship",
    summary:
      "Spearheaded digital transformation for offline retail into a full-featured MERN platform with digital payments, real-time inventory management, and automated test pipelines.",
    bullets: [
      "Engineered a full-stack MERN e-commerce application to transition an offline retail store online, enabling fast product discovery, secure cart management, and dynamic SEO metadata.",
      "Integrated Razorpay API for digital checkout and built an intuitive admin panel for inventory and order tracking, improving order processing efficiency by 40%.",
      "Optimized client performance using debounced search queries and React.lazy route/component splitting, achieving a 1.5s initial page load.",
      "Authored Jest, Supertest, and Vitest test suites maintaining 90%+ code coverage across critical checkout and authentication flows.",
    ],
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay API",
      "Jest",
      "Vitest",
      "Supertest",
      "Performance Tuning",
    ],
    statsBadge: "40% Order Efficiency Boost",
  },
  {
    id: "winovation-services",
    role: "Industry Training in AI & Machine Learning",
    company: "Winovation Services Pvt. Ltd.",
    period: "May – July 2025",
    type: "Training",
    summary:
      "Deep dive into supervised and unsupervised machine learning pipelines, predictive modeling, Bayesian hyperparameter optimization, and containerized deployment.",
    bullets: [
      "Gained hands-on experience with Python, OOP, NumPy, and Pandas; built and evaluated supervised and unsupervised ML models, including clustering and hyperparameter tuning.",
      "Evaluated 8 distinct ML algorithms across 185 monthly records and deployed the end-to-end forecasting pipeline via Dockerized Streamlit.",
      "Optimized 170+ hyperparameter configurations with Optuna Bayesian Optimization, achieving a 41.7% R² improvement and substantial RMSE reduction over the linear baseline.",
    ],
    skills: [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "Optuna",
      "Bayesian Optimization",
      "Docker",
      "Streamlit",
    ],
    statsBadge: "41.7% R² Improvement",
  },
];
