"use client";

import { GalleryLightbox } from "@/components/gallery-lightbox";

export function HostProjects({ projects }) {
  if (!projects.length) {
    return (
      <div className="covener-impact-error">
        Host impact footprints could not be loaded right now. Please try again shortly.
      </div>
    );
  }

  return projects.map((project) => (
    <section key={project.title} className="covener-impact-project">
      <h3 className="covener-impact-project-title">{project.title}</h3>
      {project.images.length ? (
        <GalleryLightbox
          items={project.images}
          alt={project.title}
          classNamePrefix="covener-impact"
        />
      ) : (
        <div className="covener-impact-empty">
          Add JPG or JPEG images to this folder and they will appear here.
        </div>
      )}
    </section>
  ));
}
