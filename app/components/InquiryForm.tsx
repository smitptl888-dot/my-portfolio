"use client";
import { contactEmail } from "../contact-settings";

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { services, siteDetails } from "../portfolio-data";
export default function InquiryForm() {
  const params = useSearchParams();
  const service = services.find(([, title]) => title === params.get("service"))?.[1] ?? "";
  const [draft, setDraft] = useState("");
  const [subject, setSubject] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const draftRef = useRef<HTMLTextAreaElement>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubject(`Design inquiry — ${String(data.get("service"))}`);
    setDraft(["Hi Smit, I'd like to discuss a design project.", "", `Name: ${data.get("name")}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone") || "Not provided"}`, `Brand: ${data.get("brand") || "Not provided"}`, `Service: ${data.get("service")}`, `Budget: ${data.get("budget") || "Not provided"}`, `Timeline: ${data.get("timeline") || "Flexible"}`, "", String(data.get("details"))].join("\n"));
    setCopyStatus("");
  }
  async function copy() {
    try { await navigator.clipboard.writeText(draft); setCopyStatus("Copied. Paste your inquiry into a message to Smit."); }
    catch { draftRef.current?.focus(); draftRef.current?.select(); setCopyStatus("Select and copy the inquiry below."); }
  }
  return <form className="sub-inquiry-form" onSubmit={prepare} onChange={() => { if (draft) setDraft(""); }}>
    <div className="sub-form-heading"><p className="sub-eyebrow">Project inquiry</p><h3>Tell me what<br />you&apos;re making.</h3></div>
    <div className="sub-field-pair"><label>Your name<input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@brand.com" /></label></div>
    <div className="sub-field-pair"><label>Phone number <small>(optional)</small><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Phone number" /></label><label>Brand or company <small>(optional)</small><input name="brand" autoComplete="organization" maxLength={120} placeholder="Brand name" /></label></div>
    <div className="sub-field-pair"><label>Service<select name="service" defaultValue={service} key={service} required><option value="" disabled>Select a service</option>{services.map(([, title]) => <option key={title}>{title}</option>)}</select></label><label>Budget <small>(optional)</small><input name="budget" maxLength={80} placeholder="Your budget range" /></label></div>
    <label>Timeline <small>(optional)</small><input name="timeline" maxLength={80} placeholder="Flexible / target date" /></label>
    <label>Project details<textarea name="details" required rows={5} maxLength={3000} placeholder="What do you need, where will it be used, and what should it communicate?" /></label>
    <label className="sub-consent-field"><input name="consent" type="checkbox" required /><span>I agree to be contacted about this design inquiry.</span></label>
    <button type="submit" className="sub-submit-button">Prepare inquiry <span aria-hidden="true">↗</span></button>
    <p className="sub-form-note">Review your inquiry before sharing. Nothing is sent automatically.</p>
    {draft ? <section className="sub-inquiry-draft" aria-label="Your prepared inquiry"><h4>Your inquiry is ready to share.</h4><p>Review the details, then choose how to send them.</p><textarea ref={draftRef} aria-label="Prepared inquiry" value={draft} readOnly rows={8} /><div className="sub-draft-actions">{contactEmail ? <a href={`mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`}>Open email draft ↗</a> : null}<a target="_blank" rel="noreferrer" href={`https://wa.me/${siteDetails.phoneHref.replace("+", "")}?text=${encodeURIComponent(draft)}`}>Open WhatsApp draft ↗</a><button type="button" onClick={copy}>Copy inquiry</button></div><p role="status">{copyStatus || "You'll send the message from your chosen app."}</p></section> : null}
  </form>;
}
