import { contactEmail } from "../contact-settings";
import { MotionProvider } from "../components/MotionProvider";
import type { Metadata } from "next";
import InquiryForm from "../components/InquiryForm";
import StudioHeader from "../components/PageHeader";
import { Marquee, SectionLabel, StudioFooter } from "../components/StudioElements";
import { siteDetails } from "../portfolio-data";
export const metadata: Metadata = { title: "Contact Smit Patel | Graphic Design Inquiry", description: "Start a design project with Smit Patel. Posters, brand identity, social creatives, and campaign visuals." };
export default function ContactPage() {
  return <MotionProvider><StudioHeader current="contact" /><main id="main-content" tabIndex={-1}>
    <section className="sub-page-hero sub-contact-hero"><p className="sub-eyebrow">Start a design project</p><h1>LET&apos;S<br /><em>CONTACT.</em></h1><div className="sub-page-hero-bottom"><span className="sub-availability"><i />{siteDetails.location}</span><p>Have a project idea, need campaign visuals, or want to build a stronger design system?</p><a href="#inquiry">Tell me about it ↓</a></div></section>
    <Marquee text="LET'S WORK — LET'S CREATE — LET'S CONTACT — " />
    <section className="sub-section sub-contact-content sub-paper-section" id="inquiry"><div className="sub-contact-information"><SectionLabel number="01">Start a conversation</SectionLabel><h2 className="sub-display-heading">HI!<br />I&apos;M <em>SMIT.</em></h2><p className="sub-body-large">Share the essentials and let&apos;s start the conversation.</p><dl>
      {contactEmail ? <div><dt>Email</dt><dd><a href={`mailto:${contactEmail}`}>{contactEmail}</a></dd></div> : null}
      <div><dt>Phone</dt><dd><a href={`tel:${siteDetails.phoneHref}`}>{siteDetails.phoneDisplay}</a></dd></div>
      <div><dt>WhatsApp</dt><dd><a href={siteDetails.whatsappUrl} target="_blank" rel="noreferrer">Message me ↗</a></dd></div>
      <div><dt>Instagram</dt><dd><a href={siteDetails.instagramUrl} target="_blank" rel="noreferrer">@smit8._ ↗</a></dd></div>
    </dl><p className="sub-contact-scope">Good starting details: what you need, where it will be used, your timeline and budget, and any reference direction.</p></div><InquiryForm /></section>
  </main><StudioFooter /></MotionProvider>;
}
