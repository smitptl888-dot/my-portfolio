import type { Metadata } from "next";
import Link from "next/link";
import InquiryForm from "../components/InquiryForm";
import RevealObserver from "../components/RevealObserver";
import StudioHeader from "../components/StudioHeader";
import { siteDetails } from "../portfolio-data";

/* eslint-disable @next/next/no-img-element -- The local portrait is optimized and displayed at its intended crop. */

export const metadata: Metadata = {
  title: "Contact Smit Patel | Graphic Design Inquiry",
  description: "Contact Smit Patel for poster design, social media creatives, brand identity, campaign visuals, digital ads, and print-ready design.",
};

export default function ContactPage() {
  return (
    <main className="mondragon-portfolio contact-page">
      <RevealObserver />
      <StudioHeader current="contact" />
      <section className="contact-experience-hero" aria-labelledby="contact-title">
        <span className="corner-marks" aria-hidden="true"><i /><i /><i /><i /></span>
        <p>Graphic designer / Visual creative</p>
        <h1 id="contact-title" aria-label="Let's Contact">
          <span aria-hidden="true">LET&apos;S CONTACT</span>
          <span aria-hidden="true">LET&apos;S CONTACT</span>
          <span aria-hidden="true">LET&apos;S CONTACT</span>
          <strong>LET&apos;S CONTACT</strong>
        </h1>
        <Link className="contact-hero-person" href={`mailto:${siteDetails.email}`}>
          <img src="/portfolio/smit-patel-portrait.png" alt="Smit Patel" />
          <span>Hi!<br />I&apos;m Smit.</span>
          <strong>Email me <i aria-hidden="true">↗</i></strong>
        </Link>
        <div className="contact-hero-meta"><span>Start a design project</span><span>Scroll to inquire ↓</span></div>
      </section>

      <section className="contact-experience-content">
        <div className="contact-information">
          <p className="contact-kicker" data-reveal>Direct contact / Smit Patel</p>
          <h2>{siteDetails.location}</h2>
          <dl>
            <div><dt>Email</dt><dd><a href={`mailto:${siteDetails.email}`}>{siteDetails.email}</a></dd></div>
            <div><dt>Phone / WhatsApp</dt><dd><a href={`tel:${siteDetails.phoneHref}`}>{siteDetails.phoneDisplay}</a></dd></div>
            <div><dt>Instagram</dt><dd><a href={siteDetails.instagramUrl} target="_blank" rel="noreferrer">@smit8._ ↗</a></dd></div>
          </dl>
          <a className="contact-manager-card" href={siteDetails.whatsappUrl} target="_blank" rel="noreferrer" data-reveal>
            <img src="/portfolio/smit-patel-portrait.png" alt="Smit Patel" />
            <span>Hi!<br />I&apos;m Smit.</span>
            <strong>Message me<br />on WhatsApp <i>↗</i></strong>
          </a>
          <div className="contact-scope">
            <p>Good starting details</p>
            <span>What you need</span><span>Where it will be used</span><span>Timeline and budget</span><span>Reference direction</span>
          </div>
        </div>
        <div className="contact-form-column" data-reveal>
          <p className="contact-form-intro">Have a project idea, need campaign visuals, or want to build a stronger design system? Share the essentials and let&apos;s start the conversation.</p>
          <InquiryForm />
        </div>
      </section>

      <footer className="contact-page-footer">
        <strong>SMIT PATEL</strong>
        <p>GRAPHIC DESIGNER / VISUAL CREATIVE</p>
        <nav aria-label="Contact page footer navigation"><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/contact">Contact</Link></nav>
        <small>© 2026 Smit Patel. All rights reserved.</small>
      </footer>
    </main>
  );
}
