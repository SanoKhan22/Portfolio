export type SignatureProject = {
  name: string;
  platform: string;
  problem: string;
  solution: string;
  tech: string[];
  impact: { label: string; value: string }[];
  media: string;
};

export const signatureProjects: SignatureProject[] = [
  {
    name: "U-VPN",
    platform: "Android + iOS",
    problem:
      "Freemium VPN needed better onboarding and retention across markets despite low bandwidth and limited trust.",
    solution:
      "Rebuilt mobile clients with Compose + SwiftUI, tuned performance, and layered remote config experiments for paywall states.",
    tech: ["Kotlin", "SwiftUI", "Firebase Remote Config", "Segment", "GA4"],
    impact: [
      { label: "Downloads", value: "50k+" },
      { label: "Retention", value: "+25%" },
      { label: "Subs", value: "+18%" },
    ],
    media: "/assets/pixel-portrait.svg",
  },
  {
    name: "Universal Remote",
    platform: "Mobile + Embedded",
    problem:
      "Device-sync flows were laggy and support costs were spiking with every new hardware integration.",
    solution:
      "Built a realtime abstraction over Firebase RTDB, added local-first caching, and shipped diagnostic dashboards.",
    tech: ["KMM", "Jetpack Compose", "Firebase RTDB", "Rust bridge"],
    impact: [
      { label: "Sync", value: "<1s" },
      { label: "Tickets", value: "-32%" },
      { label: "Uptime", value: "99.95%" },
    ],
    media: "/assets/pixel-overlay.svg",
  },
  {
    name: "Commerce Intelligence",
    platform: "Web + Mobile",
    problem:
      "Growth team lacked a unified view of ad spend, funnels, and retention for their DTC portfolio.",
    solution:
      "Shipped a headless dashboard with automated GA4 + Meta Ads ingestion, scenario planning, and Slack alerts.",
    tech: ["Next.js", "Supabase", "BigQuery", "Shopify"],
    impact: [
      { label: "Conversion", value: "+15%" },
      { label: "ROAS", value: "+22%" },
      { label: "Ops Time", value: "-10h/wk" },
    ],
    media: "/assets/pixel-portrait.svg",
  },
];
