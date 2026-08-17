/* eslint-disable @next/next/no-img-element -- The local portrait is optimized and shown at its editorial crop. */

import Link from "next/link";
import { aiCreativeCapabilities, services, siteDetails, visualSkills } from "../portfolio-data";
import RevealObserver from "./RevealObserver";
import SoftwareTube from "./SoftwareTube";
import StudioHeader from "./StudioHeader";

function CornerMarks() {
  return <span className="corner-marks" aria-hidden="true"><i /><i /><i /><i /></span>;
}

export default function ServicesExperience() {
  return (
    <main className="mondragon-portfolio services-page">
      <RevealObserver />
      <StudioHeader current="services" />

      <section className="services-page-hero" aria-labelledby="services-title">
        <CornerMarks />
        <p>Graphic design / Visual direction</p>
        <h1 id="services-title">SERVICES</h1>
        <div className="services-page-intro">
          <span>Smit Patel / Independent designer</span>
          <p>Visual systems shaped for campaigns, social content, brand moments, digital commerce, and print.</p>
        </div>
        <a href="#service-index">Scroll Down <i aria-hidden="true">⌄</i></a>
      </section>

      <section className="services-page-statement" data-reveal>
        <p>I turn a clear idea into visual work that feels bold, useful, and ready for the places people will actually see it.</p>
        <span>Strategy → Direction → Design → Delivery</span>
      </section>

      <section className="services-page-index" id="service-index">
        <div className="services-page-title" data-reveal><p>What I do</p><h2>DESIGN<br /><em>SPECIALTIES.</em></h2><span>09 focused services</span></div>
        <div className="services-page-rows">
          {services.map(([number, title, description]) => (
            <Link href="/contact" key={title} data-reveal>
              <span>{number}</span><h3>{title}</h3><p>{description}</p><i aria-hidden="true">↗</i><b aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="services-page-tools" id="software">
        <CornerMarks />
        <div className="services-tools-copy" data-reveal>
          <p>Software expertise / 10 tools</p>
          <h2>TOOLS IN<br /><em>MOTION.</em></h2>
          <span>The right software supports the idea. It never replaces the thinking.</span>
        </div>
        <SoftwareTube />
      </section>

      <section className="services-ai-panel" data-reveal>
        <div className="services-ai-title"><p>AI-assisted creative</p><h2>MORE ROUTES.<br />ONE CLEAR<br /><em>DIRECTION.</em></h2></div>
        <div className="services-ai-orbit" aria-hidden="true"><i /><i /><i /><b>AI</b></div>
        <div className="services-ai-copy">
          <p>AI supports early exploration, visual concepts, image directions, and creative variations. The final choices remain guided by design judgment, hierarchy, and purpose.</p>
          <div>{aiCreativeCapabilities.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="services-profile" data-reveal>
        <figure><img src="/portfolio/smit-patel-portrait.png" alt="Portrait of Smit Patel, graphic designer" /><figcaption>Smit Patel / Graphic Designer</figcaption></figure>
        <div><p>Design focus</p><h2>Clear ideas with a bold visual point of view.</h2><div>{visualSkills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
      </section>

      <section className="services-contact-cta">
        <p>Need visual support for your next project?</p><h2>LET&apos;S WORK.</h2><Link href="/contact">Start a conversation <span>↗</span></Link>
      </section>

      <footer className="services-footer">
        <strong>SMIT PATEL</strong><span>Graphic Designer / Visual Creative</span>
        <nav aria-label="Services footer navigation"><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/contact">Contact</Link></nav>
        <a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a>
      </footer>
    </main>
  );
}
