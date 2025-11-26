export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  relation: string;
  badge?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Noelle Carter",
    title: "VP Product, Volt",
    relation: "LinkedIn",
    quote:
      "Sano pairs founder-level urgency with a calm, data-backed process. He modernized our Android + growth stack faster than our team could document it.",
    badge: "Aspire Leadership",
  },
  {
    name: "Ethan McCall",
    title: "CEO, Northwind Apps",
    relation: "GitHub",
    quote:
      "Every release we shipped with him came with metrics, instrumentation, and a runbook. That's rare in a contractor.",
    badge: "50k+ users",
  },
  {
    name: "Priya Malhotra",
    title: "Growth Lead, Axis DTC",
    relation: "Email",
    quote:
      "He built our commerce intelligence layer, trained the team, and kept iterating through launch. CRO jumped double digits.",
    badge: "Google Android Nanodegree",
  },
];
