"use client";
import { MotionProvider } from "../components/MotionProvider";


import { useState } from "react";
import { useSearchParams } from "next/navigation";
import StudioHeader from "../components/PageHeader";
import RadialPosterStage from "../components/TypographyTrail";
import ProjectDialog from "../components/ProjectDialog";
import { ContactCTA, StudioFooter } from "../components/StudioElements";
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
    <section className="sub-page-hero sub-work-hero"><p className="sub-eyebrow">Selected work / Graphic design</p><h1>ALL<br /><em>WORK.</em></h1><RadialPosterStage /><div className="sub-page-hero-bottom"><span>Design portfolio / Smit Patel</span><p>Posters, brand visuals, social creatives, campaign artwork, and layout design.</p><a href="#project-index">Explore the work</a></div></section>
    <section className="project-index sub-work-archive" id="project-index">
      <div className="work-index-masthead">
        <div className="work-index-title">
          <h2 className="sub-display-heading">Selected <em>work.</em></h2>
          <p>Selected experience<br />Cocoon Care · The Book Club (Amazon Store)</p>
        </div>
        <nav className="sub-filter-list" aria-label="Filter projects">{categories.map(category => <a key={category} href={category === "All" ? "/work#project-index" : `/work?category=${encodeURIComponent(category)}#project-index`} aria-current={active === category ? "true" : undefined}>{category === "All" ? "All work" : category}</a>)}</nav>
      </div>
      <div className="sub-project-grid">{filtered.map(project => <button type="button" className="sub-project-entry" key={project.id} onClick={() => setSelected(project)} aria-label={`View ${project.title}`}>
        <span className="sub-project-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
        </span>
        <div className="work-project-copy">
          <small className="work-project-discipline">{project.category}</small>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <span className="work-project-action" aria-hidden="true">View artwork</span>
        </div>
      </button>)}</div>
    </section><ContactCTA />
    <ProjectDialog project={selected} nextProject={next} onClose={close} onNext={() => setSelected(next)} />
  </main><StudioFooter /></MotionProvider>;
}
