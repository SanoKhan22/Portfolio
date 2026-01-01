export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  relation: string;
  badge?: string;
  avatar?: string;
  company?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    title: "VP of Engineering",
    company: "TechVenture Inc",
    relation: "Former Colleague",
    quote:
      "Sano doesn't just write code—he builds systems that scale. His work on our mobile platform helped us go from 10k to 500k users without a single architecture rewrite.",
    badge: "Series B Funded",
    avatar: "SC",
  },
  {
    name: "Michael Rodriguez",
    title: "Founder & CEO",
    company: "GrowthKit",
    relation: "Client",
    quote:
      "Best investment we made. He delivered a full-stack analytics dashboard in 6 weeks that our previous team couldn't finish in 6 months. Clean code, pixel-perfect UI, and it actually works.",
    badge: "YC W23",
    avatar: "MR",
  },
  {
    name: "Priya Patel",
    title: "Head of Product",
    company: "FinFlow",
    relation: "Collaborator",
    quote:
      "Rare combination of technical depth and product thinking. He challenged our assumptions, proposed better solutions, and shipped faster than our in-house team.",
    badge: "$10M ARR",
    avatar: "PP",
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
