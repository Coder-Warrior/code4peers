import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS, FEATURES, STEPS, CRITERIA, TEAM } from "../data/website-sections";
import { REGISTER_URL, PROJECT_SUBMISSION_URL, WHATSAPP_URL } from "../data/keys-and-urls";
import { useScrollProgress } from '../custom-hooks/use-scroll-progress.jsx'
import { useScrolledPast } from '../custom-hooks/use-scrolled-past.jsx'
import { BrandMark } from "../custom-components/brand-mark.jsx";
import { useActiveSection } from '../custom-hooks/use-active-section.jsx'


const RESULTS_YEARS = [
  {
    year: 2026,
    status: "pending", // "pending" | "published" | "upcoming"
    note: "Submissions are in and our team is reviewing every project against the judging criteria. Results will be posted here once review is complete.",
    winners: [], // e.g. [{ place: "1st", name: "...", project: "..." }]
  },
  {
    year: 2027,
    status: "upcoming",
    note: "This edition hasn't opened yet. Check back after the 2026 results are announced.",
    winners: [],
  },
];

export default function ResultsGuide() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(RESULTS_YEARS[0]?.year);
  const [markReady, setMarkReady] = useState(false);

  const progress = useScrollProgress();
  const scrolled = useScrolledPast(24);
  const selected = RESULTS_YEARS.find((y) => y.year === selectedYear);

  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.href));
  const navRef = useRef(null);


  useEffect(() => {
    const id = requestAnimationFrame(() => setMarkReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="rg">
      <div className="rg-progress" style={{ width: `${progress}%` }} />

      <a className="rg-skip" href="#main">
        Skip to content
      </a>

     <header className={`c4p-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="c4p-container c4p-header__inner">
          <a className="c4p-brand" href="/">
            <BrandMark size={28} />
            <span>Code4Peers</span>
          </a>

          <nav className="c4p-nav" aria-label="Primary" ref={navRef}>
            <span
              className="c4p-nav__indicator"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
            />
            <Link to="/" >Home</Link>
          </nav>

          <div className="c4p-header__actions">
            <a
              className="c4p-cta c4p-cta--small c4p-cta--desktop-only"
              href={REGISTER_URL}
            >
              Register
            </a>

            <a
              className="c4p-cta c4p-cta--small c4p-cta--desktop-only disabled"
              href={PROJECT_SUBMISSION_URL}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
            >
              Upload Your Project
            </a>

            <button
              type="button"
              className={`c4p-burger${menuOpen ? " is-open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="c4p-mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div
          id="c4p-mobile-menu"
          className={`c4p-mobile-menu${menuOpen ? " is-open" : ""}`}
        >
          <nav className="c4p-mobile-menu__nav" aria-label="Mobile">
            <Link to="/" >Home</Link>
            <Link to="/results-guide" >Results</Link>
            <a
            className="c4p-cta"
            href={REGISTER_URL}
            onClick={() => setMenuOpen(false)}
          >
            Register
          </a>
          <a
              className="c4p-cta c4p-cta--small c4p-cta--desktop-only disabled"
              href={PROJECT_SUBMISSION_URL}
              aria-disabled="true"
              onClick={(e) => e.preventDefault()}
            >
              Upload Your Project
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="rg-intro">
          <div className="rg-intro__glow" aria-hidden="true" />
          <div className="rg-container">
            <p className="rg-eyebrow rg-in rg-in--1">Code4Peers</p>
            <h1 className="rg-title rg-in rg-in--2">Results</h1>
            <p className="rg-lede rg-in rg-in--3">
              Pick an edition below to see where it stands — submissions
              under review, winners announced, or an edition still to
              come.
            </p>

            <div className="rg-year-tabs rg-in rg-in--4" role="tablist">
              {RESULTS_YEARS.map((entry) => (
                <button
                  key={entry.year}
                  type="button"
                  role="tab"
                  aria-selected={selectedYear === entry.year}
                  className={`rg-year-tab${
                    selectedYear === entry.year ? " is-active" : ""
                  }${entry.status === "upcoming" ? " is-locked" : ""}`}
                  onClick={() => setSelectedYear(entry.year)}
                >
                  {entry.year}
                  {entry.status === "upcoming" && <LockIcon className="rg-year-tab__icon" />}
                </button>
              ))}
            </div>

            {selected && (
              <div className="rg-year-panel" key={selected.year}>
                {selected.status === "pending" && (
                  <PendingPanel year={selected.year} note={selected.note} />
                )}
                {selected.status === "upcoming" && (
                  <UpcomingPanel year={selected.year} note={selected.note} />
                )}
                {selected.status === "published" && (
                  <PublishedPanel year={selected.year} winners={selected.winners} />
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="rg-footer">
        <div className="rg-container rg-footer__inner">
          <div className="rg-brand rg-brand--footer">
            <BrandMark size={22} />
            <span>Code4Peers</span>
          </div>
          <div className="rg-footer__links">
            {/* TODO: real community/org links */}
            <a href="https://t.me/REPLACE_ME">Telegram</a>
            <a href="https://github.com/REPLACE_ME">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PendingPanel({ year, note }) {
  return (
    <div className="rg-status-card">
      <span className="rg-status-card__dot" aria-hidden="true" />
      <h2>{year} results are being judged</h2>
      <p>{note}</p>
    </div>
  );
}

function UpcomingPanel({ year, note }) {
  return (
    <div className="rg-status-card rg-status-card--locked">
      <LockIcon className="rg-status-card__icon" />
      <h2>{year} hasn't opened yet</h2>
      <p>{note}</p>
    </div>
  );
}

function PublishedPanel({ year, winners }) {
  return (
    <div className="rg-winners">
      <h2>{year} winners</h2>
      <ol className="rg-winners__list">
        {winners.map((w) => (
          <li className="rg-winners__row" key={w.place}>
            <span className="rg-winners__place">{w.place}</span>
            <span className="rg-winners__name">{w.name}</span>
            <span className="rg-winners__project">{w.project}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function LockIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}