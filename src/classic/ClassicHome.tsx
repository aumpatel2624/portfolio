import { Link } from 'react-router-dom';
import { AsciiDivider } from '../ascii/AsciiDivider';
import { SkillIcon } from '../components/SkillIcon';
import { AsciiPhoto } from '../ascii/AsciiPhoto';
import { AsciiWordmark } from '../ascii/AsciiWordmark';
import { aumWordmarkSmall, cardAscii } from '../ascii/art.generated';
import { alsoBuilt, emailHref, experience, links, profile, skills, workCards } from '../data';
import { PlaceholderLink } from '../lib/PlaceholderLink';
import { useMediaQuery } from '../lib/useMediaQuery';
import { usePageMeta } from '../lib/usePageMeta';
import { MobileHome } from './MobileHome';
import styles from './ClassicHome.module.css';

const DESCRIPTION =
  'Full-stack engineer in Vadodara, India building LLM-powered products and the systems behind them. Open to NL, FI and DE.';

export function ClassicHome() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  usePageMeta({ title: 'Aum · Full-stack engineer', description: DESCRIPTION });
  if (isMobile) return <MobileHome />;
  return <DesktopClassic />;
}

function DesktopClassic() {
  const [a, b, c, d] = profile.classic.headline;
  return (
    <div id="top" className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <a href="#top" className={styles.logo}>
            aum<span className={styles.acc}>.</span>
          </a>
          <nav className={styles.nav} aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <Link to="/" className={styles.desktopView}>
              Desktop view
            </Link>
            <PlaceholderLink href={links.resume} className={styles.resumePill}>
              Resume (PDF)
            </PlaceholderLink>
          </nav>
        </header>

        <main>
          <section className={styles.hero}>
            <div className={styles.heroTop}>
              <div className={styles.kicker}>{profile.kicker}</div>
              <div className={styles.sticker}>{profile.sticker}</div>
            </div>
            <h1 className={styles.h1}>
              {a}
              <span className={styles.acc}>{b}</span>
              {c}
              <span className={styles.outline}>{d}</span>
            </h1>
            <div className={styles.heroRow}>
              <div className={styles.heroCopy}>
                <p className={styles.lead}>{profile.classic.intro}</p>
                <div className={styles.ctas}>
                  <PlaceholderLink href={links.resume} className={styles.ctaPrimary}>
                    Download resume
                  </PlaceholderLink>
                  <PlaceholderLink href={links.github} className={styles.ctaGhost}>
                    GitHub
                  </PlaceholderLink>
                  <PlaceholderLink href={links.linkedin} className={styles.ctaGhost}>
                    LinkedIn
                  </PlaceholderLink>
                  <a href="#contact" className={styles.ctaGhost}>
                    Email
                  </a>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.photo}>
                  <AsciiPhoto
                    src="/images/aum-portrait.jpg"
                    alt={profile.images.portraitAlt}
                    width={660}
                    height={528}
                    objectPosition="50% 14%"
                    art={cardAscii}
                    size="lg"
                    mode="toggle"
                    priority
                  />
                  <span className={styles.pill}>{profile.location}</span>
                </div>
                <div className={styles.cardLabel}>profile</div>
                {profile.profileCard.map((row) => (
                  <div key={row.key} className={styles.row}>
                    <span className={styles.rowKey}>{row.key}</span>
                    <span className={'accent' in row && row.accent ? styles.acc : undefined}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <div className={styles.band} aria-hidden="true">
        <div className={styles.marq}>
          <span>{profile.marquee}</span>
          <span>{profile.marquee}</span>
        </div>
      </div>

      <div className={styles.wrap}>
        <section id="work" className={styles.work}>
          <div className={styles.head}>
            <div className={styles.label}>01 · Selected work</div>
            <h2 className={styles.h2Work}>Systems I designed and built.</h2>
            <p className={styles.sub}>
              One personal project I can show in full, and two client platforms written up without
              client names.
            </p>
          </div>
          <div className={styles.cards}>
            {workCards.map((card) => (
              <article
                key={card.key}
                className={`${styles.article} ${card.featured ? styles.featured : ''}`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.muted}>{card.kind}</span>
                  <span className={card.featured ? styles.badgeOn : styles.badge}>
                    {card.badge}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.summary}</p>
                <div className={styles.flow}>
                  {card.flow.map((step, i) => (
                    <span key={step} className={styles.flowItem}>
                      <span className={styles.step}>{step}</span>
                      {i < card.flow.length - 1 && <span className={styles.arrow}>→</span>}
                    </span>
                  ))}
                </div>
                <div className={styles.stack}>{card.stack}</div>
                {card.href && (
                  <Link to={card.href} className={styles.more}>
                    Read case study →
                  </Link>
                )}
              </article>
            ))}
          </div>
          <div className={styles.also}>
            <div className={styles.labelSm}>Also built</div>
            <div className={styles.alsoRow}>
              {alsoBuilt.map((item) => (
                <div key={item.title} className={styles.alsoItem}>
                  <h3 className={styles.h3Also}>{item.title}</h3>
                  <p className={styles.alsoText}>{item.classic}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AsciiDivider pattern="·-=-·" className={styles.divider} />

        <section id="experience" className={styles.exp}>
          <div className={styles.expHead}>
            <div className={styles.label}>02 · Experience</div>
            <h2 className={styles.h2Sec}>Where I've worked.</h2>
          </div>
          <div className={styles.expList}>
            {experience.map((job) => (
              <div key={job.title} className={styles.job}>
                <div className={styles.when}>{job.when}</div>
                <div className={styles.jobBody}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <div className={styles.muted}>{job.place}</div>
                  <p className={styles.jobText}>{job.classic}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AsciiDivider pattern="/\\/\\" className={styles.divider} />

        <section id="skills" className={styles.skills}>
          <div className={styles.head}>
            <div className={styles.label}>03 · Skills</div>
            <h2 className={styles.h2Sec}>What I work with.</h2>
          </div>
          <div className={styles.groups}>
            {skills.map((group) => (
              <div key={group.title} className={styles.group}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <ul className={styles.chips}>
                  {group.classic.map((s) => (
                    <li key={s} className={styles.chip}>
                      <SkillIcon name={s} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className={styles.contact}>
          <div className={styles.contactLabel}>04 · Contact</div>
          <h2 className={styles.h2Contact}>{profile.contact.heading}</h2>
          <p className={styles.contactText}>{profile.contact.body}</p>
          <div className={styles.contactBtns}>
            <PlaceholderLink href={emailHref(links.email)} className={styles.cEmail}>
              {links.email}
            </PlaceholderLink>
            <PlaceholderLink href={links.linkedin} className={styles.cGhost}>
              LinkedIn
            </PlaceholderLink>
            <PlaceholderLink href={links.github} className={styles.cGhost}>
              GitHub
            </PlaceholderLink>
          </div>
        </section>

        <footer className={styles.footer}>
          <AsciiDivider pattern="=·=·=·" className={styles.footLine} />
          <div className={styles.footMark}>
            <AsciiWordmark
              mark={aumWordmarkSmall}
              label="aum."
              accentFrom={aumWordmarkSmall.cols - 5}
            />
          </div>
          <div className={styles.footRow}>
            <span>{profile.copyright}</span>
            <span>{profile.location}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
