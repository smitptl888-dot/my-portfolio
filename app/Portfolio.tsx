"use client";

/* eslint-disable @next/next/no-img-element -- Local portfolio artwork is already optimized and must preserve its original crops. */

import Link from "next/link";
import { useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";
import RadialPosterStage from "./components/RadialPosterStage";
import SoftwareTube from "./components/SoftwareTube";
import StudioHeader from "./components/StudioHeader";
import { aiCreativeCapabilities, categories, process, services, siteDetails, visualSkills } from "./portfolio-data";

function CornerMarks() {
  return <span className="corner-marks" aria-hidden="true"><i /><i /><i /><i /></span>;
}

export default function Portfolio() {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => element.setAttribute("data-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -8%", threshold: 0.1 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function moveHero(event: ReactPointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 2}`);
    event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 2}`);
  }

  return (
    <main id="top" className="mondragon-portfolio home-focused">
      {introVisible ? (
        <div className="opening-sequence" aria-hidden="true" onAnimationEnd={(event) => { if (event.currentTarget === event.target) setIntroVisible(false); }}>
          <div className="opening-logo"><span>S</span><i /><span>P</span></div>
          <p>Graphic design / Visual direction</p>
          <div className="opening-word"><span>SMIT</span><span>PATEL</span></div>
        </div>
      ) : null}

      <StudioHeader current="home" />

      <section className="studio-hero" aria-labelledby="hero-title" onPointerMove={moveHero}>
        <CornerMarks />
        <p className="hero-location">{siteDetails.location}<span>✦</span></p>
        <h1 id="hero-title"><span>SMIT</span><span>PATEL</span></h1>
        <RadialPosterStage />
        <div className="hero-specialties"><span>Design specialist</span><p>Graphic Designer</p><p>Visual Designer</p><p>Creative Direction</p></div>
        <Link className="hero-contact-card" href="/contact"><span>Hi!<br />I&apos;m Smit.</span><img src="/portfolio/smit-patel-profile-2026.jpg" alt="Smit Patel" /><strong>Contact me<br />for design projects</strong></Link>
        <a className="scroll-cue" href="#studio-intro">Scroll Down<i aria-hidden="true">⌄</i></a>
      </section>

      <div className="client-strip" aria-label="Design specialties">
        <div>{categories.slice(1).map((category) => <span key={category}>{category}</span>)}</div>
        <div aria-hidden="true">{categories.slice(1).map((category) => <span key={category}>{category}</span>)}</div>
      </div>

      <section className="studio-statement" id="studio-intro">
        <CornerMarks />
        <p data-reveal>I shape clear ideas into bold visual systems for brands, campaigns, social content, and print.</p>
        <div className="statement-meta"><span>Graphic Designer / Visual Designer</span><span>Digital + Print</span></div>
      </section>

      <section className="identity-motion" aria-label="Smit Patel design roles">
        <div><span>GRAPHIC DESIGNER</span><i>✦</i><span>GRAPHIC DESIGNER</span><i>✦</i></div>
        <div><span>VISUAL DESIGNER</span><i>✦</i><span>VISUAL DESIGNER</span><i>✦</i></div>
        <div><span>DESIGN SPECIALIST</span><i>✦</i><span>DESIGN SPECIALIST</span><i>✦</i></div>
      </section>

      <section className="software-showcase" id="skills">
        <CornerMarks />
        <div className="software-heading" data-reveal>
          <p>Creative toolkit / 10 tools</p>
          <h2>SOFTWARE<br /><em>EXPERTISE</em></h2>
          <span>Clear tools.<br />Stronger visual outcomes.</span>
        </div>
        <div data-reveal><SoftwareTube /></div>
        <p className="software-footnote" data-reveal><span>Tools in service of the idea</span>A flexible toolkit supports the process from first direction to polished digital, social, video, and print delivery.</p>
      </section>

      <section className="services-studio" id="services">
        <div className="services-intro" data-reveal><p>Design specialties</p><h2>Visual support<br />for every <em>launch.</em></h2></div>
        <div className="services-rows">
          {services.map(([number, title, description]) => (
            <Link href="/contact" key={title} data-reveal><span>{number}</span><h3>{title}</h3><p>{description}</p><i aria-hidden="true">↗</i><b aria-hidden="true" /></Link>
          ))}
        </div>
      </section>

      <section className="ai-creative" id="ai-creative">
        <CornerMarks />
        <div className="ai-creative-heading" data-reveal>
          <p>AI-assisted creative / Visual production</p>
          <h2>FASTER<br /><em>EXPLORATION.</em><br />HUMAN DIRECTION.</h2>
        </div>
        <div className="ai-orbit" aria-hidden="true"><i /><i /><i /><b>AI</b><span>IDEA</span><span>IMAGE</span><span>VARIATION</span></div>
        <div className="ai-creative-copy" data-reveal>
          <p>I use AI inside the graphic-design workflow to explore visual directions, generate possibilities, and test ideas faster—then refine the strongest direction through hands-on design.</p>
          <div>{aiCreativeCapabilities.map((capability, index) => <span key={capability}><small>{String(index + 1).padStart(2, "0")}</small>{capability}</span>)}</div>
        </div>
      </section>

      <section className="proof-strip focus-strip" aria-label="Design focus">
        <article data-reveal><span>·</span><strong>Graphic<br />Designer</strong><p>Bold, readable visual communication.</p></article>
        <article data-reveal><span>··</span><strong>Visual<br />Designer</strong><p>Clear systems for digital and print.</p></article>
        <article data-reveal><span>···</span><strong>Design<br />Specialist</strong><p>Campaign, social, brand, and layout work.</p></article>
      </section>

      <section className="about-studio" id="about">
        <CornerMarks />
        <div className="about-studio-heading" data-reveal><p>About Smit</p><h2>Designing clear ideas with a bold visual point of view.</h2></div>
        <figure className="about-portrait" data-reveal><img src="/portfolio/smit-patel-profile-2026.jpg" alt="Portrait of Smit Patel, graphic designer" /><figcaption>Smit Patel / Graphic Designer</figcaption></figure>
        <div className="about-studio-copy" data-reveal><p>Smit creates poster systems, brand visuals, social creatives, and campaign artwork that feels clean, confident, and ready to use.</p><div>{visualSkills.map((skill) => <span key={skill}>{skill}</span>)}</div><Link href="/services">Explore services <i aria-hidden="true">↗</i></Link></div>
      </section>

      <section className="process-studio" id="process">
        <p className="process-label">Design process</p>
        <div>{process.map(([number, title, description]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="home-contact-cta">
        <CornerMarks />
        <div className="home-cta-copy"><p>Have a design project in mind?</p><h2>LET&apos;S<br />WORK!</h2><Link href="/contact">Contact <span>↗</span></Link></div>
        <div className="home-cta-motion" aria-hidden="true"><i /><i /><i /><b>SP</b><span>Graphic design · Visual direction · </span></div>
      </section>

      <footer className="studio-footer">
        <CornerMarks />
        <div className="footer-motion" role="img" aria-label="A playful kinetic design character in motion">
          <div className="footer-playground" aria-hidden="true">
            <span className="footer-play-ball footer-play-ball-one" />
            <span className="footer-play-ball footer-play-ball-two" />
            <b className="footer-play-creature"><i /><i /><em /></b>
            <strong>✦</strong>
            <span className="footer-play-squiggle" />
          </div>
          <div className="footer-motion-sweep" aria-hidden="true">
            <span>MOVE ✦ MIX ✦ MAKE ✦ PLAY ✦ </span>
            <span>MOVE ✦ MIX ✦ MAKE ✦ PLAY ✦ </span>
          </div>
          <small aria-hidden="true">CREATIVE PLAYGROUND / 2026</small>
        </div>
        <p>GRAPHIC DESIGNER / VISUAL CREATIVE</p>
        <nav aria-label="Footer navigation"><Link href="/">Home</Link><i>·</i><Link href="/services">Services</Link><i>·</i><Link href="/work">Work</Link><i>·</i><Link href="/contact">Contact</Link></nav>
        <small>© 2026 Smit Patel. All rights reserved.</small>
      </footer>

      <Link className="floating-whatsapp" href="/contact" aria-label="Open the contact page"><span>SP</span>Contact</Link>
    </main>
  );
}
