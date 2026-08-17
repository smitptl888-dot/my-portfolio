"use client";

/* eslint-disable @next/next/no-img-element -- Product marks are loaded from the established Iconify logo sources. */

import { useEffect, useRef, type CSSProperties } from "react";
import { toolkit } from "../portfolio-data";

export default function SoftwareTube() {
  const tubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tube = tubeRef.current;
    if (!tube) return;

    const rows = Array.from(tube.querySelectorAll<HTMLElement>("[data-software-tube-item]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let height = tube.clientHeight;
    let visible = true;
    let frame = 0;
    let last = performance.now();
    let offset = 0;
    let dragging = false;
    let activePointer = -1;
    let lastPointerY = 0;
    let lastPointerTime = 0;
    let velocity = 0;
    let announcedTool = 1;

    const dimensions = () => {
      const spacing = height < 520 ? 92 : 118;
      return { spacing, cycle: spacing * rows.length };
    };

    const wrapOffset = (value: number, cycle: number) => ((value % cycle) + cycle) % cycle;
    const clampVelocity = (value: number) => Math.max(-1.25, Math.min(1.25, value));

    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      dragging = true;
      activePointer = event.pointerId;
      lastPointerY = event.clientY;
      lastPointerTime = performance.now();
      velocity = 0;
      tube.setPointerCapture(event.pointerId);
      tube.dataset.dragging = "true";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== activePointer) return;
      const now = performance.now();
      const elapsed = Math.max(now - lastPointerTime, 8);
      const delta = event.clientY - lastPointerY;
      const { cycle } = dimensions();
      offset = wrapOffset(offset - delta, cycle);
      velocity = clampVelocity(-delta / elapsed);
      lastPointerY = event.clientY;
      lastPointerTime = now;
    };

    const finishPointer = (event: PointerEvent) => {
      if (event.pointerId !== activePointer) return;
      dragging = false;
      activePointer = -1;
      if (tube.hasPointerCapture(event.pointerId)) tube.releasePointerCapture(event.pointerId);
      delete tube.dataset.dragging;
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const { cycle } = dimensions();
      offset = wrapOffset(offset + event.deltaY * 0.55, cycle);
      velocity = clampVelocity(event.deltaY * 0.018);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
      event.preventDefault();
      const { spacing, cycle } = dimensions();
      offset = event.key === "Home"
        ? 0
        : wrapOffset(offset + (event.key === "ArrowDown" ? spacing : -spacing), cycle);
      velocity = 0;
    };

    const resizeObserver = new ResizeObserver(() => { height = tube.clientHeight; });
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    resizeObserver.observe(tube);
    visibilityObserver.observe(tube);
    tube.addEventListener("pointerdown", handlePointerDown);
    tube.addEventListener("pointermove", handlePointerMove);
    tube.addEventListener("pointerup", finishPointer);
    tube.addEventListener("pointercancel", finishPointer);
    tube.addEventListener("wheel", handleWheel, { passive: false });
    tube.addEventListener("keydown", handleKeyDown);

    const removeInteractionListeners = () => {
      tube.removeEventListener("pointerdown", handlePointerDown);
      tube.removeEventListener("pointermove", handlePointerMove);
      tube.removeEventListener("pointerup", finishPointer);
      tube.removeEventListener("pointercancel", finishPointer);
      tube.removeEventListener("wheel", handleWheel);
      tube.removeEventListener("keydown", handleKeyDown);
    };

    if (reducedMotion) {
      rows.forEach((row) => row.style.removeProperty("transform"));
      return () => {
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        removeInteractionListeners();
      };
    }

    const render = (now: number) => {
      const elapsed = Math.min(now - last, 40);
      last = now;

      if (visible && !document.hidden) {
        const { spacing, cycle } = dimensions();
        if (!dragging) {
          offset = wrapOffset(offset + elapsed * (0.043 + velocity), cycle);
          velocity *= Math.pow(0.925, elapsed / 16.67);
          if (Math.abs(velocity) < 0.001) velocity = 0;
        }

        const activeTool = (Math.round(offset / spacing) % rows.length) + 1;
        if (activeTool !== announcedTool) {
          announcedTool = activeTool;
          tube.setAttribute("aria-valuenow", String(activeTool));
        }

        rows.forEach((row, index) => {
          const loopPosition = (index * spacing - offset + cycle) % cycle;
          const y = loopPosition - spacing;
          const centerDistance = (y + spacing * 0.5 - height * 0.5) / (height * 0.5);
          const depth = Math.max(0, 1 - Math.abs(centerDistance));
          const scale = 0.76 + depth * 0.24;
          const rotateX = centerDistance * -20;

          row.style.zIndex = String(Math.round(depth * 100));
          row.style.opacity = String(0.2 + depth * 0.8);
          row.style.filter = `blur(${Math.max(0, Math.abs(centerDistance) - 0.68) * 4}px)`;
          row.style.transform = `translate3d(0, ${y}px, ${depth * 90}px) scale(${scale}) rotateX(${rotateX}deg)`;
        });
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      removeInteractionListeners();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="software-tube"
      ref={tubeRef}
      aria-label="Software expertise. Drag, swipe, scroll, or use arrow keys to explore the tools."
      aria-controls="software-tube-list"
      aria-orientation="vertical"
      aria-roledescription="draggable software loop"
      aria-valuemax={toolkit.length}
      aria-valuemin={1}
      aria-valuenow={1}
      role="scrollbar"
      tabIndex={0}
    >
      <span className="software-tube-rail software-tube-rail-top" aria-hidden="true" />
      <span className="software-tube-rail software-tube-rail-bottom" aria-hidden="true" />
      <div className="software-tube-list" id="software-tube-list">
        {toolkit.map(([mark, name, detail, icon, color], index) => (
          <article
            className="software-tube-item"
            data-software-tube-item
            key={name}
            style={{ "--tool-color": color } as CSSProperties}
          >
            <span className="software-tube-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="software-tube-icon" aria-hidden="true">
              <b>{mark}</b>
              {icon ? <img src={icon} alt="" loading="lazy" /> : null}
            </span>
            <div><h3>{name}</h3><p>{detail}</p></div>
            <i aria-hidden="true" />
          </article>
        ))}
      </div>
      <span className="software-tube-caption" aria-hidden="true">TOOLS / CONTINUOUS LOOP</span>
    </div>
  );
}
