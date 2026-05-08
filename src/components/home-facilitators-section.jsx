export function HomeFacilitatorsSection({ facilitators }) {
  return (
    <section id="facilitators">
      <div className="section-tag">08 - Facilitators</div>
      <h2 className="section-title">
        Meet the <em>facilitators.</em>
      </h2>
      <p className="section-lead">
        A lineup of facilitators bringing real-world perspectives across leadership, public health,
        execution, and impact-driven work.
      </p>
      <div className="facilitators-grid facilitators-grid-expanded">
        {facilitators.map((facilitator) => (
          <article key={facilitator.name} className="facilitator-card facilitator-card-expanded">
            <div className="facilitator-photo">
              <img src={facilitator.image} alt={facilitator.name} />
            </div>
            <div className="facilitator-card-body">
              <div className="facilitator-card-meta">
                <div className="facilitator-card-name">{facilitator.name}</div>
              </div>
              <div
                className="facilitator-bio"
                dangerouslySetInnerHTML={{ __html: facilitator.bioHtml }}
              />
              <div className="facilitator-impact-block">
                <div className="facilitator-impact-label">Impact Footprint</div>
                <div className="facilitator-impact-list">
                  {facilitator.projects.length ? (
                    facilitator.projects.map((project) => (
                      <section key={`${facilitator.name}-${project.title}`} className="facilitator-impact-project">
                        <h3 className="facilitator-impact-title">{project.title}</h3>
                        <div className="facilitator-impact-gallery">
                          {project.images.map((image) => (
                            <a
                              key={image.src}
                              className="facilitator-impact-thumb"
                              href={image.src}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${project.title} image`}
                            >
                              <img src={image.src} alt={project.title} />
                            </a>
                          ))}
                        </div>
                      </section>
                    ))
                  ) : (
                    <div className="facilitator-impact-empty">
                      Impact footprints for this facilitator will appear here soon.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
