import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host =
    incomingHeaders.get("x-forwarded-host") ??
    incomingHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    incomingHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og.png`;
  const canonicalUrl = `${protocol}://${host}/`;
  const title = "Smit Patel | Graphic Designer Portfolio";
  const description =
    "Explore the graphic design portfolio of Smit Patel, featuring poster designs, brand identity, social media creatives, campaign visuals, and digital artwork.";

  return {
    title,
    description,
    keywords: [
      "Smit Patel graphic designer",
      "graphic designer portfolio",
      "poster design",
      "brand identity design",
      "social media creatives",
      "campaign design",
      "visual designer",
    ],
    icons: { icon: "/logo.png" },
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: "Explore poster designs, brand identity, social media creatives, campaign visuals, and digital artwork by Smit Patel.",
      type: "website",
      url: canonicalUrl,
      siteName: "Smit Patel Portfolio",
      images: [{ url: ogImage, width: 1733, height: 909, alt: "Smit visual designer portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Poster designs, brand identity, social media creatives, campaign visuals, and digital artwork by Smit Patel.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
