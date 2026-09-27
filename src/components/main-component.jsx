import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { NAV_LINKS, FEATURES, STEPS, CRITERIA, TEAM } from "../data/website-sections";
import { REGISTER_URL, PROJECT_SUBMISSION_URL, WHATSAPP_URL } from "../data/keys-and-urls";
import { useInView } from '../custom-hooks/use-in-view.jsx'
import { useScrollProgress } from '../custom-hooks/use-scroll-progress.jsx'
import { useScrolledPast } from '../custom-hooks/use-scrolled-past.jsx'
import { useActiveSection } from '../custom-hooks/use-active-section.jsx'
import { CountUp } from "../custom-components/count-up.jsx";
import { BrandMark } from "../custom-components/brand-mark.jsx";

export default function MainComponent() {
  const [markReady, setMarkReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const progress = useScrollProgress();
  const scrolled = useScrolledPast(24);
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.href));

  const navRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const [missionRef, missionInView] = useInView(0.4);
  const [featuresRef, featuresInView] = useInView(0.15);
  const [timelineRef, timelineInView] = useInView(0.15);
  const [criteriaRef, criteriaInView] = useInView(0.2);
  const [teamRef, teamInView] = useInView(0.2);
  const [finalRef, finalInView] = useInView(0.4);

  // Plays the hero mark's draw-in animation shortly after mount.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMarkReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Slides the pill indicator under whichever nav link matches the active section.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeLink = nav.querySelector(`a[href="#${activeSection}"]`);
    if (activeLink) {
      setIndicator({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeSection]);

  const handleMarkMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: relX * -10, y: relY * 10 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="c4p">
      <div className="c4p-progress" style={{ width: `${progress}%` }} />

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
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                className={activeSection === link.href ? "is-active" : ""}
              >
                {link.label}
              </a>
            ))}
            <Link to="/results" >Results</Link>
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
            {NAV_LINKS.map((link) => (
              
              <a href={`#${link.href}`} onClick={() => setMenuOpen(false)}>{link.label}</a>


            ))}
            <Link to="/results" >Results</Link>
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
        {/* ---------------------------------------------------------- */}
        {/* Hero                                                       */}
        {/* ---------------------------------------------------------- */}
        <section className="c4p-hero">
          <div className="c4p-hero__glow" aria-hidden="true" />
          <div className="c4p-container c4p-hero__grid">
            <div className="c4p-hero__copy">
              <p className="c4p-eyebrow c4p-in c4p-in--1">
                A STEM Competitions Committee event
              </p>
              <h1>
                <span className="c4p-in c4p-in--2">
                  Write code that helps
                </span>
                <span className="c4p-in c4p-in--3">
                  the person sitting next to you.
                </span>
              </h1>
              <p className="c4p-hero__lede c4p-in c4p-in--4">
                Code4Peers is a Python competition for STEM students. Pick a
                problem you and your classmates actually face in your
                studies, then build something that solves it &mdash; real
                code, for a real person, judged on whether it actually
                helps.
              </p>
              <div className="c4p-hero__actions c4p-in c4p-in--5">
                <a className="c4p-cta" href={REGISTER_URL}>
                  Register for the competition
                </a>
                <a className="c4p-link-arrow" href="#how-it-works">
                  See how to participate
                </a>
              </div>
            </div>

            <div
              className="c4p-hero__mark"
              onMouseMove={handleMarkMouseMove}
              onMouseLeave={resetTilt}
              style={{
                transform: `perspective(700px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              }}
            >
              <BrandMark size={220} animated={markReady} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Mission                                                    */}
        {/* ---------------------------------------------------------- */}
        <section className="c4p-mission">
          <div
            className={`c4p-container c4p-mission__inner c4p-fade-blur${
              missionInView ? " is-in" : ""
            }`}
            ref={missionRef}
          >
            <p className="c4p-mission__text">
              Too often, students learn to code without ever applying it to
              something real. Code4Peers exists to turn programming from a
              subject you study into a skill you use &mdash; by challenging
              students to build a program that genuinely helps their
              classmates, whether that's organizing study schedules,
              simplifying revision, or solving a problem they face every
              day.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Features                                                   */}
        {/* ---------------------------------------------------------- */}
        <section className="c4p-section" id="features">
          <div className="c4p-container">
            <h2 className="c4p-section__title">Why take part</h2>
            <div
              className={`c4p-features c4p-stagger${
                featuresInView ? " is-in" : ""
              }`}
              ref={featuresRef}
            >
              {FEATURES.map((feature) => (
                <div className="c4p-features__item" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* How to participate                                         */}
        {/* ---------------------------------------------------------- */}
        <section className="c4p-section c4p-section--muted" id="how-it-works">
          <div className="c4p-container">
            <h2 className="c4p-section__title">How to participate</h2>
            <ol
              className={`c4p-timeline c4p-stagger${
                timelineInView ? " is-in" : ""
              }`}
              ref={timelineRef}
            >
              {STEPS.map((step, index) => (
                <li className="c4p-timeline__item" key={step.title}>
                  <div className="c4p-timeline__marker">
                    <span>{index + 1}</span>
                  </div>
                  <div className="c4p-timeline__content">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Judging criteria                                           */}
        {/* ---------------------------------------------------------- */}
        <section className="c4p-section" id="judging">
          <div className="c4p-container">
            <h2 className="c4p-section__title">Judging criteria</h2>
            <div
              className={`c4p-criteria c4p-stagger${
                criteriaInView ? " is-in" : ""
              }`}
              ref={criteriaRef}
            >
              {CRITERIA.map((item) => (
                <div className="c4p-criteria__row" key={item.label}>
                  <div className="c4p-criteria__label">
                    <span>{item.label}</span>
                    <span className="c4p-criteria__weight">
                      <CountUp
                        target={item.weight}
                        active={criteriaInView}
                        suffix="%"
                      />
                    </span>
                  </div>
                  <div className="c4p-criteria__track">
                    <div
                      className="c4p-criteria__fill"
                      style={{
                        width: criteriaInView ? `${item.weight}%` : "0%",
                      }}
                    />
                  </div>
                  <p className="c4p-criteria__body">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="c4p-readme">
              <h3>Every submission needs a README</h3>
              <p>
                A clear, well-written README helps our judges evaluate your
                project fairly, and it's a skill you'll need for any
                real-world coding project going forward. Yours should
                explain:
              </p>
              <ul>
                <li>What the project does &mdash; the problem it solves and who it helps</li>
                <li>How it works &mdash; a brief explanation of how the program functions</li>
                <li>How it was built &mdash; the tools, libraries, or approach used</li>
                <li>What makes it creative or unique</li>
                <li>Challenges faced, and how you overcame them</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Team                                                       */}
        {/* ---------------------------------------------------------- */}
        <section className="c4p-section c4p-section--muted" id="team">
          <div className="c4p-container">
            <h2 className="c4p-section__title">Who's behind it</h2>
            <p className="c4p-team__intro">
              Code4Peers was founded by Ali Fathi, a STEM student who began
              teaching Python to classmates through CodePath, a course not
              yet published online. Teaching sparked a bigger idea: a
              competition where students use code to help each other
              succeed academically. Code4Peers is officially recognized by
              STEM's Competitions Committee.
            </p>
            <div
              className={`c4p-team c4p-stagger${teamInView ? " is-in" : ""}`}
              ref={teamRef}
            >
              {TEAM.map((person) => (
                <div className="c4p-team__card" key={person.name}>
                  <div className="c4p-team__initial">
                    {person.name.charAt(0)}
                  </div>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Final CTA                                                  */}
        {/* ---------------------------------------------------------- */}
        <section className="c4p-final-cta" ref={finalRef}>
          <div className="c4p-final-cta__glow" aria-hidden="true" />
          <div
            className={`c4p-container c4p-final-cta__inner c4p-fade-blur${
              finalInView ? " is-in" : ""
            }`}
          >
            <h2>Build something that actually matters.</h2>
            <p>To you, and to your peers.</p>
            <a className="c4p-cta" href={REGISTER_URL}>
              Register for Code4Peers
            </a>
          </div>
        </section>
      </main>

      <footer className="c4p-footer">
        <div className="c4p-container c4p-footer__inner">
          <div className="c4p-brand c4p-brand--footer">
            <BrandMark size={22} />
            <span>Code4Peers</span>
          </div>
          <div className="c4p-footer__links">
            <a href={WHATSAPP_URL}>Whatsapp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}