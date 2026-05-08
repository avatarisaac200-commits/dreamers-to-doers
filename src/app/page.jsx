import Link from "next/link";
import { Countdown } from "@/components/countdown";
import { HomeFacilitatorsSection } from "@/components/home-facilitators-section";
import { RegistrationForm } from "@/components/registration-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFacilitators } from "@/lib/content";

export default function HomePage() {
  const facilitators = getFacilitators();

  return (
    <div className="app-shell" id="top">
      <div className="grid-bg" />
      <div className="noise" />
      <SiteHeader showHomeLinks />

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="page-accent-copy">Pan African Project and Event Management Masterclass</div>
            <div className="hero-meta">Dreamers to Doers · June 2026</div>
            <h1 className="hero-title">
              Dreamers
              <br />
              <em>to Doers.</em>
            </h1>
            <p className="hero-sub">
              A Premium Masterclass on <strong>Designing, Funding and Executing</strong> World class
              events and social impact projects.
            </p>
            <div className="hero-cta-row">
              <a href="#register" className="btn-primary">
                Secure My Seat
              </a>
              <a href="#curriculum" className="btn-secondary">
                View Curriculum
              </a>
              <Link href="/host/" className="btn-secondary">
                Meet the Host
              </Link>
              <Link href="/facilitators/" className="btn-secondary">
                Meet the Facilitators
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <a
              className="flier-card hero-flier"
              href="/images/flier.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Dreamers to Doers flier"
            >
              <img src="/images/flier.jpeg" alt="Dreamers to Doers masterclass flier" />
            </a>
            <div className="floating-badge">
              <span className="badge-dot" />
              <div className="badge-text">
                <strong>Special Early Bird Rate</strong>
                <span>₦9,999 · First 30 Registrations</span>
              </div>
            </div>
          </div>
        </section>

        <div className="stats">
          <div className="stats-inner">
            <div className="stat-item">
              <div className="stat-num">
                3<span className="suf">Days</span>
              </div>
              <div className="stat-label">Intensive Masterclass</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                100<span className="suf">+</span>
              </div>
              <div className="stat-label">Seats Per Cohort</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                3<span className="suf">hrs</span>
              </div>
              <div className="stat-label">Per Day, Live Sessions</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                Africa<span className="suf">-first</span>
              </div>
              <div className="stat-label">Context &amp; Relevance</div>
            </div>
          </div>
        </div>

        <section className="problem-section" style={{ maxWidth: "none", padding: 0 }}>
          <div className="problem-wrap">
            <h2 className="problem-headline">
              Africa doesn&apos;t lack <span className="dim">dreamers.</span>
              <br />
              It lacks <em>equipped doers.</em>
            </h2>
            <p className="problem-body">
              Promising initiatives stall. Events underdeliver. Transformative social projects never
              reach their potential - not because of a lack of passion, but because of a{" "}
              <strong>
                critical deficit in practical knowledge, structured frameworks, and execution
                competency.
              </strong>
            </p>
            <p className="problem-body" style={{ marginTop: 20 }}>
              Dreamers to Doers was built specifically to close that gap - with precision, depth,
              and a relentless focus on real-world application.
            </p>
            <div className="problem-stamp">
              The masterclass that delivers the blueprint for turning ideas to impact
            </div>
          </div>
        </section>

        <section id="curriculum">
          <div className="section-tag">01 · Curriculum</div>
          <h2 className="section-title">
            3 Days. <em>End-to-end</em> execution.
          </h2>
          <p className="section-lead">
            Design + Positioning + Funding + Resource Mobilisation + Execution Readiness. No gaps.
            No fragmented knowledge.
          </p>

          <div className="days-grid">
            <div className="day-card">
              <div className="day-num">// DAY 01</div>
              <div className="day-date">FRIDAY · JUNE 19 · 7:00 PM - 10:00 PM WAT</div>
              <div className="day-big">01</div>
              <h3 className="day-title">
                Designing, Positioning &amp; <em>Fundable Ideas</em>
              </h3>
              <p className="day-focus">
                Turning ideas into clear, compelling, visible, and fundable concepts
              </p>
              <ul className="day-topics">
                <li>The Power of Projects in the Future of Work</li>
                <li>From Idea to Clarity - structured, actionable thinking</li>
                <li>Designing High-Impact Projects &amp; Events</li>
                <li>Strategic Positioning &amp; Branding</li>
                <li>Designing for Visibility from Day One</li>
                <li>Building Fundable Ideas from the Start</li>
              </ul>
            </div>
            <div className="day-card">
              <div className="day-num">// DAY 02</div>
              <div className="day-date">SATURDAY · JUNE 20 · 7:00 PM - 10:00 PM WAT</div>
              <div className="day-big">02</div>
              <h3 className="day-title">
                Funding, Partnerships &amp; <em>Resource Mobilisation</em>
              </h3>
              <p className="day-focus">
                Securing the money, partnerships, and resources needed to bring ideas to life
              </p>
              <ul className="day-topics">
                <li>Understanding the African Funding Landscape</li>
                <li>Sponsor &amp; Partner Psychology</li>
                <li>Crafting Winning Proposals &amp; Pitches</li>
                <li>Visibility &amp; Branding as a Funding Tool</li>
                <li>Building Strategic Partnerships</li>
                <li>Resource Mobilisation Beyond Money</li>
              </ul>
            </div>
            <div className="day-card">
              <div className="day-num">// DAY 03</div>
              <div className="day-date">SUNDAY · JUNE 21 · 7:00 PM - 10:00 PM WAT</div>
              <div className="day-big">03</div>
              <h3 className="day-title">
                Open Questions and Answer Session - <em>Clarity &amp; Real Conversations</em>
              </h3>
              <p className="day-focus">
                Practical direction from practitioners - no slides, no scripts, just honest
                conversation
              </p>
              <ul className="day-topics">
                <li>Project &amp; Event Design - live deep-dive Q&amp;A</li>
                <li>Funding &amp; Sponsorship - real questions answered</li>
                <li>Execution &amp; Implementation challenges</li>
                <li>Branding &amp; Visibility strategies</li>
                <li>Personal Growth &amp; Leadership consistency</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="section-tag">02 · When &amp; Where</div>
          <h2 className="section-title">
            Clear your calendar. <em>June 19 - 21, 2026.</em>
          </h2>
          <p className="section-lead">
            Three consecutive days, live on Google Meet. Three hours per session. Register once,
            show up all three days.
          </p>

          <div className="time-band">
            <div className="time-cell">
              <div className="time-cell-label">Dates</div>
              <div className="time-cell-value">
                <em>19th - 21st</em>
                <br />
                June 2026
              </div>
              <div className="time-cell-meta">Three live virtual sessions</div>
            </div>
            <div className="time-cell">
              <div className="time-cell-label">Daily Time</div>
              <div className="time-cell-value">
                <em>7:00 PM - 10:00 PM</em>
                <br />
                WAT - Daily
              </div>
              <div className="time-cell-meta">3 hours per day - West African Time</div>
            </div>
            <div className="time-cell">
              <div className="time-cell-label">Platform</div>
              <div className="time-cell-value">
                <em>Google Meet</em>
                <br />
                Virtual
              </div>
              <div className="time-cell-meta">Live stream link sent on registration</div>
            </div>
          </div>

          <Countdown />
        </section>

        <section className="pricing-section" id="pricing" style={{ maxWidth: "none", padding: 0 }}>
          <div className="pricing-wrap">
            <div className="section-tag">03 · Commitment Fee</div>
            <h2 className="section-title">
              Invest in your <em>execution.</em>
            </h2>
            <div className="pricing-grid">
              <div className="price-cell">
                <div className="price-label">Early Bird Rate - First 30 Registrations</div>
                <div className="price-amount">
                  <span className="cur">₦</span>
                  <span className="strike">15,000</span>
                  <span className="live">9,999</span>
                </div>
                <p className="price-note">Available for the first 30 registrations only.</p>
                <div className="early-tag">Special Early Bird Rate LIVE</div>
              </div>
              <div className="price-cell">
                <div className="price-label">Regular Rate</div>
                <div className="price-amount">
                  <span className="cur">₦</span>
                  <span className="live" style={{ color: "var(--text)" }}>
                    15,000
                  </span>
                </div>
                <p className="price-note">Standard fee: ₦15,000.</p>
                <div
                  style={{
                    marginTop: 20,
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  + SAME 3-DAY ACCESS · SAME FULL CURRICULUM
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="who">
          <div className="section-tag">04 · Who It&apos;s For</div>
          <h2 className="section-title">
            Built for serious <em>changemakers.</em>
          </h2>
          <p className="section-lead">
            You sit at the intersection of ambition and action - ready to move beyond conversation
            and begin building.
          </p>
          <div className="who-grid">
            <div className="who-card">
              <div className="who-icon">01</div>
              <h4>University Students</h4>
              <p>
                Undergrad and postgrad students actively involved in leadership, volunteering, or
                campus-based initiatives across African universities.
              </p>
            </div>
            <div className="who-card">
              <div className="who-icon">02</div>
              <h4>Early-Career Professionals</h4>
              <p>
                Professionals seeking to build influence and impact through project-based work
                beyond their formal careers.
              </p>
            </div>
            <div className="who-card">
              <div className="who-icon">03</div>
              <h4>NGO &amp; Social Enterprise Founders</h4>
              <p>
                Founders and team members looking to strengthen capacity for project design,
                funding, and execution.
              </p>
            </div>
            <div className="who-card">
              <div className="who-icon">04</div>
              <h4>Event Planners &amp; Coordinators</h4>
              <p>
                Practitioners aiming to elevate their work to a more strategic, structured, and
                world-class standard.
              </p>
            </div>
            <div className="who-card">
              <div className="who-icon">05</div>
              <h4>Aspiring Changemakers</h4>
              <p>
                Individuals with strong ideas but limited knowledge of how to transform them into
                actionable, fundable, and scalable projects.
              </p>
            </div>
            <div className="who-card" style={{ background: "var(--surface)", borderColor: "var(--gold-dim)" }}>
              <div className="who-icon" style={{ background: "var(--gold-glow)", color: "var(--gold)" }}>
                GO
              </div>
              <h4 style={{ color: "var(--gold-soft)" }}>The Ideal Participant</h4>
              <p>
                Has ideas or ongoing initiatives but struggles with execution. Wants to understand
                funding and partnerships. Ready to move from passion to structure, strategy, and
                measurable impact.
              </p>
            </div>
          </div>
        </section>

        <section className="why-section" style={{ maxWidth: "none", padding: 0 }}>
          <div className="why-wrap">
            <div className="section-tag">05 · Why Register</div>
            <h2 className="section-title">
              What makes this <em>different.</em>
            </h2>
            <p className="section-lead">
              Not a conventional masterclass built on inspiration or generic frameworks. A deep,
              execution-driven experience that moves you from ideas to actionable plans.
            </p>
            <div className="why-grid">
              {[
                [
                  "Execution Over Motivation",
                  "Every session is built around practical systems and real tools. Participants are not just told what to do - they are shown how to do it using frameworks drawn from real projects and lived experience.",
                ],
                [
                  "End-to-End Project Lifecycle",
                  "This masterclass covers the full arc: design + positioning + funding + resource mobilisation + execution readiness.",
                ],
                [
                  "Real-Life Cases & Lived Experience",
                  "Every concept is grounded in actual project experience, including failures, lessons, and practical behind-the-scenes insights.",
                ],
                [
                  "Integrated Visibility & Branding",
                  "Branding is built in from ideation, so participants learn how to create projects that attract attention, credibility, and funding from day one.",
                ],
                [
                  "Funding-Centric Design",
                  "Fundability is integrated into every topic - from idea design to proposal structure to sponsor psychology.",
                ],
                [
                  "Africa-First Relevance",
                  "Built for the African ecosystem - local funding realities, structural challenges, cultural dynamics, and continental opportunities.",
                ],
              ].map(([title, copy], index) => (
                <div key={title} className="why-item">
                  <div className="why-num">{`// 0${index + 1}`}</div>
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="section-tag">06 · Outcomes</div>
          <h2 className="section-title">
            What you leave <em>equipped</em> to do.
          </h2>
          <p className="section-lead">
            Participants do not just leave inspired - they leave equipped, positioned, and ready to
            execute.
          </p>
          <div className="outcomes-grid">
            {[
              ["01", "Design", "Structured, high-impact projects with clear objectives, deliverables, and execution models"],
              ["02", "Position", "Brand your initiative with strategic clarity to attract audience, funding, and partners"],
              ["03", "Fund", "Secure sponsorships, grants, and partnerships through compelling proposals and pitches"],
              ["04", "Mobilize", "Mobilize financial and non-financial resources to execute even with limited infrastructure"],
              ["05", "Execute", "Deliver projects and events at a world-class standard, managing teams and timelines"],
              ["06", "Build", "Sustainable visibility and credibility that outlast individual projects and drive long-term impact"],
            ].map(([glyph, title, desc]) => (
              <div key={title} className="outcome-cell">
                <span className="outcome-glyph">{glyph}</span>
                <div className="outcome-title">{title}</div>
                <p className="outcome-desc">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="host">
          <div className="section-tag">07 · Host</div>
          <h2 className="section-title">
            Meet the <em>Host.</em>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 40, alignItems: "center", marginTop: 60 }}>
            <div style={{ background: "var(--bg-elev)", border: "1px solid var(--border-warm)", borderRadius: 18, padding: 16, boxShadow: "0 30px 70px rgba(0,0,0,0.35)" }}>
              <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, aspectRatio: "4/5", background: "var(--surface)" }}>
                <img
                  src="/images/amara-4.jpg"
                  alt="Anna Ajibade"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 12%", transform: "scale(1.08)" }}
                />
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(34px,4.4vw,54px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 12 }}>
                Anna Ajibade
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--gold-soft)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
                Senior Project Manager · Strategy and Execution Lead
              </div>

              <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.8, marginBottom: 18 }}>
                Anna Ajibade is a senior-level project manager and strategy execution lead focused
                on designing, coordinating, and delivering high-impact initiatives across education,
                youth development, leadership, and social impact spaces.
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.8, marginBottom: 18 }}>
                Her expertise spans project architecture, strategic partnerships, stakeholder
                coordination, funding mobilisation, and execution systems that transform ideas from
                concept into measurable results.
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.8, marginBottom: 18 }}>
                Among her notable works is the conceptualisation and successful execution of the
                Health Storytellers Summit, the first event of its kind at Obafemi Awolowo
                University. The landmark summit convened over 1,000 participants and featured
                Nigeria&apos;s foremost health storyteller, Aproko Doctor, creating a transformative
                platform that amplified conversations around healthcare communication, digital
                influence, and storytelling for impact.
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.8, marginBottom: 18 }}>
                She is also the Founder and Executive Director of Afribloom, a nonprofit
                organisation operating at the intersection of education and leadership development,
                committed to ensuring that every African child has access to quality education, as
                well as the resources, exposure, and knowledge needed to harness their leadership
                potential.
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.8, marginBottom: 18 }}>
                Under her leadership, Afribloom has successfully executed multiple outreach
                initiatives impacting over 3,500 secondary school students through educational
                interventions, career development programs, and leadership-focused engagements. The
                organisation currently provides full scholarship support to 15 out-of-school
                children, reinforcing its mission to bridge educational gaps and create pathways for
                long-term transformation.
              </p>
              <p style={{ color: "var(--text-dim)", fontSize: 15, lineHeight: 1.8 }}>
                Her portfolio reflects a consistent track record of building initiatives that drive
                innovation, empower young leaders, and create scalable solutions for sustainable
                community advancement.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, marginTop: 32 }}>
                <div style={{ padding: 20, border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg-elev)" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--text)", lineHeight: 1, marginBottom: 8 }}>
                    USD 20,000
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Funding Mobilised
                  </div>
                </div>
                <div style={{ padding: 20, border: "1px solid var(--border)", borderRadius: 12, background: "var(--bg-elev)" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--text)", lineHeight: 1, marginBottom: 8 }}>
                    3+
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Years Focused Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HomeFacilitatorsSection facilitators={facilitators} />

        <section className="form-section" id="register" style={{ maxWidth: "none", padding: 0 }}>
          <div className="form-wrap">
            <div className="form-left">
              <h2>
                Secure your seat. <em>Start building.</em>
              </h2>
              <p>Only 100 seats available.</p>
              <p>Get access to the 30% early bird discount</p>
              <p>
                <span style={{ textDecoration: "line-through", color: "var(--text-muted)" }}>₦15,000</span>{" "}
                <strong style={{ color: "var(--gold)" }}>₦9,999</strong>
              </p>
              <p>Available for the first 30 registrations ONLY</p>
              <ul className="form-bullets">
                <li>Event access link sent directly to your email</li>
                <li>Join the exclusive participant community</li>
                <li>3-day full curriculum, live sessions</li>
                <li>Post-program Dreamers to Doers Network access</li>
              </ul>
            </div>

            <RegistrationForm />
          </div>
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}
