export const siteDetails = {
  name: "Smit Patel",
  role: "Graphic Designer",
  email: "smitptl.888@gmail.com",
  phoneDisplay: "+91 76986 41630",
  phoneHref: "+917698641630",
  location: "Available for freelance projects",
  instagramUrl: "https://www.instagram.com/smit8._/",
  portfolioUrl: "https://www.patelsmit.in/",
  whatsappUrl:
    "https://wa.me/917698641630?text=Hi%20Smit%2C%20I%20saw%20your%20graphic%20design%20portfolio%20and%20I%E2%80%99m%20interested%20in%20working%20with%20you.%20I%E2%80%99d%20like%20to%20discuss%20a%20design%20project%20with%20you.",
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  heroImage: string;
  gallery: string[];
  alt: string;
  description: string;
  detailedDescription?: string;
  creativeDirection?: string;
  tools: string[];
  services: string[];
  projectType: string;
  status: "Real project" | "Concept project" | "Unspecified";
  year?: string;
  client?: string;
  brand?: string;
  layout: "wide" | "portrait" | "square";
};

const project = (
  data: Omit<Project, "heroImage" | "gallery" | "projectType" | "status">,
): Project => ({
  ...data,
  heroImage: data.image,
  gallery: [data.image],
  projectType: "Graphic design",
  status: "Unspecified",
});

export const categories = [
  "All",
  "Posters",
  "Branding",
  "Social Media Creatives",
  "Campaign Visuals",
  "Logo/Identity",
  "Typography/Layout",
] as const;

