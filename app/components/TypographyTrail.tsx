"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useMotion } from "./MotionProvider";
const disciplines = [
  ["Posters", "POSTER\nDESIGN", "01"], ["Branding", "BRAND\nIDENTITY", "02"],
  ["Social Media Creatives", "SOCIAL\nCREATIVES", "03"], ["Campaign Visuals", "CAMPAIGN\nVISUALS", "04"],
  ["Logo/Identity", "LOGO &\nIDENTITY", "05"], ["Typography/Layout", "TYPE\n& LAYOUT", "06"],
] as const;
const artwork = ["01-poster-design", "02-brand-identity", "03-social-creatives", "04-campaign-visuals", "05-logo-identity", "06-type-layout"];
// Separate trail and highlight transforms keep the sequence moving on hover.
export default function RadialPosterStage() {
  const root = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const time = useRef(0);
  const [selected, setSelected] = useState<number | null>(null);
  const touch = useRef(false);
  const { paused } = useMotion();
  useEffect(() => {
    const stage = root.current;
    if (!stage) return;
    const cards = [...stage.querySelectorAll<HTMLElement>("[data-trail-card]")];
    let width = stage.clientWidth, height = stage.clientHeight, visible = true, frame = 0;
    let previous = performance.now();
    const smooth = { x: 0, y: 0 };
    function draw(now: number) {
      const elapsed = Math.min(now - previous, 40);
      previous = now;
      if (visible && !document.hidden) {
        if (!paused) time.current += elapsed * 0.00026;
        smooth.x += ((paused ? 0 : pointer.current.x) - smooth.x) * 0.045;
        smooth.y += ((paused ? 0 : pointer.current.y) - smooth.y) * 0.045;
        cards.forEach((card, i) => {
          const phase = time.current - i * 0.47;
          const radius = Math.min(width * 0.225, (width - card.offsetWidth * 1.3) / 2);
          const x = Math.sin(phase) * radius + smooth.x * (1 - i * 0.08);
          const y = Math.sin(phase * 2) * height * 0.16 + (i - 2.5) * 9 + smooth.y * (1 - i * 0.08);
          card.style.transform = `translate(${x}px, ${y}px) rotate(${Math.cos(phase) * 8}deg)`;
        });
      }
      if (!paused) frame = requestAnimationFrame(draw);
    }
    const size = new ResizeObserver(() => { width = stage.clientWidth; height = stage.clientHeight; if (paused) draw(performance.now()); });
    const view = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    size.observe(stage); view.observe(stage); draw(performance.now());
    return () => { cancelAnimationFrame(frame); size.disconnect(); view.disconnect(); };
  }, [paused]);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: (event.clientX - bounds.left - bounds.width / 2) * 0.08, y: (event.clientY - bounds.top - bounds.height / 2) * 0.07 };
  }
  return <div ref={root} className="sub-creative-trail" aria-label="Explore design disciplines" onPointerMove={move} onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}>
    {disciplines.map(([category, title, number], i) => <div className={`sub-trail-card sub-trail-color-${i % 3}${selected === i ? " is-selected" : ""}`} data-trail-card key={category} style={{ "--order": 6 - i, "--start": `${i * 8 - 20}px` } as CSSProperties}>
      <a href={`/work?category=${encodeURIComponent(category)}#project-index`} aria-label={`Explore ${category}`} onPointerDown={event => { touch.current = event.pointerType !== "mouse"; }} onClick={event => { if (touch.current && selected !== i) { event.preventDefault(); setSelected(i); } }} onBlur={() => setSelected(null)}>
        {/* Approved concept artwork, kept separate from existing client projects. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/portfolio/work-concepts/${artwork[i]}.jpg`} alt={`${title.replace("\n", " ")} — Smit Patel concept study ${number}`} width={810} height={1080} decoding="async" fetchPriority={i === 0 ? "high" : "auto"} draggable={false} />
        <span className="sub-poster-caption">{category}<b>{number} ↗</b></span>
      </a>
    </div>)}
  </div>;
}
