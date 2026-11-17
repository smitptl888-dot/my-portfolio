import { contactEmail } from "../contact-settings";

import { aiCreativeCapabilities, process, services, siteDetails } from "../portfolio-data";
import { MotionControl } from "./MotionProvider";
const navigation = [["Home", "/"], ["Work", "/work"], ["Services", "/services"], ["About", "/about"], ["Contact", "/contact"]];
export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="sub-eyebrow"><span className="sub-section-number">{number}</span>{children}</p>;
}
export function Marquee({ text = "GRAPHIC DESIGNER — VISUAL DESIGNER — DESIGN SPECIALIST — " }: { text?: string }) {
  return <div className="sub-type-marquee" aria-hidden="true"><div><span>{text}</span><span>{text}</span></div></div>;
}
export function ServicesList() {
  return <div className="sub-service-rows">{services.map(([number, title, description]) => <a href={`/contact?service=${encodeURIComponent(title)}#inquiry`} key={number} className="sub-service-row"><span>{number}</span><h3>{title}</h3><p>{description}</p><i aria-hidden="true">↗</i></a>)}</div>;
}
export function ProcessSection() {
  return <section className="sub-section sub-process-section"><SectionLabel number="04">The process</SectionLabel><div className="sub-process-grid">{process.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>;
}
export function AIPanel() {
  return <section className="sub-section sub-ai-panel"><SectionLabel number="03">AI-assisted creative</SectionLabel><div className="sub-split-copy"><h2 className="sub-display-heading">MORE ROUTES.<br />ONE CLEAR<br /><em>DIRECTION.</em></h2><div><p className="sub-body-large">AI supports early exploration, visual concepts, image directions, and creative variations. The final choices remain guided by design judgment, hierarchy, and purpose.</p><div className="sub-tag-list">{aiCreativeCapabilities.map(item => <span key={item}>{item}</span>)}</div></div></div></section>;
}
export function ContactCTA() {
  return <section className="sub-contact-cta"><p className="sub-eyebrow">Have a design project in mind?</p><a href="/contact"><h2>LET&apos;S<br /><em>WORK.</em></h2><span className="sub-cta-arrow" aria-hidden="true">↗</span><span className="sub-cta-label">Start a conversation</span></a></section>;
}
export function StudioFooter() {
  return <footer className="sub-studio-footer"><div className="sub-footer-top"><a href="/" className="sub-footer-name">SMIT PATEL<span>Graphic Designer / Visual Creative</span></a><nav aria-label="Footer navigation">{navigation.map(([name, href]) => <a href={href} key={href}>{name}</a>)}</nav><div className="sub-footer-social"><a href={siteDetails.instagramUrl} target="_blank" rel="noreferrer">Instagram ↗</a><a href={siteDetails.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a>{contactEmail ? <a href={`mailto:${contactEmail}`}>Email ↗</a> : null}</div></div><div className="sub-footer-bottom"><small>© 2026 Smit Patel</small><MotionControl /><a href="#main-content">Back to top ↑</a></div></footer>;
}
