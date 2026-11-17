import { MotionProvider } from "./MotionProvider";
import StudioHeader from "./PageHeader";
import SoftwareTube from "./TextToolkit";
import { AIPanel, ContactCTA, Marquee, ProcessSection, SectionLabel, ServicesList, StudioFooter } from "./StudioElements";
export default function ServicesExperience() {
  return <MotionProvider><StudioHeader current="services" /><main id="main-content" tabIndex={-1}>
    <section className="sub-page-hero sub-service-hero"><p className="sub-eyebrow">Graphic design / Visual direction</p><h1>SERVICES<span className="sub-accent">.</span></h1><div className="sub-page-hero-bottom"><span>09 focused services</span><p>Visual systems shaped for campaigns, social content, brand moments, digital commerce, and print.</p><a href="#service-index">Explore services ↓</a></div></section>
    <Marquee text="STRATEGY → DIRECTION → DESIGN → DELIVERY → " />
    <section className="sub-section sub-paper-section" id="service-index"><SectionLabel number="01">What I do</SectionLabel><h2 className="sub-display-heading">DESIGN<br /><em>SPECIALTIES.</em></h2><ServicesList /></section>
    <section className="sub-section sub-toolkit-section"><div><SectionLabel number="02">Software expertise / 10 tools</SectionLabel><h2 className="sub-display-heading">TOOLS IN<br /><em>MOTION.</em></h2><p className="sub-body-large">The right software supports the idea. It never replaces the thinking.</p><span className="sub-kinetic-asterisk" aria-hidden="true">✳</span></div><SoftwareTube /></section>
    <AIPanel /><ProcessSection /><ContactCTA />
  </main><StudioFooter /></MotionProvider>;
}
