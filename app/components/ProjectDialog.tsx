"use client";

import { useEffect, useRef } from "react";
import type { GalleryProject } from "../work-gallery-data";
import imageSizes from "../work-image-sizes.json";
const dimensions = imageSizes as Record<string, number[]>;
type Props = { project: GalleryProject | null; nextProject: GalleryProject | null; onClose: () => void; onNext: () => void };
export default function ProjectDialog({ project, nextProject, onClose, onNext }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = project !== null;
  useEffect(() => {
    const node = dialog.current;
    if (isOpen) { node?.showModal(); document.body.style.overflow = "hidden"; }
    else node?.close();
    return () => { document.body.style.removeProperty("overflow"); };
  }, [isOpen]);
  useEffect(() => {
    if (dialog.current) {
      dialog.current.scrollTop = 0;
      dialog.current.querySelector<HTMLElement>("#project-dialog-title")?.focus({ preventScroll: true });
    }
  }, [project?.id]);
  return <dialog ref={dialog} className="sub-project-dialog work-gallery-dialog" aria-labelledby="project-dialog-title" onClose={onClose}>
    {project ? <article className="sub-dialog-panel">
      <header><span><b aria-hidden="true">✳</b> Selected work / {String(project.id).padStart(2, "0")}</span><button type="button" onClick={onClose} aria-label="Close project">Close <span aria-hidden="true">×</span></button></header>
      <div className="work-gallery-intro" key={project.id}>
        <div className="work-gallery-kicker"><p className="sub-eyebrow">{project.category}</p><span>{String(project.artworks.length).padStart(2, "0")} visuals / Collection</span></div>
        <div className="work-gallery-title"><h2 id="project-dialog-title" tabIndex={-1}>{project.title}</h2><span aria-hidden="true">{String(project.id).padStart(2, "0")}</span></div>
        <div className="work-gallery-summary"><span aria-hidden="true">THE DIRECTION <i>↘</i></span><p className="sub-body-large">{project.description}</p></div>
      </div>
      <div className="work-gallery-rail"><span>ARTWORK IN FOCUS</span><span>Scroll to explore ↓</span></div>
      <div className="sub-artwork-gallery" aria-label={`${project.title} artwork gallery`}>
        {project.artworks.map((artwork, index) => <figure key={artwork.src} className="sub-artwork-figure" data-wide={index === 0 || (dimensions[artwork.src]?.[0] ?? 1) / (dimensions[artwork.src]?.[1] ?? 1) > 1.6 ? "true" : undefined}>
          <div className="work-artwork-mount">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={artwork.src} alt={artwork.title} width={dimensions[artwork.src]?.[0]} height={dimensions[artwork.src]?.[1]} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
          </div>
          <figcaption><span><b>{String(index + 1).padStart(2, "0")}</b> {artwork.title}{artwork.brand ? ` / ${artwork.brand}` : ""}</span><small>{artwork.provenance}</small></figcaption>
        </figure>)}
      </div>
      <p className="sub-collection-note work-gallery-provenance">{project.collectionNote}</p>
      <dl><div><dt>Services</dt><dd>{project.services.join(" / ")}</dd></div><div><dt>Toolkit</dt><dd>{project.tools.join(" / ")}</dd></div><div><dt>Project type</dt><dd>{project.projectType}</dd></div></dl>
      <a href="/contact#inquiry" className="sub-text-link" onClick={onClose}>Discuss a similar project <span>↗</span></a>
      {nextProject && nextProject.id !== project.id ? <button type="button" className="sub-next-project" onClick={onNext}><small>Next project</small><strong>{nextProject.title}</strong><span>→</span></button> : null}
    </article> : null}
  </dialog>;
}
