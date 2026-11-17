"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
const navigation = [["home", "Home", "/"], ["work", "Work", "/work"], ["services", "Services", "/services"], ["about", "About", "/about"], ["contact", "Contact", "/contact"]] as const;
export default function StudioHeader({ current }: { current?: string }) {
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  useEffect(() => { menu.current?.close(); document.body.style.removeProperty("overflow"); }, [pathname]);
  useEffect(() => () => { document.body.style.removeProperty("overflow"); }, []);
  function close() { menu.current?.close(); }
  return <>
    <a href="#main-content" className="sub-skip-link">Skip to content</a>
    <header className="sub-studio-header">
      <a href="/" className="sub-studio-mark" aria-label="Smit Patel — home"><span>S</span><i /><span>P</span><small>Graphic<br />Designer</small></a>
      <nav className="sub-studio-nav" aria-label="Primary navigation">{navigation.map(([id, name, href]) => <a key={id} href={href} aria-current={current === id ? "page" : undefined}>{name}</a>)}</nav>
      <a href="/contact" className="sub-header-cta">Let&apos;s talk <span aria-hidden="true">↗</span></a>
      <button type="button" className="sub-menu-toggle" aria-haspopup="dialog" aria-controls="mobile-menu" onClick={() => { menu.current?.showModal(); document.body.style.overflow = "hidden"; }}>Menu <span aria-hidden="true">＋</span></button>
    </header>
    <dialog id="mobile-menu" ref={menu} className="sub-mobile-menu" aria-label="Site navigation" onClose={() => document.body.style.removeProperty("overflow")}>
      <div className="sub-menu-top"><span>Smit Patel / Portfolio</span><button type="button" onClick={close}>Close ×</button></div>
      <nav aria-label="Mobile navigation">{navigation.map(([id, name, href], index) => <a key={id} href={href} onClick={close} aria-current={current === id ? "page" : undefined}><small>0{index + 1}</small>{name}<span aria-hidden="true">↗</span></a>)}</nav>
      <p>Graphic design / Visual direction</p>
    </dialog>
  </>;
}
