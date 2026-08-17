"use client";

/* eslint-disable @next/next/no-img-element -- Project artwork is local, optimized, and shown without image-service transformations. */

import { useEffect, useRef } from "react";
import type { Project } from "../portfolio-data";

type ProjectDialogProps = {
  project: Project | null;
  nextProject: Project | null;
  onClose: () => void;
  onNext: () => void;
};

export default function ProjectDialog({ project, nextProject, onClose, onNext }: ProjectDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>(
          ".project-dialog button:not([disabled]), .project-dialog a[href]",
        ));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
      previousFocusRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
      <button className="dialog-backdrop" type="button" onClick={onClose} aria-label="Close project" />
      <article className="dialog-panel">
        <header className="dialog-header">
          <span>Smit Patel / Selected work</span>
          <button ref={closeButtonRef} type="button" onClick={onClose}>Close <i aria-hidden="true">×</i></button>
        </header>

        <div className="dialog-hero">
          <img src={project.heroImage} alt={project.alt} />
          <span>{String(project.id).padStart(2, "0")} / {project.category}</span>
        </div>

        <div className="dialog-copy">
          <div>
            <p className="section-kicker">{project.projectType}</p>
            <h2 id="project-dialog-title">{project.title}</h2>
          </div>
          <div className="dialog-overview">
            <p>{project.description}</p>
            <dl>
              <div><dt>Category</dt><dd>{project.category}</dd></div>
              <div><dt>Services</dt><dd>{project.services.join(" · ")}</dd></div>
              <div><dt>Toolkit</dt><dd>{project.tools.join(" · ")}</dd></div>
            </dl>
          </div>
        </div>

        <div className="dialog-gallery">
          {project.gallery.map((image, index) => (
            <figure key={`${project.slug}-${index}`}>
              <img src={image} alt={index === 0 ? project.alt : `${project.title} project detail ${index + 1}`} />
            </figure>
          ))}
        </div>

        {nextProject ? (
          <button className="next-project" type="button" onClick={onNext}>
            <span>Next project</span>
            <strong>{nextProject.title}</strong>
            <i aria-hidden="true">↗</i>
          </button>
        ) : null}
      </article>
    </div>
  );
}
