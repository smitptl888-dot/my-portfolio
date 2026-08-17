import type { Metadata } from "next";
import ServicesExperience from "../components/ServicesExperience";

export const metadata: Metadata = {
  title: "Graphic Design Services | Smit Patel",
  description: "Explore Smit Patel's graphic design services, software expertise, AI-assisted creative workflow, and visual design focus.",
};

export default function ServicesPage() {
  return <ServicesExperience />;
}
