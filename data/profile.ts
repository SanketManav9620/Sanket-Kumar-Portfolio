export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    cgpa: string;
    highlights: string[];
  };
  summary: string;
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
  };
  availability: string;
}

export const profileData: Profile = {
  name: "Sanket Kumar",
  role: "Full-Stack & Systems Engineer",
  tagline: "Engineering resilient distributed queues, high-frame-rate web applications, and AI evaluation engines.",
  location: "Rohini, Delhi, India 110085",
  email: "0sanket0kumar@gmail.com",
  phone: "+91-93899-99620",
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Bhagwan Parshuram Institute of Technology",
    location: "Delhi, India",
    period: "2023 – 2027",
    cgpa: "9.05 / 10",
    highlights: [
      "Consistent academic top-tier performance with 9.05 CGPA",
      "Solved 300+ Data Structures & Algorithms problems across LeetCode & GeeksforGeeks",
      "Specialized in scalable distributed backends and AI-powered full-stack systems",
    ],
  },
  summary:
    "B.Tech Computer Science student with a 9.05 CGPA and 300+ DSA problems solved across LeetCode and GeeksforGeeks. Skilled in developing high-throughput full-stack and AI-powered applications with React, Next.js, Node.js, Express, Redis, PostgreSQL, and MongoDB. Strong background in operating systems, concurrency, OOP, DBMS, database design, and resilient microservice architectures.",
  socials: {
    github: "https://github.com/SanketManav9620",
    linkedin: "https://www.linkedin.com/in/sanket-manav-325b23279/",
    leetcode: "https://leetcode.com/u/Sanket_kumar_/",
  },
  availability: "Open to Full-Stack & Backend Engineering Roles",
};
