export interface TimelineEntry {
  date: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education" | "project" | "achievement";
  technologies?: string[];
  icon: string; // emoji or symbol
  url?: string; // Optional GitHub URL for projects
}

export const timeline: TimelineEntry[] = [
  {
    date: "2025 - Present",
    title: "Full-Stack Developer & Growth Engineer",
    organization: "Independent",
    description: "Building revenue-focused mobile and web applications with end-to-end ownership. Specializing in Android/iOS development, growth automation, and product analytics.",
    type: "work",
    technologies: ["Kotlin", "Swift", "Flutter", "Node.js", "Firebase", "GA4"],
    icon: "🚀",
  },
  {
    date: "2024",
    title: "Portfolio Website Launch",
    organization: "Personal Project",
    description: "Built a modern portfolio with Next.js 16, React 19, and advanced animations. Integrated GitHub API for dynamic project showcasing and real-time contribution tracking.",
    type: "project",
    technologies: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
    icon: "💼",
  },
  {
    date: "2023 - 2024",
    title: "Mobile App Development Mastery",
    organization: "Self-Directed Learning",
    description: "Deep-dived into native mobile development with Kotlin/Jetpack Compose and SwiftUI. Built cross-platform solutions using Flutter and KMM for shared business logic.",
    type: "education",
    technologies: ["Kotlin", "Swift", "Flutter", "Jetpack Compose", "SwiftUI"],
    icon: "📱",
  },
  {
    date: "2023",
    title: "E-Commerce Integration Specialist",
    organization: "Freelance Projects",
    description: "Implemented revenue-tracking systems and conversion funnels for Shopify and WooCommerce stores. Optimized checkout flows and integrated analytics pipelines.",
    type: "work",
    technologies: ["Shopify", "WooCommerce", "GA4", "Google Ads"],
    icon: "🛒",
  },
  {
    date: "2022 - 2023",
    title: "Backend & Cloud Architecture",
    organization: "Independent Study",
    description: "Mastered serverless architectures, RESTful API design, and cloud infrastructure. Focused on Firebase, Node.js services, and automated deployment pipelines.",
    type: "education",
    technologies: ["Node.js", "Python", "Firebase", "REST APIs", "CI/CD"],
    icon: "☁️",
  },
  {
    date: "2022",
    title: "First Production App Deployed",
    organization: "Personal Milestone",
    description: "Launched my first production-ready mobile application with 1K+ downloads. Implemented analytics tracking, crash reporting, and continuous delivery.",
    type: "achievement",
    technologies: ["Android", "Firebase", "Analytics"],
    icon: "🎯",
  },
  {
    date: "2021 - 2022",
    title: "Full-Stack Foundations",
    organization: "Coding Bootcamp & Online Courses",
    description: "Completed intensive training in web development, mobile programming, and software engineering fundamentals. Built 20+ projects across different tech stacks.",
    type: "education",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Python"],
    icon: "📚",
  },
  {
    date: "2021",
    title: "Journey Begins",
    organization: "First Line of Code",
    description: "Started my software development journey with a passion for building products that solve real problems. Committed to continuous learning and shipping.",
    type: "achievement",
    icon: "✨",
  },
];
