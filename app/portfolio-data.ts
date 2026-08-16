export const siteDetails = {
  name: "Smit",
  role: "Graphic Designer & Visual Creative",
  email: "smitptl.888@gmail.com",
  location: "Available for remote projects",
  whatsappUrl: "",
  instagramUrl: "",
};

export type Project = {
  id: number;
  title: string;
  brand: string;
  category: string;
  year: string;
  summary: string;
  deliverables: string[];
  tone: string;
  headline: string;
  kicker: string;
};

export const categories = [
  "All work",
  "Meta Ads",
  "Product Listings",
  "Banners",
  "Social Media",
  "Thumbnails",
  "Campaigns",
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Glow Forward",
    brand: "Luma Skin",
    category: "Meta Ads",
    year: "2026",
    summary: "A conversion-minded launch system balancing product clarity with an editorial skincare aesthetic.",
    deliverables: ["Feed ads", "Story variants", "Offer-led creative"],
    tone: "coral",
    headline: "YOUR SKIN,\nBUT BRIGHTER.",
    kicker: "NEW FORMULA / 01",
  },
  {
    id: 2,
    title: "Sound Without Limits",
    brand: "AERA Audio",
    category: "Product Listings",
    year: "2026",
    summary: "A complete marketplace image story that turns technical features into clear customer benefits.",
    deliverables: ["Hero image", "Feature callouts", "Comparison chart"],
    tone: "cyan",
    headline: "NOISE OFF.\nWORLD ON.",
    kicker: "40H PLAYTIME",
  },
  {
    id: 3,
    title: "After Dark Sale",
    brand: "NOIR / 11",
    category: "Banners",
    year: "2025",
    summary: "A fashion sale system designed to stay bold across homepage, display and mobile banner formats.",
    deliverables: ["Hero banner", "Mobile crops", "Display set"],
    tone: "acid",
    headline: "AFTER DARK\nUP TO 50% OFF",
    kicker: "48 HOURS ONLY",
  },
  {
    id: 4,
    title: "Brewed Social",
    brand: "DAYBREAK Coffee",
    category: "Social Media",
    year: "2025",
    summary: "A warm, energetic social system for launches, community posts, carousels and daily offers.",
    deliverables: ["Feed system", "Carousels", "Stories"],
    tone: "amber",
    headline: "GOOD DAYS\nSTART HERE.",
    kicker: "ROASTED WEEKLY",
  },
  {
    id: 5,
    title: "Click / Learn",
    brand: "NXT BYTE",
    category: "Thumbnails",
    year: "2025",
    summary: "A recognisable thumbnail language built around clear subjects, fast hierarchy and repeatable formats.",
    deliverables: ["Thumbnail system", "Title treatments", "Series covers"],
    tone: "violet",
    headline: "THE AI SHIFT\nEXPLAINED",
    kicker: "WATCH / 08:42",
  },
  {
    id: 6,
    title: "Move Different",
    brand: "MOTION LAB",
    category: "Campaigns",
    year: "2025",
    summary: "A multi-format wellness launch bringing one strong visual idea across ads, social and landing graphics.",
    deliverables: ["Launch identity", "Paid social", "Campaign assets"],
    tone: "lime",
    headline: "MOVE\nDIFFERENT.",
    kicker: "21 DAY RESET",
  },
  {
    id: 7,
    title: "Every Detail Matters",
    brand: "FORM Home",
    category: "Product Listings",
    year: "2024",
    summary: "Benefit-led listing graphics for a modern home product, designed for quick scanning and trust.",
    deliverables: ["Listing sequence", "Lifestyle frames", "Specs"],
    tone: "stone",
    headline: "LESS MESS.\nMORE HOME.",
    kicker: "DESIGNED TO LAST",
  },
  {
    id: 8,
    title: "Focus Mode",
    brand: "FLOWSTATE",
    category: "Campaigns",
    year: "2024",
    summary: "A launch campaign for a productivity app using modular messages and energetic interface-inspired visuals.",
    deliverables: ["Launch campaign", "App graphics", "Social toolkit"],
    tone: "blue",
    headline: "MAKE SPACE\nFOR FOCUS.",
    kicker: "YOUR DAY / SORTED",
  },
];

export const services = [
  {
    number: "01",
    title: "Meta Ads & Performance Creative",
    text: "Scroll-stopping static ads, story formats and structured creative variations built for clear communication and testing.",
    tags: ["Feed ads", "Stories", "Creative variants"],
  },
  {
    number: "02",
    title: "E-commerce Product Images",
    text: "Complete listing sequences with benefits, feature callouts, comparisons and lifestyle-led product stories.",
    tags: ["Listings", "A+ content", "Marketplaces"],
  },
  {
    number: "03",
    title: "Social Media Design",
    text: "Cohesive feed systems, carousels, stories and launch graphics that make daily content feel consistently branded.",
    tags: ["Posts", "Carousels", "Templates"],
  },
  {
    number: "04",
    title: "Banners & Campaign Assets",
    text: "Flexible campaign visuals adapted across websites, displays, promotions and mobile placements.",
    tags: ["Web banners", "Sales", "Launch assets"],
  },
  {
    number: "05",
    title: "YouTube Thumbnails",
    text: "High-impact thumbnail systems with strong hierarchy, readable hooks and a recognisable channel language.",
    tags: ["Series systems", "Title art", "Covers"],
  },
  {
    number: "06",
    title: "Custom Design Support",
    text: "Reliable visual support for marketing teams, creators and brands that need polished design across changing formats.",
    tags: ["Marketing", "Presentations", "Retainers"],
  },
];

export const tools = [
  ["Ps", "Adobe Photoshop", "Compositing · Retouching · Ad creative"],
  ["Ai", "Adobe Illustrator", "Vector art · Icons · Scalable assets"],
  ["Lr", "Adobe Lightroom", "Colour correction · Image finishing"],
  ["Fg", "Figma", "Layout systems · Digital design · Collaboration"],
  ["Ca", "Canva Pro", "Social production · Editable templates"],
  ["Id", "Adobe InDesign", "Catalogues · Brochures · Multi-page"],
  ["Pr", "Premiere Pro", "Social edits · Promotional video"],
  ["Ae", "After Effects", "Motion graphics · Animated assets"],
];
