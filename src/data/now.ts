export type BuildInProgress = {
  name: string;
  tagline: string;
  status: "Prototype" | "Beta" | "Live";
  milestone: string;
  progress: number;
  metric: string;
  link?: string;
};

export const currentBuilds: BuildInProgress[] = [
  {
    name: "Atlas Automations",
    tagline: "Self-updating GA4 dashboards with Slack copilots",
    status: "Beta",
    milestone: "Inviting 15 growth teams",
    progress: 72,
    metric: "NPS 64",
    link: "https://github.com/sano-labs/atlas",
  },
  {
    name: "StudioPay",
    tagline: "Creator-friendly payouts with embedded finance",
    status: "Prototype",
    milestone: "Bridge banking partner",
    progress: 38,
    metric: "Waitlist 640",
  },
  {
    name: "ARC Ops",
    tagline: "Device telemetry meets retention experiments",
    status: "Live",
    milestone: "New observability pack",
    progress: 88,
    metric: "Churn -12%",
  },
];
