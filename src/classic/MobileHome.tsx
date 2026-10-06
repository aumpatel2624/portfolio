import { Link } from 'react-router-dom';
import { AsciiDivider } from '../ascii/AsciiDivider';
import {
  emailHref,
  links,
  resumeLabel,
  profile,
  projects,
  setup,
  skills,
  workCards,
} from '../data';
import { SkillIcon } from '../components/SkillIcon';
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
            <div className={styles.label}>Apidel</div>
            {projects
              .filter((p) => p.group === 'Apidel')
              .map((item) => (
                <article key={item.key} className={styles.article}>
                  <h3 className={styles.h3}>{item.title}</h3>
                  <p className={styles.text}>{item.summary}</p>
                </article>
              ))}
          </section>

          <section className={styles.work} aria-labelledby="m-build">
            <div className={styles.head}>
              <div className={styles.label}>02 · Skills</div>
              <h2 id="m-build" className={styles.h2}>
                {profile.build.heading}
              </h2>
            </div>
            <p className={styles.text}>{profile.build.body}</p>
            <p className={styles.text}>{profile.build.tools.join(' · ')}</p>
            <p className={styles.text}>
              {profile.build.recently}{' '}
              <a
                href={profile.build.firstmate.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.more}
              >
                {profile.build.firstmate.label} ↗
              </a>
            </p>
            <div className={styles.head}>
              <div className={styles.label}>{profile.languages.heading}</div>
              <p className={styles.text}>
                {profile.languages.items.map((l, i) => (
                  <span key={l.name}>
                    {i > 0 && ' · '}
                    {l.name}
                    {l.native && (
                      <>
                        {' '}
                        <span lang={l.lang}>{l.native}</span>
                      </>
                    )}
                  </span>
                ))}
              </p>
            </div>
            {skills
              .filter((g) => g.title === 'Environments')
              .map((g) => (
                <div key={g.title} className={styles.head}>
                  <div className={styles.label}>{g.title}</div>
                  <p className={styles.text}>{g.classic.join(' · ')}</p>
                  {g.note && <p className={styles.text}>{g.note}</p>}
                </div>
              ))}
          </section>

          <section className={styles.setup} aria-labelledby="m-setup">
            <div className={styles.head}>
              <div className={styles.label}>03 · Setup</div>
              <h2 id="m-setup" className={styles.h2}>
                What I build on
              </h2>
            </div>
            {setup.map((section) => (
              <div key={section.key} className={styles.setupGroup}>
                <h3 className={styles.setupTitle}>{section.title}</h3>
                <p className={styles.text}>{section.summary}</p>
                {section.specs && (
                  <dl className={styles.specs}>
                    {section.specs.map((row) => (
                      <div key={row.label} className={styles.spec}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <ul className={styles.chips} aria-label={section.itemsLabel ?? section.title}>
                  {section.items.map((item) => (
                    <li key={item.name} className={styles.chip}>
                      <SkillIcon name={item.name} />
                      {item.name}
                      {item.planned && <span className={styles.planned}>planned</span>}
                    </li>
                  ))}
                </ul>
              </div>
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
