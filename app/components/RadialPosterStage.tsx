"use client";

/* eslint-disable @next/next/no-img-element -- Optional poster sources are user-replaceable public assets. */

import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

type OpeningPoster = {
  id: string;
  label: string;
  image: string;
  alt: string;
};

// Artwork stays data-only so each creative can be replaced without touching the
// trailing interaction or its motion system.
const openingPosters: OpeningPoster[] = [
  { id: "poster-01", label: "Kidswear sale", image: "/portfolio/radial-creative-01.jpg", alt: "Black Friday kidswear sale creative" },
  { id: "poster-02", label: "Lifestyle offer", image: "/portfolio/radial-creative-02.jpg", alt: "Vibrant lifestyle socks promotion creative" },
  { id: "poster-03", label: "Industrial campaign", image: "/portfolio/radial-creative-03.jpg", alt: "Industrial brand trust campaign creative" },
  { id: "poster-04", label: "Fashion sale", image: "/portfolio/radial-creative-04.jpg", alt: "Fashion flash sale creative" },
  { id: "poster-05", label: "Black Friday", image: "/portfolio/radial-creative-05.jpg", alt: "Black Friday socks offer creative" },
  { id: "poster-06", label: "Saree launch", image: "/portfolio/radial-creative-06.jpg", alt: "New saree collection launch creative" },
  { id: "poster-07", label: "Food launch", image: "/portfolio/radial-creative-07.jpg", alt: "Spicy food launch campaign creative" },
  { id: "poster-08", label: "Footwear offer", image: "/portfolio/radial-creative-08.jpg", alt: "Footwear discount campaign creative" },
  { id: "poster-09", label: "Nightwear campaign", image: "/portfolio/radial-creative-09.jpg", alt: "Children's bamboo nightwear campaign creative" },
  { id: "poster-10", label: "Saree offer", image: "/portfolio/radial-creative-10.jpg", alt: "Traditional saree offer campaign creative" },
  { id: "poster-11", label: "Kidswear collection", image: "/portfolio/radial-creative-11.jpg", alt: "Gender-neutral children's nightwear collection creative" },
  { id: "poster-12", label: "Restaurant reviews", image: "/portfolio/radial-creative-12.jpg", alt: "Restaurant customer reviews campaign creative" },
  { id: "poster-13", label: "Fashion mood", image: "/portfolio/radial-creative-13.jpg", alt: "Playful fashion mood campaign creative" },
  { id: "poster-14", label: "Tea campaign", image: "/portfolio/radial-creative-14.jpg", alt: "Premium tea refresh campaign creative" },
  { id: "poster-15", label: "Fashion sale", image: "/portfolio/radial-creative-15.jpg", alt: "End-of-season fashion sale creative" },
  { id: "poster-16", label: "Apparel launch", image: "/portfolio/radial-creative-16.jpg", alt: "Children's apparel launch campaign creative" },
];

const leaderPosterId = "poster-15";
const orderedOpeningPosters = [
  openingPosters.find((poster) => poster.id === leaderPosterId)!,
  ...openingPosters.filter((poster) => poster.id !== leaderPosterId),
];

type DragState = {
  active: boolean;
  pointerId: number;
  x: number;
  y: number;
  time: number;
  velocity: number;
};

export default function RadialPosterStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(-0.55);
  const reducedMotionRef = useRef(false);
  const dragRef = useRef<DragState>({ active: false, pointerId: -1, x: 0, y: 0, time: 0, velocity: 0 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(stage.querySelectorAll<HTMLElement>("[data-radial-card]"));
    cards.forEach((card) => {
      card.style.opacity = "";
      card.style.filter = "";
    });
    let frame = 0;
    let previous = performance.now();
    let stageVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => { stageVisible = entry.isIntersecting; }, { threshold: 0 });
    visibilityObserver.observe(stage);

    const render = (now: number) => {
      const elapsed = Math.min(now - previous, 34);
      previous = now;
      const drag = dragRef.current;

      if (!stageVisible || document.hidden) {
        frame = requestAnimationFrame(render);
        return;
      }

      if (!drag.active && !reducedMotionRef.current) {
        if (Math.abs(drag.velocity) > 0.000025) {
          rotationRef.current += drag.velocity * elapsed;
          drag.velocity *= Math.pow(0.952, elapsed / 16.67);
        } else {
          rotationRef.current += 0.00024 * elapsed;
        }
      }

      // Keep every card on one compact, connected loop. The full-turn spacing
      // is derived from the artwork count so adding or replacing creatives does
      // not break the composition.
      const radiusX = stage.clientWidth * 0.205;
      const radiusY = stage.clientHeight * 0.225;
      const loopGap = (Math.PI * 2) / cards.length;

      cards.forEach((card, index) => {
        const angle = rotationRef.current - index * loopGap;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;
        const scale = index === 0 ? 1.075 : 1.025 - index * 0.0055;
        const opacity = index === 0 ? 1 : 0.98 - index * 0.0075;

        // Layering is deliberately stable: the End of Season Sale creative is
        // always the leader, and every following card keeps its place behind it.
        card.style.zIndex = String(300 - index);
        card.style.opacity = String(opacity);
        card.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
      });

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => {
      visibilityObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
      velocity: dragRef.current.velocity,
    };
    event.currentTarget.dataset.dragging = "true";
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const stage = event.currentTarget;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--radial-pointer-x", `${(event.clientX - rect.left) / rect.width - 0.5}`);
    stage.style.setProperty("--radial-pointer-y", `${(event.clientY - rect.top) / rect.height - 0.5}`);

    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    const now = performance.now();
    const elapsed = Math.max(now - drag.time, 8);
    const delta = (event.clientX - drag.x) * 0.006 + (event.clientY - drag.y) * 0.002;
    rotationRef.current += delta;
    drag.velocity = delta / elapsed;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.time = now;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;
    if (performance.now() - drag.time > 80) drag.velocity *= 0.25;
    drag.velocity = Math.max(-0.012, Math.min(0.012, drag.velocity));
    drag.active = false;
    drag.pointerId = -1;
    delete event.currentTarget.dataset.dragging;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function rotateWithKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    rotationRef.current += event.key === "ArrowLeft" ? -0.22 : 0.22;
    dragRef.current.velocity = 0;
  }

  return (
    <div
      ref={stageRef}
      className="radial-poster-stage"
      role="slider"
      aria-label="Interactive creative trail. Drag, swipe, or use the left and right arrow keys to move the artwork."
      aria-valuemin={-180}
      aria-valuemax={180}
      aria-valuenow={0}
      tabIndex={0}
      onKeyDown={rotateWithKeyboard}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {orderedOpeningPosters.map((poster, index) => (
        <figure
          className="radial-poster"
          data-radial-card
          data-radial-leader={poster.id === leaderPosterId ? "true" : undefined}
          key={poster.id}
          style={{
            "--poster-delay": `${0.86 + index * 0.08}s`,
          } as CSSProperties}
        >
          <div className="radial-poster-visual">
            <img
              src={poster.image}
              alt={poster.alt}
              draggable={false}
              decoding="async"
              loading={index < 4 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "auto"}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
