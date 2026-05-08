import Link from "next/link";
import { ImpactPageContent } from "@/components/impact-page-content";
import { SiteHeader } from "@/components/site-header";
import { getImpactProfiles } from "@/lib/content";

export default function ImpactFootprintsPage() {
  const profiles = getImpactProfiles();

  return (
    <div className="app-shell">
      <div className="grid-bg" />
      <div className="noise" />
      <SiteHeader />

      <main className="page-shell">
        <section className="impact-page">
          <div className="impact-intro">
            <div>
              <div className="impact-kicker">Dreamers to Doers / Impact Footprints</div>
              <h1 className="section-title">
                Impact <em>footprints.</em>
              </h1>
              <p className="section-lead">
                A visual record of a few projects, events, and community initiatives each
                facilitator led from idea to tremendous execution.
              </p>
            </div>
            <div className="impact-actions">
              <Link href="/facilitators/" className="btn-secondary">
                Back to Facilitators
              </Link>
              <Link href="/#register" className="btn-primary">
                Register Now
              </Link>
            </div>
          </div>

          <ImpactPageContent profiles={profiles} />
        </section>
      </main>
    </div>
  );
}
