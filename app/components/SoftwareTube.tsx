"use client";

/* eslint-disable @next/next/no-img-element -- Small local SVG product logos. */

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
    let spacing = (rows[0]?.offsetHeight ?? 108) + 10;
    let visible = true;
    let frame = 0;
    let last = performance.now();
    let offset = 0;
    let dragging = false;
    let activePointer = -1;
    let lastPointerY = 0;
    let touchPointer = false;
    let lastPointerTime = 0;
    let velocity = 0;
    let announcedTool = 1;

    const dimensions = () => {
      return { spacing, cycle: spacing * rows.length };
    };

    const wrapOffset = (value: number, cycle: number) => ((value % cycle) + cycle) % cycle;
    const clampVelocity = (value: number) => Math.max(-1.25, Math.min(1.25, value));

    const handlePointerDown = (event: PointerEvent) => {
      if (reducedMotion || !event.isPrimary || event.button !== 0) return;
      touchPointer = event.pointerType === "touch";
      dragging = true;
      activePointer = event.pointerId;
      lastPointerY = touchPointer ? event.clientX : event.clientY;
      lastPointerTime = performance.now();
      velocity = 0;
      tube.setPointerCapture(event.pointerId);
      tube.dataset.dragging = "true";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== activePointer) return;
      const now = performance.now();
      const elapsed = Math.max(now - lastPointerTime, 8);
      const coordinate = touchPointer ? event.clientX : event.clientY;
      const delta = coordinate - lastPointerY;
      const { cycle } = dimensions();
      offset = wrapOffset(offset - delta, cycle);
      velocity = clampVelocity(-delta / elapsed);
      lastPointerY = coordinate;
      lastPointerTime = now;
    };

    const finishPointer = (event: PointerEvent) => {
      if (event.pointerId !== activePointer) return;
      dragging = false;
      activePointer = -1;
      if (tube.hasPointerCapture(event.pointerId)) tube.releasePointerCapture(event.pointerId);
      delete tube.dataset.dragging;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (reducedMotion || !["ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
      event.preventDefault();
      const { spacing, cycle } = dimensions();
      offset = event.key === "Home"
        ? 0
        : wrapOffset(offset + (event.key === "ArrowDown" ? spacing : -spacing), cycle);
      velocity = 0;
    };

    const resizeObserver = new ResizeObserver(() => {
      height = tube.clientHeight;
      spacing = (rows[0]?.offsetHeight ?? 108) + 10;
    });
    const syncAnimation = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden && !reducedMotion) {
        last = performance.now();
        frame = requestAnimationFrame(render);
      }
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    });
    document.addEventListener("visibilitychange", syncAnimation);
    resizeObserver.observe(tube);
    visibilityObserver.observe(tube);
    tube.addEventListener("pointerdown", handlePointerDown);
    tube.addEventListener("pointermove", handlePointerMove);
    tube.addEventListener("pointerup", finishPointer);
    tube.addEventListener("pointercancel", finishPointer);
    tube.addEventListener("lostpointercapture", finishPointer);
    tube.addEventListener("keydown", handleKeyDown);

    const removeInteractionListeners = () => {
      tube.removeEventListener("pointerdown", handlePointerDown);
      tube.removeEventListener("pointermove", handlePointerMove);
      tube.removeEventListener("pointerup", finishPointer);
      tube.removeEventListener("pointercancel", finishPointer);
      tube.removeEventListener("lostpointercapture", finishPointer);
      document.removeEventListener("visibilitychange", syncAnimation);
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

    function render(now: number) {
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
          tube?.setAttribute("aria-valuenow", String(activeTool));
        }

        rows.forEach((row, index) => {
          const loopPosition = (index * spacing - offset + cycle) % cycle;
          const y = loopPosition - spacing;
          const centerDistance = (y + spacing * 0.5 - height * 0.5) / (height * 0.5);
          const depth = Math.max(0, 1 - Math.abs(centerDistance));
          const scale = 0.76 + depth * 0.24;
          row.style.opacity = String(0.55 + depth * 0.45);
          row.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
        });
      }

      frame = requestAnimationFrame(render);
    }

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
      aria-label="Software expertise. Drag vertically with a mouse, swipe sideways on touch, or use arrow keys. Scroll vertically to continue down the page."
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
              {icon ? <img src={icon} alt="" width={48} height={48} decoding="async" /> : <b>{mark}</b>}
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
