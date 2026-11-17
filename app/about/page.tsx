import { MotionProvider } from "../components/MotionProvider";
import type { Metadata } from "next";

import StudioHeader from "../components/PageHeader";
import { ContactCTA, Marquee, ProcessSection, SectionLabel, StudioFooter } from "../components/StudioElements";
import { siteDetails, visualSkills } from "../portfolio-data";
export const metadata: Metadata = { title: "About Smit Patel | Graphic Designer", description: "Meet Smit Patel. Graphic design, visual direction, and clear systems for digital and print." };
export default function AboutPage() {
  return <MotionProvider><StudioHeader current="about" /><main id="main-content" tabIndex={-1}>
    <section className="sub-page-hero sub-about-hero"><p className="sub-eyebrow">Smit Patel / Independent designer</p><h1>ABOUT<br /><em>SMIT.</em></h1><div className="sub-page-hero-bottom"><span className="sub-availability"><i />{siteDetails.location}</span><p>Designing clear ideas with a bold visual point of view.</p><a href="#about-story">Meet the designer ↓</a></div></section>
    <Marquee />
    <section className="sub-section sub-about-story" id="about-story"><div className="sub-monogram-panel" aria-hidden="true"><span>S</span><span>P</span><small>GRAPHIC DESIGN / VISUAL DIRECTION</small></div><div><SectionLabel number="01">The designer</SectionLabel><h2 className="sub-display-heading">IDEAS FIRST.<br /><em>DESIGN ALWAYS.</em></h2><p className="sub-body-large">Smit creates poster systems, brand visuals, social creatives, and campaign artwork that feels clean, confident, and ready to use.</p><p className="sub-body-large">I turn a clear idea into visual work that feels bold, useful, and ready for the places people will actually see it.</p><a href="/work" className="sub-text-link">Explore work <span>↗</span></a></div></section>
    <section className="sub-section sub-paper-section"><SectionLabel number="02">Design focus</SectionLabel><div className="sub-focus-grid"><h2 className="sub-display-heading">DIGITAL.<br />SOCIAL.<br /><em>PRINT.</em></h2><div className="sub-focus-list">{visualSkills.map((skill, i) => <p key={skill}><small>0{i + 1}</small>{skill}</p>)}</div></div></section>
    <section className="sub-section sub-statement-section"><SectionLabel number="03">Human direction</SectionLabel><h2>Faster exploration.<br /><em>Human direction.</em></h2><p className="sub-body-large">I use AI inside the graphic-design workflow to explore visual directions, generate possibilities, and test ideas faster—then refine the strongest direction through hands-on design.</p></section>
    <ProcessSection /><ContactCTA />
  </main><StudioFooter /></MotionProvider>;
}
