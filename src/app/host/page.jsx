import Link from "next/link";
import { HostProjects } from "@/components/host-projects";
import { SiteHeader } from "@/components/site-header";
import { getHost } from "@/lib/content";

export default function HostPage() {
  const host = getHost();

  return (
    <div className="app-shell">
      <div className="grid-bg" />
      <div className="noise" />
      <SiteHeader />

      <main className="page-shell">
        <section className="covener-page">
          <div className="covener-intro">
            <div>
              <div className="page-accent-copy">Pan African Project and Event Management Masterclass</div>
              <div className="covener-kicker">Dreamers to Doers / Host</div>
              <h1 className="section-title">
                Meet the <em>Host.</em>
              </h1>
            </div>
            <div className="page-flier">
              <a
                className="flier-card"
                href="/images/flier.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Dreamers to Doers flier"
              >
                <img src="/images/flier.jpeg" alt="Dreamers to Doers masterclass flier" />
              </a>
              <div className="covener-actions" style={{ marginTop: 18 }}>
                <Link href="/" className="btn-secondary">
                  Back Home
                </Link>
                <Link href="/#register" className="btn-primary">
                  Register Now
                </Link>
              </div>
            </div>
          </div>

          <div className="covener-card">
            <div className="covener-photo-shell">
              <div className="covener-photo">
                <img src={host.image} alt={host.name} />
              </div>
            </div>

            <div>
              <div className="covener-name">{host.name}</div>
              <div className="covener-role">{host.role}</div>
              {host.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 20)} className="covener-copy">
                  {paragraph}
                </p>
              ))}

              <div className="covener-metrics">
                {host.metrics.map((metric) => (
                  <div key={metric.label} className="covener-metric">
                    <div className="covener-metric-num">{metric.value}</div>
                    <div className="covener-metric-label">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="covener-impact-section">
            <div className="section-tag">Impact Footprints</div>
            <h2 className="section-title">
              Explore Anna&apos;s <em>impact footprints.</em>
            </h2>

            <div className="covener-impact-list" id="covener-impact-list">
              <HostProjects projects={host.projects} />
            </div>
          </div>

          <section className="page-promo">
            <div className="page-promo-grid">
              <div className="page-promo-copy">
                <div className="section-tag">Masterclass Flier</div>
                <h3>
                  Review the full masterclass flier before you <em>register.</em>
                </h3>
                <p>
                  See the complete program summary, schedule, and offer details in one place before
                  securing a seat.
                </p>
              </div>
              <a
                className="flier-card"
                href="/images/flier.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Dreamers to Doers flier from host page"
              >
                <img src="/images/flier.jpeg" alt="Dreamers to Doers masterclass flier" />
              </a>
            </div>
            <div className="page-accent-copy page-accent-copy--end">
              Pan African Project and Event Management Masterclass
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
