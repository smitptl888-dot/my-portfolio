"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteDetails } from "../portfolio-data";

type StudioHeaderProps = {
  current?: "home" | "services" | "work" | "contact";
};

const navigation = [
  ["home", "Home", "/"],
  ["services", "Services", "/services"],
  ["work", "Work", "/work"],
  ["contact", "Contact", "/contact"],
] as const;

export default function StudioHeader({ current }: StudioHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    const sampleSurface = () => {
      frame = 0;
      if (menuOpen) {
        header.dataset.surface = "light";
        return;
      }

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
  }, [menuOpen]);

  return (
    <>
      <header ref={headerRef} className="studio-header" data-surface="dark">
        <Link className="studio-mark" href="/" onClick={() => setMenuOpen(false)} aria-label="Smit Patel portfolio home"><span>S</span><i /><span>P</span></Link>
        <nav className="studio-nav" aria-label="Primary navigation">
          {navigation.map(([id, label, href]) => <Link key={id} href={href} aria-current={current === id ? "page" : undefined}>{label}</Link>)}
        </nav>
        <button className="studio-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="studio-mobile-menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "Close" : "Menu"}</button>
      </header>

      <div id="studio-mobile-menu" className={`studio-mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <p>Smit Patel / Visual Designer</p>
        <nav aria-label="Mobile navigation">
          {navigation.map(([id, label, href], index) => (
            <Link key={id} href={href} aria-current={current === id ? "page" : undefined} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}><span>0{index + 1}</span>{label}<i aria-hidden="true">↗</i></Link>
          ))}
        </nav>
        <div><a href={siteDetails.instagramUrl} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>Instagram ↗</a><a href={`mailto:${siteDetails.email}`} tabIndex={menuOpen ? 0 : -1}>Email ↗</a></div>
      </div>
    </>
  );
}
