"use client";


import { useEffect, useRef } from "react";
import MobileMenu from "./MobileMenu";

type StudioHeaderProps = {
  current?: "home" | "services" | "work" | "contact";
};

const navigation = [
  ["home", "Home", "/"],
  ["work", "Work", "/work"],
  ["services", "Services", "/services"],
  ["about", "About", "/about"],
  ["contact", "Contact", "/contact"],
] as const;

export default function StudioHeader({ current }: StudioHeaderProps) {

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    const sampleSurface = () => {
      frame = 0;

      const sampleX = window.innerWidth > 1050 ? window.innerWidth - 175 : window.innerWidth - 54;
      const elements = document.elementsFromPoint(sampleX, Math.min(52, window.innerHeight - 1));
      const surfaceElement = elements.find((element) => !header.contains(element) && !element.closest(".studio-mobile-menu"));
      let node: Element | null = surfaceElement ?? document.body;
      let background = "";

      while (node) {
        const candidate = window.getComputedStyle(node).backgroundColor;
        if (candidate && candidate !== "transparent" && candidate !== "rgba(0, 0, 0, 0)") {
          background = candidate;
          break;
        }
        node = node.parentElement;
      }

      const channels = background.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [17, 17, 17];
      const luminance = (channels[0] * 299 + channels[1] * 587 + channels[2] * 114) / 1000;
      header.dataset.surface = luminance > 150 ? "light" : "dark";
    };
    const requestSample = () => {
      if (!frame) frame = requestAnimationFrame(sampleSurface);
    };

    sampleSurface();
    window.addEventListener("scroll", requestSample, { passive: true });
    window.addEventListener("resize", requestSample);
    return () => {
      window.removeEventListener("scroll", requestSample);
      window.removeEventListener("resize", requestSample);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className="studio-header" data-surface="dark">
        <a className="studio-mark" href="/" aria-label="Smit Patel portfolio home"><span>S</span><i /><span>P</span></a>
        <nav className="studio-nav" aria-label="Primary navigation">
          {navigation.map(([id, label, href]) => <a key={id} href={href} aria-current={current === id ? "page" : undefined}>{label}</a>)}
        </nav>
        <MobileMenu current={current} />
      </header>

    </>
  );
}
