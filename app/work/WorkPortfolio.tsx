"use client";
import { MotionProvider } from "../components/MotionProvider";


import { useState } from "react";
import { useSearchParams } from "next/navigation";
import StudioHeader from "../components/PageHeader";
import RadialPosterStage from "../components/TypographyTrail";
import ProjectDialog from "../components/ProjectDialog";
import { ContactCTA, Marquee, SectionLabel, StudioFooter } from "../components/StudioElements";
import { categories } from "../portfolio-data";
import { workProjects as projects, type GalleryProject } from "../work-gallery-data";
import "./work-gallery.css";
export default function WorkPortfolio() {
  const params = useSearchParams();
  const requested = params.get("category");
  const active = categories.find(category => category === requested) ?? "All";
  const filtered = active === "All" ? projects : projects.filter(project => project.category === active);
  const [selected, setSelected] = useState<GalleryProject | null>(null);
  const close = () => setSelected(null);
  const next = selected ? filtered[(filtered.findIndex(project => project.id === selected.id) + 1) % filtered.length] : null;
  return <MotionProvider><StudioHeader current="work" /><main id="main-content" tabIndex={-1}>
    <section className="sub-page-hero sub-work-hero"><p className="sub-eyebrow">Selected work / Graphic design</p><h1>ALL<br /><em>WORK.</em></h1><RadialPosterStage /><div className="sub-page-hero-bottom"><span>24 collections / 06 disciplines</span><p>Posters, brand visuals, social creatives, campaign artwork, and layout design.</p><a href="#project-index">Browse the index ↓</a></div></section>
    <Marquee text="POSTERS — IDENTITY — CAMPAIGNS — SOCIAL — TYPOGRAPHY — " />
    <section className="sub-section project-index sub-work-archive" id="project-index"><SectionLabel number="01">Project index</SectionLabel><div className="sub-index-heading"><h2 className="sub-display-heading">SELECTED<br /><em>DIRECTIONS.</em></h2><p className="sub-project-count" aria-live="polite"><strong>{String(filtered.length).padStart(2, "0")}</strong> collections</p></div>
      <p className="sub-collection-note">Selected experience: Cocoon Care · The Book Club (Amazon Store). Explore the artwork by design discipline.</p>
      <nav className="sub-filter-list" aria-label="Filter projects">{categories.map(category => <a key={category} href={category === "All" ? "/work#project-index" : `/work?category=${encodeURIComponent(category)}#project-index`} aria-current={active === category ? "true" : undefined}>{category}<small>{category === "All" ? projects.length : projects.filter(project => project.category === category).length}</small></a>)}</nav>
      <div className="sub-project-grid">{filtered.map(project => <button type="button" className="sub-project-entry" key={project.id} onClick={() => setSelected(project)} aria-label={`View ${project.title}`}>
        <span className="sub-project-entry-top"><span className="work-index-number" aria-hidden="true">{String(project.id).padStart(2, "0")}</span><small>{project.category}</small><i aria-hidden="true">↗</i></span>
        <span className="sub-project-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
          <span className="work-cover-count">{String(project.artworks.length).padStart(2, "0")} visuals</span>
          <span className="work-cover-invitation" aria-hidden="true">VIEW<br /><em>collection</em> ↗</span>
        </span>
        <h3>{project.title}</h3><p>{project.description}</p><span className="sub-project-entry-bottom">{project.tools.join(" / ")}<span>Explore collection ↗</span></span>
      </button>)}</div>
    </section><ContactCTA />
    <ProjectDialog project={selected} nextProject={next} onClose={close} onNext={() => setSelected(next)} />
  </main><StudioFooter /></MotionProvider>;
}
