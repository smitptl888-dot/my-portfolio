"use client";
import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import "../secondary.css";
const MotionContext = createContext({ paused: false, toggle: () => {} });
function subscribe(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, getReducedMotion, () => false);
  const [manualPause, setManualPause] = useState(false);
  const paused = reduced || manualPause;
  return <MotionContext.Provider value={{ paused, toggle: () => setManualPause(value => !value) }}><div className="secondary-site" data-motion={paused ? "paused" : "running"}>{children}</div></MotionContext.Provider>;
}
export const useMotion = () => useContext(MotionContext);
export function MotionControl() {
  const { paused, toggle } = useMotion();
  return <button className="sub-motion-control" type="button" onClick={toggle} aria-pressed={paused} title="Reduced-motion system preferences are always respected"><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span> {paused ? "Motion paused" : "Pause motion"}</button>;
}
