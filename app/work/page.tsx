import type { Metadata } from "next";
import WorkPortfolio from "./WorkPortfolio";

export const metadata: Metadata = {
  title: "Selected Work | Smit Patel Graphic Designer",
  description: "Explore selected posters, brand visuals, social media creatives, campaign artwork, and layout design by Smit Patel.",
};

export default function WorkPage() {
  return <WorkPortfolio />;
}
