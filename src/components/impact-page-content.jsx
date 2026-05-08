"use client";

import { GalleryLightbox } from "@/components/gallery-lightbox";

export function ImpactPageContent({ profiles }) {
  return (
    <div className="impact-list" id="impact-list">
      {profiles.map((profile) => (
        <article key={profile.name} className="impact-card">
          <div className="impact-photo">
            <img src={profile.image} alt={profile.name} />
          </div>
          <div>
            <h2 className="impact-name">{profile.name}</h2>
            <div className="impact-highlight">{profile.highlight}</div>
            {profile.projects.length ? (
              <div className="impact-projects">
                {profile.projects.map((project) => (
                  <section key={`${profile.name}-${project.title}`} className="impact-project">
                    <h3 className="impact-project-title">{project.title}</h3>
                    <GalleryLightbox
                      items={project.images}
                      alt={project.title}
                      classNamePrefix="impact"
                    />
                  </section>
                ))}
              </div>
            ) : (
              <div className="impact-empty">
                Impact images for this facilitator will appear here as soon as the corresponding
                folders are added.
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
