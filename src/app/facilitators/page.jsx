import Link from "next/link";
import { FacilitatorsPageContent } from "@/components/facilitators-page-content";
import { SiteHeader } from "@/components/site-header";
import { getFacilitators } from "@/lib/content";

export default function FacilitatorsPage() {
  const facilitators = getFacilitators();

  return (
    <div className="app-shell facilitators-page">
      <div className="grid-bg" />
      <div className="noise" />
      <SiteHeader />

      <main className="page-shell">
        <section className="facilitators-page">
          <div className="facilitators-intro">
            <div>
              <div className="page-accent-copy">Pan African Project and Event Management Masterclass</div>
              <div className="facilitators-kicker">Dreamers to Doers / Facilitators</div>
              <h1 className="section-title">
                Meet the <em>facilitators.</em>
              </h1>
              <p className="section-lead">
                A lineup of facilitators bringing real-world perspectives across leadership, public
                health, execution, and impact-driven work.
              </p>
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
              <div className="facilitators-actions" style={{ marginTop: 18 }}>
                <Link href="/" className="btn-secondary">
                  Back Home
                </Link>
                <Link href="/#register" className="btn-primary">
                  Register Now
                </Link>
              </div>
            </div>
          </div>

          <FacilitatorsPageContent facilitators={facilitators} />

          <section className="page-promo">
            <div className="page-promo-grid">
              <div className="page-promo-copy">
                <div className="section-tag">Masterclass Flier</div>
                <h3>
                  Open the complete masterclass flier after meeting the <em>facilitators.</em>
                </h3>
                <p>
                  Review the event summary, key dates, and pricing details in one view before moving
                  to registration.
                </p>
              </div>
              <a
                className="flier-card"
                href="/images/flier.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Dreamers to Doers flier from facilitators page"
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
