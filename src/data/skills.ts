export type SkillCategory = {
  title: string;
  subtitle: string;
  highlights: string[];
  stack: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Engineering Systems",
    subtitle: "Android, iOS, cross-platform, and backend automation",
    highlights: [
      "Android / Kotlin / Jetpack Compose",
      "iOS / SwiftUI / Combine",
      "Flutter / KMM for shared layers",
      "Node.js / Python services with Firebase + REST",
    ],
    stack: ["Kotlin", "Swift", "Flutter", "Firebase", "Node.js", "Python"],
  },
  {
    title: "Product & Growth",
    subtitle: "Shipping revenue-focused experiences and measurement",
    highlights: [
      "MVP design sprints & validation",
      "GA4 funnels + product analytics instrumentation",
      "Ad campaign setup, retargeting, and experimentation",
      "E-commerce integrations (Shopify / WooCommerce)",
    ],
    stack: ["MVP", "GA4", "Analytics", "Ads", "Shopify", "WooCommerce"],
  },
  {
    title: "Operating System",
    subtitle: "Founder mindset with automation & leverage",
    highlights: [
      "Technical architecture & team enablement",
      "Experiment pipelines for acquisition + retention",
      "Automation for reporting, alerts, and growth ops",
      "Continuous delivery with observability",
    ],
    stack: ["Leadership", "Automation", "CD", "Observability", "Growth Ops"],
  },
];
