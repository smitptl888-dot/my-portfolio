"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import StudioHeader from "../components/StudioHeader";

const cards = [
  { id: "01", tone: "#6f68bd" },
  { id: "02", tone: "#bd82aa" },
  { id: "03", tone: "#b9d8d1" },
  { id: "04", tone: "#e8e7e3" },
  { id: "05", tone: "#e9ad18" },
  { id: "06", tone: "#3542ae" },
  { id: "07", tone: "#8e85b1" },
] as const;

const controlPoints = [
  { x: -68, y: -245, s: 0.54, o: 0.70, r: -1.8 },
  { x: -118, y: -176, s: 0.66, o: 0.82, r: -1.2 },
  { x: -105, y: -96, s: 0.79, o: 0.91, r: -0.6 },
  { x: -44, y: -16, s: 1.02, o: 1.00, r: 0.1 },
  { x: 70, y: 62, s: 0.95, o: 1.00, r: 0.7 },
  { x: 110, y: 150, s: 0.73, o: 0.88, r: 1.25 },
  { x: 82, y: 235, s: 0.57, o: 0.73, r: 1.8 },
] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const mod = (value: number, total: number) =>
  ((value % total) + total) % total;

const catmull = (p0: number, p1: number, p2: number, p3: number, t: number) => {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    ((2 * p1) +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
};

const sampleLoop = (progress: number) => {
  const count = controlPoints.length;
  const scaled = mod(progress, 1) * count;
  const index = Math.floor(scaled);
  const t = scaled - index;

  const p0 = controlPoints[mod(index - 1, count)];
  const p1 = controlPoints[index];
  const p2 = controlPoints[mod(index + 1, count)];
  const p3 = controlPoints[mod(index + 2, count)];

  return {
    x: catmull(p0.x, p1.x, p2.x, p3.x, t),
    y: catmull(p0.y, p1.y, p2.y, p3.y, t),
    s: catmull(p0.s, p1.s, p2.s, p3.s, t),
    o: catmull(p0.o, p1.o, p2.o, p3.o, t),
    r: catmull(p0.r, p1.r, p2.r, p3.r, t),
  };
};

export default function WorkPortfolio() {
  const heroRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const stage = hero.querySelector<HTMLElement>("[data-reference-stage]");
    const cardElements = Array.from(
      stage?.querySelectorAll<HTMLElement>("[data-reference-card]") ?? [],
    );

    if (!stage || !cardElements.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let lastTime = performance.now();
    let phase = 0;
    let wheelVelocity = 0.000052;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointerX = clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
      pointerY = clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const onWheel = (event: WheelEvent) => {
      if (reducedMotion) return;
      const impulse = clamp(event.deltaY, -180, 180) * 0.0000035;
      wheelVelocity = clamp(wheelVelocity + impulse, -0.00052, 0.00052);
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("wheel", onWheel, { passive: true });

    const render = (now: number) => {
      const dt = Math.min(now - lastTime, 40);
      lastTime = now;

      if (!reducedMotion) {
        phase = mod(phase + wheelVelocity * dt, 1);
        wheelVelocity += (0.000052 - wheelVelocity) * 0.016;
      }

      const swayX = reducedMotion ? 0 : Math.sin(now / 2750) * 7 + pointerX * 13;
      const swayY = reducedMotion ? 0 : Math.sin(now / 3700 + 0.7) * 4 + pointerY * 7;

      stage.style.transform =
        `translate3d(calc(-50% + ${swayX}px), calc(-50% + ${swayY}px), 0)`;

      let frontIndex = 0;
      let frontScale = -1;

      cardElements.forEach((card, index) => {
        const progress = mod(phase + index / cardElements.length, 1);
        const point = sampleLoop(progress);

        const scale = clamp(point.s, 0.5, 1.035);
        const opacity = clamp(point.o, 0.56, 1);

        card.style.opacity = String(opacity);
        card.style.zIndex = String(160 + Math.round(scale * 250));
        card.style.transform =
          `translate3d(calc(-50% + ${point.x}px), calc(-50% + ${point.y}px), 0) ` +
          `scale(${scale}) rotate(${point.r}deg)`;

        if (scale > frontScale) {
          frontScale = scale;
          frontIndex = index;
        }
      });

      cardElements.forEach((card, index) => {
        card.classList.toggle("is-front", index === frontIndex);
        card.style.pointerEvents = "auto";
      });

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);

    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const contact = contactRef.current;
    if (!contact) return;

    const onMove = (event: PointerEvent) => {
      const rect = contact.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      contact.style.setProperty("--contact-x", `${x * 10}px`);
      contact.style.setProperty("--contact-y", `${y * 7}px`);
    };

    const onLeave = () => {
      contact.style.setProperty("--contact-x", "0px");
      contact.style.setProperty("--contact-y", "0px");
    };

    contact.addEventListener("pointermove", onMove);
    contact.addEventListener("pointerleave", onLeave);

    return () => {
      contact.removeEventListener("pointermove", onMove);
      contact.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const moveView = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 35, rect.width - 35);
    const y = clamp(event.clientY - rect.top, 35, rect.height - 35);

    event.currentTarget.style.setProperty("--view-x", `${x}px`);
    event.currentTarget.style.setProperty("--view-y", `${y}px`);
    event.currentTarget.style.setProperty(
      "--hover-x",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 7}px`,
    );
    event.currentTarget.style.setProperty(
      "--hover-y",
      `${((event.clientY - rect.top) / rect.height - 0.5) * 5}px`,
    );
  };

  return (
    <main className="mondragon-portfolio work-page work-video-match-v8">
      <StudioHeader current="work" />

      <section ref={heroRef} className="work-video-match-hero">
        <span className="corner-marks" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>

        <div
          className="work-video-match-stage"
          data-reference-stage
          aria-label="Animated selected work cards"
        >
          {cards.map((card) => (
            <article
              key={card.id}
              className="work-video-match-card"
              data-reference-card
              onPointerMove={moveView}
              style={
                {
                  "--card-tone": card.tone,
                  "--view-x": "50%",
                  "--view-y": "50%",
                  "--hover-x": "0px",
                  "--hover-y": "0px",
                } as CSSProperties
              }
            >
              <div className="work-video-match-art work-video-blank-art" />
              <span className="work-video-match-view">View</span>
            </article>
          ))}
        </div>

        <div className="work-video-match-footer work-video-blank-footer">
          <span>Move cursor / use wheel</span>
          <span />
          <a href="#lets-contact">Contact Smit ↗</a>
        </div>
      </section>

      <section ref={contactRef} id="lets-contact" className="work-video-contact">
        <div className="work-video-contact-wall" aria-hidden="true">
          {Array.from({ length: 84 }).map((_, index) => (
            <span
              key={index}
              className={`contact-style-${index % 5}`}
              style={
                {
                  "--contact-delay": `${-(index % 15) * 0.27}s`,
                  "--contact-speed": `${4 + (index % 7) * 0.4}s`,
                  "--contact-tilt": `${((index * 11) % 13) - 6}deg`,
                } as CSSProperties
              }
            >
              LET&apos;S CONTACT
            </span>
          ))}
        </div>

        <div className="work-video-contact-main">
          <a href="/contact" className="work-video-contact-title">
            <h2 data-text="LET'S CONTACT!">LET&apos;S CONTACT!</h2>
            <i aria-hidden="true" />
          </a>

          <a className="work-video-contact-card" href="/contact">
            <span className="work-video-speech">
              Hi!<br />I&apos;m Smit.
            </span>
            <span className="work-video-avatar">SP</span>
            <strong>
              Let&apos;s talk
              <small>with Smit Patel</small>
            </strong>
            <i>↗</i>
          </a>
        </div>

        <div className="work-video-signature" aria-label="Smit Patel">
          <span>S</span><i /><span>P</span>
          <small>SMIT PATEL · GRAPHIC DESIGNER</small>
        </div>
      </section>
    </main>
  );
}
