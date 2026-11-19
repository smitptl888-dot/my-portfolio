import { projects, type Project } from "./portfolio-data";

export type GalleryArtwork = { src: string; title: string; provenance: "Supplied artwork"; brand?: string };
export type GalleryProject = Project & { artworks: GalleryArtwork[]; collectionNote: string };
const supplied = (file: string, title: string, brand?: string): GalleryArtwork => ({ src: `/portfolio/${file}`, title, provenance: "Supplied artwork", brand });

const fashion = [
  supplied("fashion-banner-direction.webp", "Three-colour apparel banner"),
  supplied("premium-product-banner.webp", "Resort edit — collection banner"),
  supplied("festive-campaign-banner.webp", "Half-saree collection banner"),
  supplied("fresh-style-sale-creative.webp", "Fresh style retail campaign"),
  supplied("textile-campaign-banner.webp", "Occasionwear campaign banner"),
  supplied("cream-lehenga-poster.webp", "Saree new-arrival poster"),
  supplied("fashion-feed-creative.webp", "Fashion collection social creative"),
  supplied("campaign-social-tile.webp", "Saree offer creative"),
  supplied("launch-social-poster.webp", "Fashion launch campaign"),
  supplied("radial-creative-06.jpg", "Newly launched saree collection"),
  supplied("radial-creative-13.jpg", "Expressive fashion editorial"),
  supplied("radial-creative-15.jpg", "End-of-season fashion creative"),
  supplied("radial-creative-16.jpg", "Collection launch typography"),
];
const cocoon = [
  supplied("campaign-poster-system.webp", "Black Friday childrenswear creative", "Cocoon Care"),
  supplied("digital-launch-poster.webp", "Black Friday collection story", "Cocoon Care"),
  supplied("offer-campaign-visual.webp", "Promotional social campaign", "Cocoon Care"),
  supplied("retail-story-creative.webp", "Bamboo nightwear creative", "Cocoon Care"),
  supplied("brand-a-plus-layout.webp", "Material and brand information panel", "Cocoon Care"),
  supplied("product-detail-layout.webp", "Collection product display", "Cocoon Care"),
  supplied("listing-design-system.webp", "Childrenswear lifestyle module", "Cocoon Care"),
  supplied("ecommerce-visual-story.webp", "Product range banner", "Cocoon Care"),
  supplied("product-graphic-panel.webp", "Product comparison panel", "Cocoon Care"),
  supplied("radial-creative-11.jpg", "Every little dreamer collection", "Cocoon Care"),
];
const aplus = cocoon.slice(4, 9);
const food = [
  supplied("beauty-social-creative.webp", "Indian food menu campaign", "Royal Spice"),
  supplied("minimal-social-layout.webp", "Food customer-review creative"),
  supplied("radial-creative-07.jpg", "Food launch teaser"),
];
const industrial = [
  supplied("campaign-visual-frame.webp", "Industrial brand story", "SKF"),
  supplied("digital-ad-concept.webp", "Industrial delivery campaign", "SKF"),
];
const footwear = [
  supplied("product-social-post.webp", "Sneaker promotional creative", "Metro"),
];
const identity = [
  supplied("identity-poster-study.webp", "Supplied Cocoon Care brand mark", "Cocoon Care"),
];

const collections: Record<number, { title?: string; description?: string; pool: GalleryArtwork[] }> = {
  1: { pool: fashion }, 2: { pool: fashion }, 3: { pool: fashion }, 4: { pool: fashion }, 5: { pool: fashion },
  6: { title: "Saree Launch Posters", description: "New-arrival saree posters and related apparel campaign directions.", pool: fashion },
  7: { title: "Cocoon Care Campaign Creatives", pool: cocoon },
  8: { title: "Cocoon Care Offer Campaigns", pool: cocoon },
  9: { title: "Cocoon Care Collection Campaigns", pool: cocoon },
  10: { title: "Cocoon Care Product Stories", pool: cocoon },
  11: { title: "Industrial Digital Ads", description: "Industrial advertising and delivery campaign visuals.", pool: industrial },
  12: { title: "Industrial Campaign Systems", description: "Industrial messaging and visual direction across advertising artwork.", pool: industrial },
  13: { title: "Food & Hospitality Creatives", description: "Food campaign visuals and launch artwork.", pool: food },
  14: { title: "Footwear Social Creatives", description: "Product-led sneaker advertising.", pool: footwear },
  15: { pool: fashion }, 16: { pool: fashion },
  17: { title: "Food Campaign Stories", description: "Food storytelling and social campaign artwork.", pool: food },
  18: { title: "Fashion Social Campaigns", pool: fashion },
  19: { title: "Cocoon Care A+ & Brand Content", description: "Cocoon Care product and brand content panels.", pool: aplus },
  20: { title: "Logo & Identity Studies", description: "The supplied Cocoon Care brand mark.", pool: identity },
  21: { title: "Product Detail Modules", pool: aplus },
  22: { title: "E-commerce Listing Systems", pool: aplus },
  23: { title: "E-commerce Visual Stories", pool: aplus },
  24: { title: "Product Comparison & Information", pool: aplus },
};

export const workProjects: GalleryProject[] = projects.map(project => {
  const entry = collections[project.id];
  const original = entry.pool.find(item => item.src === project.image);
  const artworks = original ? [original, ...entry.pool.filter(item => item !== original)] : [...entry.pool];
  return { ...project, title: entry.title ?? project.title, description: entry.description ?? project.description,
    image: artworks[0].src, heroImage: artworks[0].src, alt: artworks[0].title,
    gallery: artworks.map(item => item.src), artworks,
    projectType: "Curated design collection",
    collectionNote: "Related artwork is grouped by design discipline and may appear in more than one collection.",
  };
});