export const projects: Project[] = [
  project({ id: 1, title: "Fashion Banner Direction", slug: "fashion-banner-direction", category: "Posters", image: "/portfolio/fashion-banner-direction.webp", alt: "Smit Patel fashion poster banner design with elegant product-focused layout", description: "Editorial fashion banner with confident spacing, contrast, and clean sale messaging.", tools: ["Photoshop", "Layout", "Print"], services: ["Poster Design", "Print-ready Design"], layout: "wide" }),
  project({ id: 2, title: "Premium Product Banner", slug: "premium-product-banner", category: "Posters", image: "/portfolio/premium-product-banner.webp", alt: "Premium product banner design by Smit Patel", description: "A polished web banner balancing product detail, soft contrast, and brand-led composition.", tools: ["Photoshop", "Layout", "Print"], services: ["Poster Design", "Digital Banner"], layout: "wide" }),
  project({ id: 3, title: "Festive Campaign Banner", slug: "festive-campaign-banner", category: "Posters", image: "/portfolio/festive-campaign-banner.webp", alt: "Festive campaign web banner designed by Smit Patel", description: "Festive retail visual designed for quick scanning and strong digital shelf impact.", tools: ["Photoshop", "Layout", "Print"], services: ["Poster Design", "Campaign Visuals"], layout: "wide" }),
  project({ id: 4, title: "Fresh Style Sale Creative", slug: "fresh-style-sale-creative", category: "Campaign Visuals", image: "/portfolio/fresh-style-sale-creative.webp", alt: "Fresh sale campaign poster design by Smit Patel", description: "Bright offer creative with large visual rhythm and an easy-to-read promotional message.", tools: ["Photoshop", "Ads", "Story"], services: ["Marketing Campaign Visuals", "Digital Ads"], layout: "wide" }),
  project({ id: 5, title: "Textile Campaign Banner", slug: "textile-campaign-banner", category: "Posters", image: "/portfolio/textile-campaign-banner.webp", alt: "Textile promotional poster banner by Smit Patel", description: "Long-format banner layout designed for premium apparel and textile promotion.", tools: ["Photoshop", "Layout", "Print"], services: ["Poster Design", "Print-ready Design"], layout: "wide" }),
  project({ id: 6, title: "Cream Lehenga Poster", slug: "cream-lehenga-poster", category: "Posters", image: "/portfolio/cream-lehenga-poster.webp", alt: "Cream lehenga fashion poster design by Smit Patel", description: "Fashion poster composition with strong product framing and refined negative space.", tools: ["Photoshop", "Layout", "Print"], services: ["Poster Design", "Print-ready Design"], layout: "portrait" }),
  project({ id: 7, title: "Campaign Poster System", slug: "campaign-poster-system", category: "Campaign Visuals", image: "/portfolio/campaign-poster-system.webp", alt: "Marketing campaign poster visual by Smit Patel", description: "High-impact campaign artwork with bold typography, product storytelling, and sharp color.", tools: ["Photoshop", "Ads", "Story"], services: ["Marketing Campaign Visuals", "Digital Ads"], layout: "portrait" }),
  project({ id: 8, title: "Offer Campaign Visual", slug: "offer-campaign-visual", category: "Campaign Visuals", image: "/portfolio/offer-campaign-visual.webp", alt: "Offer campaign poster design by Smit Patel", description: "Offer-led poster design made for fast attention and clear conversion moments.", tools: ["Photoshop", "Ads", "Story"], services: ["Marketing Campaign Visuals", "Digital Ads"], layout: "portrait" }),
  project({ id: 9, title: "Digital Launch Poster", slug: "digital-launch-poster", category: "Campaign Visuals", image: "/portfolio/digital-launch-poster.webp", alt: "Digital launch campaign poster by Smit Patel", description: "Launch artwork with a cinematic visual stack and focused promotional hierarchy.", tools: ["Photoshop", "Ads", "Story"], services: ["Marketing Campaign Visuals", "Digital Ads"], layout: "portrait" }),
  project({ id: 10, title: "Retail Story Creative", slug: "retail-story-creative", category: "Campaign Visuals", image: "/portfolio/retail-story-creative.webp", alt: "Retail campaign poster design by Smit Patel", description: "Retail campaign composition with dramatic scale, layered image treatment, and clear CTA space.", tools: ["Photoshop", "Ads", "Story"], services: ["Marketing Campaign Visuals", "Digital Ads"], layout: "portrait" }),
  project({ id: 11, title: "Digital Ad Concept", slug: "digital-ad-concept", category: "Social Media Creatives", image: "/portfolio/digital-ad-concept.webp", alt: "Vertical digital ad campaign creative by Smit Patel", description: "Social-first digital ad artwork shaped for vertical feeds and brand recall.", tools: ["Canva", "Campaign", "Digital"], services: ["Social Media Creatives", "Digital Ads"], layout: "portrait" }),
  project({ id: 12, title: "Campaign Visual Frame", slug: "campaign-visual-frame", category: "Social Media Creatives", image: "/portfolio/campaign-visual-frame.webp", alt: "Campaign visual frame for social media by Smit Patel", description: "Feed-ready campaign design with focused typography and smooth visual flow.", tools: ["Canva", "Campaign", "Digital"], services: ["Social Media Creatives", "Marketing Campaign Visuals"], layout: "portrait" }),
  project({ id: 13, title: "Beauty Social Creative", slug: "beauty-social-creative", category: "Social Media Creatives", image: "/portfolio/beauty-social-creative.webp", alt: "Beauty social media creative designed by Smit Patel", description: "Vertical social creative built around image-led impact and elegant copy placement.", tools: ["Canva", "Campaign", "Digital"], services: ["Social Media Creatives"], layout: "portrait" }),
  project({ id: 14, title: "Product Social Post", slug: "product-social-post", category: "Social Media Creatives", image: "/portfolio/product-social-post.webp", alt: "Product social media post design by Smit Patel", description: "Clean product post with premium contrast and quick-scroll readability.", tools: ["Canva", "Campaign", "Digital"], services: ["Social Media Creatives", "Digital Ads"], layout: "portrait" }),
  project({ id: 15, title: "Fashion Feed Creative", slug: "fashion-feed-creative", category: "Social Media Creatives", image: "/portfolio/fashion-feed-creative.webp", alt: "Fashion social media creative by Smit Patel", description: "Fashion-focused feed visual with bold portrait framing and modern graphic rhythm.", tools: ["Canva", "Campaign", "Digital"], services: ["Social Media Creatives"], layout: "portrait" }),
  project({ id: 16, title: "Launch Social Poster", slug: "launch-social-poster", category: "Social Media Creatives", image: "/portfolio/launch-social-poster.webp", alt: "Launch social poster design by Smit Patel", description: "Launch-ready social poster with clean hierarchy and polished product emphasis.", tools: ["Canva", "Campaign", "Digital"], services: ["Social Media Creatives", "Marketing Campaign Visuals"], layout: "portrait" }),
  project({ id: 17, title: "Minimal Social Layout", slug: "minimal-social-layout", category: "Social Media Creatives", image: "/portfolio/minimal-social-layout.webp", alt: "Minimal social media layout by Smit Patel", description: "A compact social layout that keeps the message direct, modern, and premium.", tools: ["Canva", "Campaign", "Digital"], services: ["Social Media Creatives"], layout: "portrait" }),
  project({ id: 18, title: "Campaign Social Tile", slug: "campaign-social-tile", category: "Social Media Creatives", image: "/portfolio/campaign-social-tile.webp", alt: "Campaign social media tile design by Smit Patel", description: "Vertical campaign tile made for social browsing with crisp contrast and balanced detail.", tools: ["Canva", "Campaign", "Digital"], services: ["Social Media Creatives", "Marketing Campaign Visuals"], layout: "portrait" }),
  project({ id: 19, title: "Brand A Plus Layout", slug: "brand-a-plus-layout", category: "Branding", image: "/portfolio/brand-a-plus-layout.webp", alt: "Brand identity and A plus layout design by Smit Patel", description: "Brand presentation layout with structured sections, product clarity, and polished spacing.", tools: ["Illustrator", "Identity", "Color"], services: ["Brand Identity", "Typography/Layout"], layout: "wide" }),
  project({ id: 20, title: "Identity Poster Study", slug: "identity-poster-study", category: "Logo/Identity", image: "/portfolio/identity-poster-study.webp", alt: "Logo and identity poster study by Smit Patel", description: "Identity-led visual study focused on tone, typography, and premium brand presence.", tools: ["Illustrator", "Logo", "Brand"], services: ["Logo Design", "Brand Identity"], layout: "portrait" }),
  project({ id: 21, title: "Product Detail Layout", slug: "product-detail-layout", category: "Typography/Layout", image: "/portfolio/product-detail-layout.webp", alt: "Typography and product layout design by Smit Patel", description: "E-commerce content layout with clear feature blocks and visual product education.", tools: ["Figma", "Layout", "UX"], services: ["Typography/Layout", "E-commerce Visuals"], layout: "wide" }),
  project({ id: 22, title: "Listing Design System", slug: "listing-design-system", category: "Typography/Layout", image: "/portfolio/listing-design-system.webp", alt: "E-commerce listing design system by Smit Patel", description: "Product listing graphic system balancing information, scale, and clean comparison flow.", tools: ["Figma", "Layout", "UX"], services: ["Typography/Layout", "E-commerce Visuals"], layout: "wide" }),
  project({ id: 23, title: "E-commerce Visual Story", slug: "ecommerce-visual-story", category: "Typography/Layout", image: "/portfolio/ecommerce-visual-story.webp", alt: "E-commerce visual story layout designed by Smit Patel", description: "Product storytelling layout with layered benefits and polished shopping-page structure.", tools: ["Figma", "Layout", "UX"], services: ["Typography/Layout", "E-commerce Visuals"], layout: "wide" }),
  project({ id: 24, title: "Product Graphic Panel", slug: "product-graphic-panel", category: "Typography/Layout", image: "/portfolio/product-graphic-panel.webp", alt: "Product graphic layout panel by Smit Patel", description: "Clean product panel layout built for digital commerce and easy mobile scanning.", tools: ["Figma", "Layout", "UX"], services: ["Typography/Layout", "E-commerce Visuals"], layout: "wide" }),
];

