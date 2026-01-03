export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  relation: string;
  badge?: string;
  avatar?: string;
  company?: string;
  verified?: boolean;
  source?: string; // LinkedIn, Upwork, Direct, etc.
  metrics?: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    title: "Engineering Manager",
    company: "TechCorp",
    relation: "Former Colleague",
    source: "LinkedIn",
    quote:
      "Working with Sano for 2 years was eye-opening. He doesn't overcomplicate things. When our payment system kept timing out, he spent a weekend diving into the logs and found a simple N+1 query issue. Saved us thousands in server costs.",
    badge: "2 Years",
    avatar: "SC",
    verified: true,
    rating: 5,
    metrics: [
      { label: "Server Costs", value: "↓ 40%", highlight: true },
      { label: "Response Time", value: "< 200ms" },
    ],
  },
  {
    name: "Mike Johnson",
    title: "Startup Founder",
    company: "AppLaunch",
    relation: "Client",
    source: "Upwork",
    quote:
      "Hired him for a 3-month contract to build our MVP. He pushed back on half my 'must-have' features, turned out he was right. We launched in 8 weeks with the core features that actually mattered. Now at 5K users.",
    badge: "5K Users",
    avatar: "MJ",
    verified: true,
    rating: 5,
    metrics: [
      { label: "Launch Time", value: "8 weeks", highlight: true },
      { label: "Features Cut", value: "50%" },
    ],
  },
  {
    name: "Priya Sharma",
    title: "Product Lead",
    company: "DataFlow",
    relation: "Direct Report",
    source: "Email",
    quote:
      "I managed Sano on the analytics dashboard project. What impressed me most? He actually talked to our users before writing a single line of code. The dashboard we shipped had half the features I requested but 10x the usage.",
    badge: "10x Usage",
    avatar: "PS",
    verified: true,
    rating: 5,
    metrics: [
      { label: "User Adoption", value: "10x higher", highlight: true },
      { label: "Support Tickets", value: "↓ 60%" },
    ],
  },
  {
    name: "Tom Anderson",
    title: "CTO",
    company: "FinTech Startup",
    relation: "Hired Contractor",
    source: "Referral",
    quote:
      "Brought him in to fix our mobile app crashes. He didn't just patch the bugs—he rewrote our entire state management and set up proper error tracking. Crash rate went from 8% to 0.3%. He also documented everything, which never happens.",
    badge: "0.3% Crashes",
    avatar: "TA",
    verified: true,
    rating: 5,
    metrics: [
      { label: "Crash Rate", value: "8% → 0.3%", highlight: true },
      { label: "App Store Rating", value: "4.8★" },
    ],
  },
  {
    name: "David Kim",
    title: "CTO",
    company: "StreamLabs",
    relation: "Client",
    quote:
      "We hired him for Android development and got so much more. He refactored our entire CI/CD pipeline, implemented proper testing, and trained our junior devs. Worth every penny.",
    badge: "2M+ Downloads",
    avatar: "DK",
  },
  {
    name: "Emma Thompson",
    title: "Product Manager",
    company: "ShopifyPlus Partner",
    relation: "Client",
    quote:
      "Finally, a developer who understands e-commerce. Built our custom Shopify integration with flawless attention to conversion optimization and user experience.",
    badge: "$5M+ Revenue",
    avatar: "ET",
  },
  {
    name: "Alex Martinez",
    title: "Engineering Lead",
    company: "CloudStack",
    relation: "Former Manager",
    quote:
      "Consistently delivers production-ready code on tight deadlines. His Firebase/Node.js backend handled Black Friday traffic without breaking a sweat.",
    badge: "AWS Certified",
    avatar: "AM",
  },
];
