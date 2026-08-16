"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  categories,
  projects,
  services,
  siteDetails,
  tools,
  type Project,
} from "./portfolio-data";

function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className={`project-visual tone-${project.tone} ${large ? "visual-large" : ""}`}>
      <div className="visual-grid" />
      <span className="visual-kicker">{project.kicker}</span>
      <div className="visual-object"><i /><i /><b>{String(project.id).padStart(2, "0")}</b></div>
      <strong>{project.headline.split("\n").map((line) => <span key={line}>{line}</span>)}</strong>
      <small>CONCEPT PROJECT</small>
    </div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All work");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedProject) modalCloseRef.current?.focus();
  }, [selectedProject]);

  const filteredProjects =
    activeCategory === "All work"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Portfolio inquiry — ${String(formData.get("service") || "Design project")}`;
    const body = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Brand: ${formData.get("brand") || "Not provided"}`,
      `Service: ${formData.get("service")}`,
      `Budget: ${formData.get("budget")}`,
      `Timeline: ${formData.get("timeline") || "Flexible"}`,
      "",
      String(formData.get("details") || ""),
    ].join("\n");
    setSubmitted(true);
    window.location.href = `mailto:${siteDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Smit portfolio home" onClick={closeMenu}>
          <span className="brand-mark">SP</span>
          <span>Smit / Visual Designer</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <nav id="primary-nav" className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#toolkit" onClick={closeMenu}>Toolkit</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Independent graphic designer · Available worldwide</p>
          <h1>Bold visuals.<br /><em>Clear impact.</em></h1>
          <p className="hero-intro">
            I design attention-grabbing campaigns, product stories and social
            content that make brands impossible to scroll past.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <span>↗</span></a>
            <a className="button button-ghost" href="#contact">Let&apos;s work together</a>
          </div>
          <div className="hero-meta" aria-label="Design specialties">
            <div className="hero-meta-label">
              <small>Design specialties</small>
              <b>Selected focus</b>
            </div>
            <div className="hero-meta-list">
              <span><i aria-hidden="true" />Meta Ads</span>
              <span><i aria-hidden="true" />Product Listings</span>
              <span><i aria-hidden="true" />Social Creatives</span>
              <span><i aria-hidden="true" />Campaigns</span>
            </div>
            <strong className="hero-meta-mark" aria-hidden="true">✦</strong>
          </div>
        </div>

        <div className="hero-stage" aria-label="Selected design work preview">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <article className="art-card card-main">
            <div className="art-label">01 / META CAMPAIGN</div>
            <div className="product-orbit"><span>GLOW</span></div>
            <div className="art-title">YOUR SKIN<br />BUT BRIGHTER.</div>
            <div className="art-chip">SHOP THE DROP →</div>
          </article>
          <article className="art-card card-side">
            <div className="art-label">02 / PRODUCT STORY</div>
            <div className="earbud-shape"><i /><i /></div>
            <strong>NOISE OFF.<br />WORLD ON.</strong>
          </article>
          <article className="glass-note">
            <span>Selected work</span><strong>2024—26</strong><small>Campaigns that look sharp and communicate faster.</small>
          </article>
          <div className="floating-tag">DESIGN / DIRECTION / DELIVERY</div>
        </div>
      </section>

      <div className="discipline-strip" aria-label="Design services">
        <div>
          META ADS <b>✦</b> PRODUCT LISTINGS <b>✦</b> SOCIAL MEDIA <b>✦</b> BANNERS <b>✦</b> THUMBNAILS <b>✦</b> CAMPAIGN DESIGN <b>✦</b>
          META ADS <b>✦</b> PRODUCT LISTINGS <b>✦</b> SOCIAL MEDIA <b>✦</b> BANNERS <b>✦</b> THUMBNAILS <b>✦</b> CAMPAIGN DESIGN <b>✦</b>
        </div>
      </div>

      <section className="section work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="section-index">01 / SELECTED WORK</p>
            <h2>Campaigns with<br /><em>a point of view.</em></h2>
          </div>
          <p>Concept-led work across performance creative, e-commerce, social systems and digital campaigns.</p>
        </div>

        <div className="filter-bar" role="toolbar" aria-label="Filter portfolio projects">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? "active" : ""}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filteredProjects.map((project) => (
            <button
              type="button"
              className="project-card"
              key={project.id}
              onClick={() => setSelectedProject(project)}
              aria-label={`Open ${project.title} concept case study`}
            >
              <ProjectVisual project={project} />
              <span className="project-info">
                <span><b>{project.title}</b><small>{project.brand} · Concept Project</small></span>
                <span><small>{project.category}</small><b>{project.year} ↗</b></span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="section campaign-lab">
        <div className="section-heading compact">
          <div>
            <p className="section-index">02 / PERFORMANCE CREATIVE</p>
            <h2>One idea.<br /><em>Built to flex.</em></h2>
          </div>
          <p>A campaign system that can move from bold awareness to clear product benefits and offer-led creative.</p>
        </div>
        <div className="ad-lab-grid">
          <article className="ad-tile ad-one"><span>01 / AWARENESS</span><div className="ad-product">LUMA</div><strong>GLOW<br />FORWARD.</strong><small>NEW FORMULA</small></article>
          <article className="ad-tile ad-two"><span>02 / BENEFIT</span><div className="ad-bubbles"><i /><i /><i /></div><strong>3× HYDRATION.<br />ZERO HEAVINESS.</strong><small>CLINICALLY TESTED*</small></article>
          <article className="ad-tile ad-three"><span>03 / OFFER</span><div className="ad-ring">20%</div><strong>YOUR ROUTINE,<br />UPGRADED.</strong><small>CONCEPT CREATIVE</small></article>
        </div>
        <p className="concept-note">*Demonstration copy for a fictional concept brand. No performance or clinical claims are presented as real.</p>
      </section>

      <section className="section listing-story">
        <div className="section-heading light-heading">
          <div>
            <p className="section-index">03 / E-COMMERCE STORYTELLING</p>
            <h2>A listing that<br /><em>answers before asked.</em></h2>
          </div>
          <p>Every frame has a job: attract, explain, reassure and help the customer compare.</p>
        </div>
        <div className="listing-track">
          {[
            ["01", "HERO", "See the product clearly"],
            ["02", "BENEFITS", "Understand the value fast"],
            ["03", "FEATURES", "Turn specs into outcomes"],
            ["04", "LIFESTYLE", "Picture it in real life"],
            ["05", "COMPARE", "Make the choice easier"],
            ["06", "IN THE BOX", "Know exactly what arrives"],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span><div className={`listing-object object-${number}`}><i /><b /></div><strong>{title}</strong><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="section-heading">
          <div>
            <p className="section-index">04 / SERVICES</p>
            <h2>Design support<br /><em>where it matters.</em></h2>
          </div>
          <p>Focused visual design for launches, daily marketing and the moments when your brand needs more attention.</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div>{service.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
              <a href="#contact" aria-label={`Inquire about ${service.title}`}>Discuss this service <b>↗</b></a>
            </article>
          ))}
        </div>
      </section>

      <section className="section toolkit-section" id="toolkit">
        <div className="section-heading compact">
          <div>
            <p className="section-index">05 / CREATIVE TOOLKIT</p>
            <h2>Ideas are the point.<br /><em>Tools make them real.</em></h2>
          </div>
          <p>A flexible production toolkit for image-making, layouts, brand systems and campaign delivery.</p>
        </div>
        <div className="tools-grid">
          {tools.map(([mark, name, detail], index) => (
            <article className="tool-card" key={name}>
              <span className="tool-mark">{mark}</span>
              <span><b>{name}</b><small>{detail}</small></span>
              <i>{String(index + 1).padStart(2, "0")}</i>
            </article>
          ))}
        </div>
        <p className="tool-note">Software cards are editable and should be adjusted to match verified proficiency before publication.</p>
      </section>

      <section className="section process-section">
        <div className="section-heading">
          <div>
            <p className="section-index">06 / PROCESS</p>
            <h2>Clear steps.<br /><em>Better outcomes.</em></h2>
          </div>
          <p>A collaborative process designed to keep the idea strong and the delivery straightforward.</p>
        </div>
        <div className="process-line">
          {[
            ["01", "Discover", "Goals, audience, formats and what success should look like."],
            ["02", "Define", "A focused visual direction and clear hierarchy for the message."],
            ["03", "Design", "Exploration, systems and polished creative across key formats."],
            ["04", "Refine", "Focused feedback rounds that improve the work without diluting it."],
            ["05", "Deliver", "Organised, production-ready files for every agreed placement."],
          ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-portrait" aria-label="Abstract portrait placeholder ready to replace with Smit's photo">
          <div className="portrait-glow" /><span>PORTRAIT<br />COMING SOON</span><i>SMIT / DESIGNER</i>
        </div>
        <div className="about-copy">
          <p className="section-index">07 / ABOUT</p>
          <h2>Curious mind.<br /><em>Sharp eye.</em></h2>
          <p className="about-lead">
            I&apos;m Smit, an independent graphic designer focused on turning
            marketing messages into visual ideas people notice and understand.
          </p>
          <p>
            My work lives where brand, campaign and performance creative meet:
            from product listings and Meta ads to social systems, banners and
            thumbnails. I care about strong hierarchy, thoughtful details and
            files that are genuinely useful after delivery.
          </p>
          <div className="about-facts">
            <span><small>FOCUS</small>Digital campaigns & e-commerce</span>
            <span><small>WORKING STYLE</small>Clear, collaborative, detail-led</span>
            <span><small>AVAILABILITY</small>Freelance & remote projects</span>
          </div>
          <a className="text-link" href="#contact">Have a project in mind? Let&apos;s talk <b>↗</b></a>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-intro">
          <p className="section-index">08 / START A PROJECT</p>
          <h2>Let&apos;s make<br /><em>something noticed.</em></h2>
          <p>Tell me what you&apos;re building, what you need and where the design needs to work.</p>
          <a href={`mailto:${siteDetails.email}`}>{siteDetails.email} <span>↗</span></a>
          <div className="contact-status"><i /> Currently open to selected freelance projects</div>
        </div>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <label>Your name<input name="name" autoComplete="name" required placeholder="Your full name" /></label>
            <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
          </div>
          <label>Company or brand<input name="brand" autoComplete="organization" placeholder="Optional" /></label>
          <div className="field-row">
            <label>Service needed
              <select name="service" required defaultValue="">
                <option value="" disabled>Select a service</option>
                <option>Meta Ads</option><option>Product Listing Images</option><option>Social Media Design</option>
                <option>Banners & Campaigns</option><option>YouTube Thumbnails</option><option>Custom Design Support</option>
              </select>
            </label>
            <label>Estimated budget
              <select name="budget" required defaultValue="">
                <option value="" disabled>Select a range</option>
                <option>Let&apos;s discuss</option><option>Under ₹10,000</option><option>₹10,000–₹25,000</option>
                <option>₹25,000–₹50,000</option><option>₹50,000+</option>
              </select>
            </label>
          </div>
          <label>Desired timeline<input name="timeline" placeholder="For example: within 3 weeks" /></label>
          <label>Project details<textarea name="details" required rows={5} placeholder="Share the goal, required formats and anything else that will help..." /></label>
          <label className="consent"><input type="checkbox" required /> <span>I agree to be contacted about this project. No information will be shared with third parties.</span></label>
          <button className="submit-button" type="submit">Create email inquiry <span>↗</span></button>
          {submitted && <p className="form-success" role="status">Your email app should now open with the inquiry details prepared.</p>}
        </form>
      </section>

      <footer>
        <a className="brand" href="#top"><span className="brand-mark">SP</span><span>Smit / Visual Designer</span></a>
        <p>Meta Ads · Product Listings · Social Media · Campaign Design</p>
        <div>
          <a href={`mailto:${siteDetails.email}`}>Email</a>
          {siteDetails.instagramUrl && <a href={siteDetails.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>}
          <a href="#top">Back to top ↑</a>
        </div>
        <small>© {new Date().getFullYear()} Smit. Concept projects are clearly labelled.</small>
      </footer>

      {siteDetails.whatsappUrl && (
        <a className="whatsapp-button" href={siteDetails.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contact Smit on WhatsApp">
          <span>WA</span> Let&apos;s chat
        </a>
      )}

      {selectedProject && (
        <dialog
          open
          className="project-modal"
          aria-labelledby="project-modal-title"
          onCancel={() => setSelectedProject(null)}
        >
          <div className="modal-panel">
            <button ref={modalCloseRef} className="modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close case study">Close ×</button>
            <ProjectVisual project={selectedProject} large />
            <div className="modal-copy">
              <p className="section-index">{selectedProject.category} / {selectedProject.year}</p>
              <h2 id="project-modal-title">{selectedProject.title}</h2>
              <p className="modal-lead">{selectedProject.summary}</p>
              <div className="modal-columns">
                <div><small>THE CHALLENGE</small><p>Create a visual system that communicates quickly across different placements while keeping one recognisable campaign idea.</p></div>
                <div><small>THE APPROACH</small><p>Use strong hierarchy, a tight palette and modular layouts so every format feels connected without becoming repetitive.</p></div>
              </div>
              <div className="deliverable-list">{selectedProject.deliverables.map((item) => <span key={item}>{item}</span>)}</div>
              <p className="concept-note">This is a self-initiated concept project created to demonstrate design thinking and execution.</p>
              <a className="button button-primary" href="#contact" onClick={() => setSelectedProject(null)}>Start a similar project ↗</a>
            </div>
          </div>
        </dialog>
      )}
    </main>
  );
}
