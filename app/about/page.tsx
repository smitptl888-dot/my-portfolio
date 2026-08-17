import type { Metadata } from "next";
import ServicesExperience from "../components/ServicesExperience";

export const metadata: Metadata = {
  title: "About & Services | Smit Patel Graphic Designer",
  description: "Learn about Smit Patel's design focus, graphic design services, software expertise, and AI-assisted creative workflow.",
};

export default function AboutPage() {
  return <ServicesExperience />;
}
