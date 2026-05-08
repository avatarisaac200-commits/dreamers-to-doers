"use client";

import { useState } from "react";
import { GalleryLightbox } from "@/components/gallery-lightbox";

function FacilitatorProjects({ projects }) {
  if (!projects.length) {
    return (
      <div className="facilitator-impact-empty">
        Impact footprints for this facilitator will appear here soon.
      </div>
    );
  }

  return projects.map((project) => (
    <section key={project.title} className="facilitator-impact-project">
      <h3 className="facilitator-impact-title">{project.title}</h3>
      <GalleryLightbox
        items={project.images}
        alt={project.title}
        classNamePrefix="facilitator-impact"
      />
    </section>
  ));
}

export function FacilitatorsPageContent({ facilitators }) {
  const [openBio, setOpenBio] = useState({});

  return (
    <div className="facilitators-grid" id="facilitators-grid">
      {facilitators.map((facilitator, index) => {
        const panelId = `facilitator-bio-${index + 1}`;
        const expanded = Boolean(openBio[panelId]);

        return (
          <article key={facilitator.name} className="facilitator-feature">
            <div className="facilitator-profile">
              <div className="facilitator-photo-shell">
                <div className="facilitator-photo facilitator-photo-large">
                  <img src={facilitator.image} alt={facilitator.name} />
                </div>
              </div>
              <div className="facilitator-profile-content">
                <div className="facilitator-profile-label">Facilitator Profile</div>
                <div className="facilitator-card-meta facilitator-card-meta-host">
                  <div className="facilitator-card-name">{facilitator.name}</div>
                  <div className="facilitator-card-tag">{facilitator.tag}</div>
                </div>
                <div className="facilitator-profile-actions">
                  <button
                    className="facilitator-bio-toggle"
                    type="button"
                    aria-expanded={expanded}
                    onClick={() =>
                      setOpenBio((current) => ({ ...current, [panelId]: !current[panelId] }))
                    }
                  >
                    {expanded ? "HIDE BIO" : "BIO"}
                  </button>
                </div>
                {expanded ? (
                  <div className="facilitator-bio-panel" id={panelId}>
                    <div
                      className="facilitator-bio"
                      dangerouslySetInnerHTML={{ __html: facilitator.bioHtml }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="facilitator-impact-section facilitator-impact-section-host">
              <div className="section-tag">Impact Footprints</div>
              <h2 className="facilitator-impact-heading">
                Explore {facilitator.name.split(" ")[0]}&apos;s <em>impact footprints.</em>
              </h2>
              <div className="facilitator-impact-list facilitator-impact-list-host">
                <FacilitatorProjects projects={facilitator.projects} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