export const services = [
  ["01", "Poster Design", "Bold posters with sharp hierarchy."],
  ["02", "AI-Assisted Visuals", "Visual exploration, concepts, and creative variations."],
  ["03", "Social Media Creatives", "Posts, stories, and launch visuals."],
  ["04", "Brand Identity", "Color, type, and visual direction."],
  ["05", "Logo Design", "Clean marks and identity ideas."],
  ["06", "Marketing Campaign Visuals", "Offer graphics built to stand out."],
  ["07", "Event Posters", "Event visuals with strong impact."],
  ["08", "Digital Ads", "Static ads for digital channels."],
  ["09", "Print-ready Designs", "Clean files for screen and print."],
] as const;

export const toolkit = [
  ["Ps", "Adobe Photoshop", "Image editing and campaign artwork", "https://api.iconify.design/logos:adobe-photoshop.svg", "#31a8ff"],
  ["Ai", "Adobe Illustrator", "Vector graphics and identity systems", "https://api.iconify.design/logos:adobe-illustrator.svg", "#ff9a00"],
  ["Lr", "Adobe Lightroom", "Color refinement and photo finishing", "https://api.iconify.design/logos:adobe-lightroom.svg", "#31a8ff"],
  ["Fi", "Figma", "Layouts and collaborative visual systems", "https://api.iconify.design/logos:figma.svg", "#f24e1e"],
  ["C", "Canva Pro", "Fast, consistent social variations", "https://api.iconify.design/logos:canva-icon.svg", "#00c4cc"],
  ["Id", "Adobe InDesign", "Editorial and print-ready layouts", "https://api.iconify.design/logos:adobe-indesign.svg", "#ff3366"],
  ["Pr", "Adobe Premiere Pro", "Video edits and motion sequences", "https://api.iconify.design/logos:adobe-premiere.svg", "#9999ff"],
  ["Ae", "After Effects", "Motion graphics and animated details", "https://api.iconify.design/logos:adobe-after-effects.svg", "#9999ff"],
  ["Wp", "WordPress", "Visual website publishing", "https://api.iconify.design/logos:wordpress-icon.svg", "#21759b"],
  ["Fl", "Filmora", "Fast video edits and exports", "https://api.iconify.design/simple-icons:wondersharefilmora.svg?color=%2300e4d4", "#00e4d4"],
] as const;

export const visualSkills = [
  "Poster Design",
  "Branding",
  "Social Media",
  "Typography",
  "Layout Design",
  "Color Theory",
  "AI-Assisted Exploration",
] as const;

export const aiCreativeCapabilities = [
  "Creative exploration",
  "Image generation",
  "Visual concepts",
  "Campaign ideation",
  "Product visuals",
  "Creative variations",
] as const;

export const process = [
  ["01", "Discover", "Goal, audience, and references."],
  ["02", "Concept", "Layout, color, type, and mood."],
  ["03", "Design", "Polished visuals with clear hierarchy."],
  ["04", "Deliver", "Ready files for web, social, and print."],
] as const;
