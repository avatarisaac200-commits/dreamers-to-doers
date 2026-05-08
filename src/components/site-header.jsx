import Link from "next/link";

export function SiteHeader({ showHomeLinks = false }) {
  return (
    <nav>
      <Link href={showHomeLinks ? "#top" : "/"} className="nav-brand">
        Dreamers <em>to Doers</em>
      </Link>
      <ul className="nav-links">
        {showHomeLinks ? (
          <>
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
              <a href="#register" className="nav-cta">
                Register Now
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/facilitators/">Facilitators</Link>
            </li>
            <li>
              <Link href="/host/">Host</Link>
            </li>
            <li>
              <Link href="/impact-footprints/">Impact Footprints</Link>
            </li>
            <li>
              <Link href="/#register" className="nav-cta">
                Register Now
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
