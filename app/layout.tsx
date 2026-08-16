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
  const title = "Smit — Graphic Designer & Visual Creative";
  const description =
    "Independent graphic designer creating Meta ads, product listing images, social media campaigns, banners and thumbnails.";

  return {
    title,
    description,
    icons: { icon: "/favicon.svg" },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: ogImage, width: 1733, height: 909, alt: "Smit visual designer portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
