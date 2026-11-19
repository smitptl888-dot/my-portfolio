"use client";

import { useEffect, useId, useRef, useState } from "react";
import "./mobile-menu.css";

const links = [
  ["home", "Home", "/"], ["work", "Work", "/work"],
  ["services", "Services", "/services"], ["about", "About", "/about"],
  ["contact", "Contact", "/contact"],
] as const;

export default function MobileMenu({ current }: { current?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousOverflow = useRef<string | null>(null);
  const [open, setOpen] = useState(false);
  const id = useId();
  function restoreScroll() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }
  function show() {
    if (!dialog.current || dialog.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    delete dialog.current.dataset.closing;
    dialog.current.showModal();
    setOpen(true);
  }
  function close() {
    if (timer.current) return;
    if (dialog.current) dialog.current.dataset.closing = "true";
    timer.current = setTimeout(() => {
      dialog.current?.close();
      timer.current = null;
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180);
  }
  useEffect(() => {
    const query = window.matchMedia("(min-width:1051px)");
    const resized = () => { if (query.matches) dialog.current?.close(); };
    query.addEventListener("change", resized);
    return () => {
      query.removeEventListener("change", resized);
      if (timer.current) clearTimeout(timer.current);
      restoreScroll();
    };
  }, []);
  return <>
    <button type="button" className="studio-menu-launch" aria-haspopup="dialog" aria-controls={id} aria-expanded={open} onClick={show}>Menu <span aria-hidden="true"><i /><i /></span></button>
    <dialog ref={dialog} id={id} className="studio-navigation-dialog" aria-label="Site navigation" onCancel={event => { event.preventDefault(); close(); }} onClose={() => { setOpen(false); restoreScroll(); }}>
      <div className="studio-navigation-inner">
        <div className="studio-navigation-top"><a href="/" aria-label="Smit Patel home">S<span>—</span>P</a><button type="button" onClick={close} aria-label="Close menu">Close <span aria-hidden="true">×</span></button></div>
        <div className="studio-navigation-intro"><span>SMIT PATEL / VISUAL DESIGNER</span></div>
        <nav aria-label="Mobile navigation">{links.map(([key, label, href], index) => <a href={href} key={key} aria-current={key === current ? "page" : undefined}><small aria-hidden="true">0{index + 1}</small><span>{label}</span><i aria-hidden="true">↗</i></a>)}</nav>
        <div className="studio-navigation-bottom"><span>GRAPHIC DESIGN<br />& VISUAL DIRECTION</span><a href="/contact">Have an idea?<br /><em>Let’s create.</em> ↗</a></div>
      </div>
    </dialog>
  </>;
}
