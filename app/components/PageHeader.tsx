"use client";
import MobileMenu from "./MobileMenu";
const navigation = [["home", "Home", "/"], ["work", "Work", "/work"], ["services", "Services", "/services"], ["about", "About", "/about"], ["contact", "Contact", "/contact"]] as const;
export default function StudioHeader({ current }: { current?: string }) {
  return <>
    <a href="#main-content" className="sub-skip-link">Skip to content</a>
    <header className="sub-studio-header">
      <a href="/" className="sub-studio-mark" aria-label="Smit Patel — home"><span>S</span><i /><span>P</span><small>Graphic<br />Designer</small></a>
      <nav className="sub-studio-nav" aria-label="Primary navigation">{navigation.map(([id, name, href]) => <a key={id} href={href} aria-current={current === id ? "page" : undefined}>{name}</a>)}</nav>
      <a href="/contact" className="sub-header-cta">Let&apos;s talk <span aria-hidden="true">↗</span></a>
      <MobileMenu current={current} />
    </header>
  </>;
}
