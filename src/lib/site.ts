export const site = {
  name: "Utility Informatics",
  tagline: "Enhancing data utilization",
  url: "https://utilityinformatics.co.ke",
  description:
    "Utility Informatics partners with organizations to turn raw data into timely, evidence-based decisions — across the full data lifecycle, from collection to insight.",
  contact: {
    phone: "0720 325 755",
    whatsapp: "0720325755",
    email: "utiltyinfogrp@gmail.com",
    address: "Masaba Road, Ground Floor, Room/Door 5, Nairobi",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  social: {},
};

export const whatsappUrl = (text = "Hello Utility Informatics") =>
  `https://wa.me/254${site.contact.whatsapp.replace(/^0/, "")}?text=${encodeURIComponent(text)}`;

export const pillars = [
  {
    key: "collection",
    n: "01",
    title: "Collection",
    short: "Capturing the right data at the source",
    intro:
      "Good data utilization starts at the source. We help organizations capture accurate, structured information so everything built downstream — every dashboard, workflow, and forecast — rests on a reliable foundation.",
  },
  {
    key: "systems",
    n: "02",
    title: "Systems",
    short: "Platforms that house and run it",
    intro:
      "The platforms and infrastructure your data lives in, built to hold up as your organization and its information needs grow.",
  },
  {
    key: "visualization",
    n: "03",
    title: "Visualization",
    short: "Turning it into something you can see",
    intro:
      "Data only creates value once it can be seen and understood. We simplify complex information into clear, interactive visuals built for faster decisions.",
  },
  {
    key: "workflow-automation",
    n: "04",
    title: "Workflow & Automation",
    short: "Putting it to work without manual effort",
    intro:
      "Once data moves, it should trigger action on its own. We design automated workflows that put information to work without manual effort.",
  },
  {
    key: "insights",
    n: "05",
    title: "Insights",
    short: "Forecasting what comes next",
    intro:
      "The payoff of the whole lifecycle: data that tells you what's likely to happen next, not just what already happened.",
  },
] as const;
