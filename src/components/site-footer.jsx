export function SiteFooter({ home = false }) {
  if (home) {
    return (
      <footer>
        <div className="footer-inner">
          <div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "22px",
                fontWeight: 400,
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              Dreamers <em style={{ fontStyle: "italic", color: "var(--gold-soft)" }}>to Doers</em>
            </div>
            <p className="footer-tagline">From vision to execution - in 3 days.</p>
          </div>
          <div className="footer-col">
            <h5>Navigate</h5>
            <ul>
              <li>
                <a href="#curriculum">Curriculum</a>
              </li>
              <li>
                <a href="#who">Who It&apos;s For</a>
              </li>
              <li>
                <a href="#pricing">Commitment Fee</a>
              </li>
              <li>
                <a href="#register">Register</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Event Details</h5>
            <ul>
              <li>
                <a href="#">June 19 - 21, 2026</a>
              </li>
              <li>
                <a href="#">7:00 PM - 10:00 PM WAT</a>
              </li>
              <li>
                <a href="#">Virtual - Google Meet</a>
              </li>
              <li>
                <a href="#">100 Seats Only</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="page-accent-copy page-accent-copy--end">
          Pan African Project and Event Management Masterclass
        </div>
        <div className="footer-bottom">
          <div>Copyright 2026 Dreamers to Doers</div>
          <div>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    );
  }

  return null;
}
