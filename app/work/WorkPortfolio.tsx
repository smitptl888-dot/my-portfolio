"use client";

/* eslint-disable @next/next/no-img-element -- Local portfolio artwork is already optimized and shown at its intended proportions. */

import { useCallback, useEffect, useMemo, useState } from "react";
import ProjectDialog from "../components/ProjectDialog";
import StudioHeader from "../components/StudioHeader";
import { categories, projects, type Project } from "../portfolio-data";

export default function WorkPortfolio() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const filteredProjects = useMemo(
    () => activeCategory === "All" ? projects : projects.filter((item) => item.category === activeCategory),
    [activeCategory],
  );
  const selectedIndex = selectedProject ? projects.findIndex((item) => item.id === selectedProject.id) : -1;
  const nextProject = selectedIndex >= 0 ? projects[(selectedIndex + 1) % projects.length] : null;

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
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <main className="mondragon-portfolio work-page">
      <StudioHeader current="work" />
      <section className="work-page-hero">
        <span className="corner-marks" aria-hidden="true"><i /><i /><i /><i /></span>
        <p>All work / 24 selected visuals</p>
        <h1 aria-label="Works"><span>WORKS</span></h1>
        <div className="work-hero-meta"><strong>All Work</strong><span>Posters · Brand visuals · Social creatives · Campaign artwork</span></div>
        <a href="#all-work">Explore projects <i>⌄</i></a>
      </section>

      <section className="work-index work-page-index" id="all-work">
        <div className="work-index-title" data-reveal><p>Work index</p><h2>ALL SELECTED<br /><em>VISUALS.</em></h2><span>Filter by category</span></div>
        <div className="filter-bar studio-filter" role="toolbar" aria-label="Filter selected work">
          {categories.map((category) => (
            <button key={category} type="button" className={activeCategory === category ? "active" : ""} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}<span>{String(category === "All" ? projects.length : projects.filter((item) => item.category === category).length).padStart(2, "0")}</span></button>
          ))}
        </div>
        <div className="index-grid">
          {filteredProjects.map((item, index) => (
            <button type="button" key={item.id} className={`index-card index-${item.layout}`} onClick={() => setSelectedProject(item)} aria-label={`Open ${item.title}`} data-reveal>
              <figure><img src={item.image} alt={item.alt} loading={index < 4 ? "eager" : "lazy"} decoding="async" /><span>View ↗</span></figure>
              <div><span>{String(item.id).padStart(2, "0")} / {item.category}</span><h3>{item.title}</h3></div>
            </button>
          ))}
        </div>
      </section>

      <footer className="studio-footer work-footer">
        <span className="corner-marks" aria-hidden="true"><i /><i /><i /><i /></span>
        <div className="footer-word"><span>YOUR</span><span>IDEA?</span></div>
        <p>LET&apos;S TURN IT INTO A STRONG VISUAL</p>
        <a className="work-contact-link" href="/contact">Start a project <i>↗</i></a>
      </footer>

      <ProjectDialog project={selectedProject} nextProject={nextProject} onClose={closeProject} onNext={() => { if (nextProject) setSelectedProject(nextProject); }} />
    </main>
  );
}
