export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
}

export const statsData: StatItem[] = [
  {
    id: "cgpa",
    value: 9.05,
    decimals: 2,
    label: "Academic CGPA",
    description: "Bhagwan Parshuram Institute of Technology (2023–2027)",
  },
  {
    id: "dsa",
    value: 300,
    suffix: "+",
    label: "DSA Solved",
    description: "Mastered algorithmic challenges on LeetCode & GFG",
  },
  {
    id: "jobs",
    value: 1000,
    suffix: "+",
    label: "Async Jobs / min",
    description: "Processed concurrently with BullMQ & Redis queues",
  },
  {
    id: "fps",
    value: 60,
    suffix: " FPS",
    label: "Reels Smoothness",
    description: "Jank-free short-video feed on Reel Food platform",
  },
  {
    id: "ml-tuning",
    value: 41.7,
    suffix: "%",
    decimals: 1,
    label: "ML R² Improvement",
    description: "Over baseline via Optuna Bayesian Optimization",
  },
  {
    id: "tests",
    value: 90,
    suffix: "%+",
    label: "Test Coverage",
    description: "Across mission-critical flows with Vitest, Jest & Supertest",
  },
];
