"use client";

import { FormEvent, useState } from "react";
import { services, siteDetails } from "../portfolio-data";

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Portfolio inquiry — ${String(formData.get("service") || "Design project")}`;
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Phone: ${formData.get("phone") || "Not provided"}`,
      `Brand: ${formData.get("brand") || "Not provided"}`,
      `Service: ${formData.get("service")}`,
      `Budget: ${formData.get("budget") || "Not provided"}`,
      `Timeline: ${formData.get("timeline") || "Flexible"}`,
      "",
      String(formData.get("details") || ""),
    ].join("\n");

    setSubmitted(true);
    window.location.href = `mailto:${siteDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span>Project inquiry</span>
        <strong>Tell me what you&apos;re making.</strong>
      </div>

      <div className="field-pair">
        <label>
          Your name
          <input name="name" type="text" autoComplete="name" placeholder="Name" required />
        </label>
        <label>
          Email address
          <input name="email" type="email" autoComplete="email" placeholder="you@brand.com" required />
        </label>
      </div>

      <div className="field-pair">
        <label>
          Phone number
          <input name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        </label>
        <label>
          Brand or company
          <input name="brand" type="text" autoComplete="organization" placeholder="Optional" />
        </label>
      </div>

      <div className="field-pair">
        <label>
          Service
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            {services.map(([, title]) => <option key={title} value={title}>{title}</option>)}
          </select>
        </label>
        <label>
          Budget
          <input name="budget" type="text" placeholder="Optional" />
        </label>
      </div>

      <label>
        Timeline
        <input name="timeline" type="text" placeholder="Flexible / target date" />
      </label>

      <label>
        Project details
        <textarea name="details" rows={5} placeholder="What do you need, where will it be used, and what should it communicate?" required />
      </label>

      <label className="consent-field">
        <input name="consent" type="checkbox" required />
        <span>I agree to be contacted about this design inquiry.</span>
      </label>

      <button className="submit-button" type="submit">
        <span className="submit-label">SUBMIT</span><span className="submit-arrow" aria-hidden="true">↗</span>
      </button>
      {submitted ? <p className="form-note" role="status">Your email app should open with the project details ready.</p> : null}
    </form>
  );
}
