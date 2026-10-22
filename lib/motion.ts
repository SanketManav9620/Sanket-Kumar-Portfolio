import { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATIONS = {
  hover: 0.25,
  reveal: 0.8,
  fast: 0.4,
  slow: 1.2,
} as const;

export const STAGGER = {
  default: 0.08,
  fast: 0.04,
  slow: 0.12,
} as const;

export const easeTransition = {
  duration: DURATIONS.reveal,
  ease: EASE,
};

// Standard variants
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? DURATIONS.reveal,
      delay: custom.delay ?? 0,
      ease: EASE,
    },
  }),
};

export const maskLineVariants: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: (custom = {}) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: custom.duration ?? DURATIONS.reveal,
      delay: custom.delay ?? 0,
      ease: EASE,
    },
  }),
};

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration ?? DURATIONS.reveal,
      delay: custom.delay ?? 0,
      ease: EASE,
    },
  }),
};

export const clipRevealVariants: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 0,
  },
  visible: (custom = {}) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: custom.duration ?? DURATIONS.reveal,
      delay: custom.delay ?? 0,
      ease: EASE,
    },
  }),
};

// Reduced motion fallback variants: degrade to simple fade
export const reducedFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: custom.delay ?? 0,
      ease: "easeOut",
    },
  }),
};

/**
 * Returns safe variants based on whether reduced motion is preferred
 */
export function getMotionVariants(variants: Variants, shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    return reducedFadeVariants;
  }
  return variants;
}
