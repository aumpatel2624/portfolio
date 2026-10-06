import { Link } from 'react-router-dom';
import { AsciiDivider } from '../ascii/AsciiDivider';
import { emailHref, links, resumeLabel, profile, workCards } from '../data';
import { PlaceholderLink } from '../lib/PlaceholderLink';
import { usePageMeta } from '../lib/usePageMeta';
import styles from './MobileHome.module.css';

/** Mobile.dc.html: single column, 390px reference, fluid up to 767px. */
export function MobileHome() {
  usePageMeta({
    title: 'Aum · Full-stack engineer',
    description:
      'Full-stack engineer in Vadodara, India building LLM-powered products and the systems behind them. Open to NL, FI and DE.',
  });
  const [lead, accent] = profile.classic.mobileHeadline;
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <a href="#top" className={styles.logo}>
            aum<span className={styles.acc}>_</span>
          </a>
          <PlaceholderLink
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
            aria-label={resumeLabel}
            className={styles.resume}
          >
            Resume (PDF)
          </PlaceholderLink>
        </header>

        <main id="top">
          <section className={styles.hero}>
            <img
              className={styles.avatar}
              src="/images/aum-portrait.jpg"
              alt={profile.images.portraitAlt}
              width={96}
              height={96}
              loading="eager"
              decoding="async"
            />
            <div className={styles.kicker}>{profile.kicker}</div>
            <h1 className={styles.h1}>
              {lead}
              <span className={styles.acc}>{accent}</span>
            </h1>
            <p className={styles.lead}>{profile.classic.mobileIntro}</p>
            <div className={styles.ctas}>
              <PlaceholderLink
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                download
                aria-label={resumeLabel}
                className={styles.primary}
              >
                Download resume
              </PlaceholderLink>
              <PlaceholderLink href={links.github} className={styles.ghost}>
                GitHub
              </PlaceholderLink>
              <PlaceholderLink href={links.linkedin} className={styles.ghost}>
                LinkedIn
              </PlaceholderLink>
            </div>
          </section>

          <section className={styles.work} aria-labelledby="m-work">
            <div className={styles.head}>
              <div className={styles.label}>01 · Selected work</div>
              <h2 id="m-work" className={styles.h2}>
                Systems I designed and built
              </h2>
            </div>
            {workCards.map((card) => (
              <article key={card.key} className={styles.article}>
                <div className={styles.cardTop}>
                  <span className={styles.muted}>{card.kind}</span>
                  <span className={card.featured ? styles.tagOn : styles.tag}>{card.badge}</span>
                </div>
                <h3 className={styles.h3}>{card.title}</h3>
                <p className={styles.text}>{card.summary}</p>
                {card.key !== 'whatsapp' && (
                  <div className={styles.flow}>
                    {card.flow.map((step, i) => (
                      <span key={step} className={styles.flowItem}>
                        <span className={styles.step}>{step}</span>
                        {i < card.flow.length - 1 && <span className={styles.muted}>→</span>}
                      </span>
                    ))}
                  </div>
                )}
                {card.href && (
                  <Link to={card.href} className={styles.more}>
                    Read case study →
                  </Link>
                )}
              </article>
            ))}
          </section>

          <section className={styles.contact} aria-labelledby="m-contact">
            <div className={styles.contactLabel}>Contact</div>
            <h2 id="m-contact" className={styles.h2Contact}>
              {profile.contact.heading}
            </h2>
            <p className={styles.contactText}>{profile.contact.body}</p>
            <PlaceholderLink href={emailHref(links.email)} className={styles.email}>
              {links.email}
            </PlaceholderLink>
          </section>
        </main>

        <footer className={styles.footer}>
          <AsciiDivider pattern="·-=-·" />
          <div className={styles.footRow}>
            <span>{profile.copyright}</span>
            <span>{profile.location}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
