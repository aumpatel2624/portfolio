import { asset } from '../lib/asset';
import { Link } from 'react-router-dom';
import { AsciiDivider } from '../ascii/AsciiDivider';
import { SkillIcon } from '../components/SkillIcon';
import { AsciiPhoto } from '../ascii/AsciiPhoto';
import { AsciiWordmark } from '../ascii/AsciiWordmark';
import { CertificateList } from '../components/CertificateList';
import { ResumeViewer } from '../components/ResumeViewer';
import { aumWordmarkSmall, cardAscii } from '../ascii/art.generated';
import {
  aiProjects,
  awards,
  certificatesHeading,
  education,
  emailHref,
  experience,
  languages,
  links,
  linkText,
  profile,
  resumeLabel,
  sections,
  skills,
  statusLine,
  workProjects,
} from '../data';
import { PlaceholderLink } from '../lib/PlaceholderLink';
import { useMediaQuery } from '../lib/useMediaQuery';
import { usePageMeta } from '../lib/usePageMeta';
import { MobileHome } from './MobileHome';
import styles from './ClassicHome.module.css';

export function ClassicHome() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  usePageMeta(profile.meta);
  if (isMobile) return <MobileHome />;
  return <DesktopClassic />;
}

function DesktopClassic() {
  const cardRows = [
    { key: 'name', value: profile.name },
    { key: 'role', value: profile.role, accent: true },
    { key: 'based', value: profile.location },
    { key: 'email', value: links.email, href: emailHref(links.email) },
    { key: 'linkedin', value: linkText.linkedin, href: links.linkedin },
    { key: 'github', value: linkText.github, href: links.github },
    { key: 'open to', value: profile.relocation },
    { key: 'visa', value: profile.visa },
    { key: 'start', value: profile.availability },
  ];
  return (
    <div id="top" className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <a href="#top" className={styles.logo}>
            aum<span className={styles.acc}>.</span>
          </a>
          <nav className={styles.nav} aria-label="Primary">
            <a href="#ai">{sections.ai}</a>
            <a href="#experience">{sections.experience}</a>
            <a href="#skills">Skills</a>
            <a href="#work">Projects</a>
            <a href="#education">{sections.education}</a>
            <a href="#contact">Contact</a>
            <Link to="/" className={styles.desktopView}>
              Desktop view
            </Link>
            <PlaceholderLink
              href={links.resume}
              download
              aria-label={resumeLabel}
              className={styles.resumePill}
            >
              Resume (PDF)
            </PlaceholderLink>
          </nav>
        </header>

        <main>
          <section className={styles.hero}>
            <div className={styles.heroTop}>
              <div className={styles.kicker}>{profile.location}</div>
              <div className={styles.sticker}>{statusLine}</div>
            </div>
            <h1 className={styles.h1}>
              {profile.name}
              <span className={styles.acc}>.</span>{' '}
              <span className={styles.outline}>{profile.role}</span>
            </h1>
            <div className={styles.heroRow}>
              <div className={styles.heroCopy}>
                <h2 className={styles.label}>{sections.profile}</h2>
                <p className={styles.lead}>{profile.summary}</p>
                <div className={styles.ctas}>
                  <PlaceholderLink
                    href={links.resume}
                    download
                    aria-label={resumeLabel}
                    className={styles.ctaPrimary}
                  >
                    Download resume
                  </PlaceholderLink>
                  <PlaceholderLink href={links.github} className={styles.ctaGhost}>
                    GitHub
                  </PlaceholderLink>
                  <PlaceholderLink href={links.linkedin} className={styles.ctaGhost}>
                    LinkedIn
                  </PlaceholderLink>
                  <a href="#resume" className={styles.ctaGhost}>
                    View resume
                  </a>
                  <a href="#contact" className={styles.ctaGhost}>
                    Email
                  </a>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.photo}>
                  <AsciiPhoto
                    src={asset('images/aum-portrait.jpg')}
                    alt={profile.photoAlt}
                    width={660}
                    height={528}
                    objectPosition="50% 14%"
                    art={cardAscii}
                    size="lg"
                    mode="toggle"
                    priority
                  />
                </div>
                {cardRows.map((row) => (
                  <div key={row.key} className={styles.row}>
                    <span className={styles.rowKey}>{row.key}</span>
                    {row.href ? (
                      <PlaceholderLink href={row.href} className={styles.rowValue}>
                        {row.value}
                      </PlaceholderLink>
                    ) : (
                      <span className={`${styles.rowValue} ${row.accent ? styles.acc : ''}`}>
                        {row.value}
                      </span>
                    )}
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
        <section id="ai" className={styles.work}>
          <div className={styles.head}>
            <div className={styles.label}>01</div>
            <h2 className={styles.h2Work}>{sections.ai}</h2>
          </div>
          <div className={styles.cards}>
            {aiProjects.map((p) => (
              <article key={p.key} className={styles.article}>
                {p.context && (
                  <div className={styles.cardTop}>
                    <span className={styles.badge}>{p.context}</span>
                  </div>
                )}
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardText}>{p.summary}</p>
                {p.stack && <div className={styles.stack}>{p.stack}</div>}
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.more}
                  >
                    {p.link.label}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <AsciiDivider pattern="·-=-·" className={styles.divider} />

        <section id="experience" className={styles.exp}>
          <div className={styles.expHead}>
            <div className={styles.label}>02</div>
            <h2 className={styles.h2Sec}>{sections.experience}</h2>
          </div>
          <div className={styles.expList}>
            {experience.map((job) => (
              <div key={job.title} className={styles.job}>
                <div className={styles.when}>{job.when}</div>
                <div className={styles.jobBody}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <div className={styles.muted}>{job.place}</div>
                  <ul className={styles.jobText}>
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <div className={styles.stack}>{job.stack}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AsciiDivider pattern="/\\/\\" className={styles.divider} />

        <section id="skills" className={styles.skills}>
          <div className={styles.head}>
            <div className={styles.label}>03</div>
            <h2 className={styles.h2Sec}>{sections.skills}</h2>
          </div>
          <div className={styles.groups}>
            {skills.map((group) => (
              <div key={group.title} className={styles.group}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                {group.rows.map((row) => (
                  <div key={row.level ?? group.title} className={styles.skillRow}>
                    {row.level && <p className={styles.groupNote}>{row.level}:</p>}
                    <ul className={styles.chips}>
                      {row.items.map((s) => (
                        <li key={s} className={styles.chip}>
                          <SkillIcon name={s} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="work" className={styles.skills}>
          <div className={styles.head}>
            <div className={styles.label}>04</div>
            <h2 className={styles.h2Sec}>
              {sections.work}
              <span className={styles.scope}> · {sections.workScope}</span>
            </h2>
          </div>
          <div className={styles.alsoRow}>
            {workProjects.map((p) => (
              <div key={p.key} className={styles.alsoItem}>
                <h3 className={styles.h3Also}>{p.title}</h3>
                {p.context && <div className={styles.context}>{p.context}</div>}
                <ul className={styles.jobText}>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className={styles.stack}>{p.stack}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className={styles.compact}>
          <div className={styles.expHead}>
            <div className={styles.label}>05</div>
            <h2 className={styles.h2Sec}>{sections.education}</h2>
          </div>
          <div className={styles.expList}>
            {education.map((e) => (
              <div key={e.degree} className={styles.job}>
                <div className={styles.when}>{e.when}</div>
                <div className={styles.jobBody}>
                  <h3 className={styles.jobTitle}>{e.degree}</h3>
                  <div className={styles.muted}>{e.school}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="awards" className={styles.compact}>
          <div className={styles.expHead}>
            <div className={styles.label}>06</div>
            <h2 className={styles.h2Sec}>{sections.awards}</h2>
          </div>
          <ul className={`${styles.expList} ${styles.awards}`}>
            {awards.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        <section id="certificates" className={styles.compact}>
          <div className={styles.expHead}>
            <div className={styles.label}>07</div>
            <h2 className={styles.h2Sec}>{certificatesHeading}</h2>
          </div>
          <div className={styles.expList}>
            <CertificateList />
          </div>
        </section>

        <section id="languages" className={styles.compact}>
          <div className={styles.expHead}>
            <div className={styles.label}>08</div>
            <h2 className={styles.h2Sec}>{sections.languages}</h2>
          </div>
          <div className={styles.expList}>
            <ul className={styles.chips}>
              {languages.map((l) => (
                <li key={l.name} className={styles.chip}>
                  {l.name}: {l.level}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="resume" className={styles.resume}>
          <div className={styles.head}>
            <div className={styles.label}>09</div>
            <h2 className={styles.h2Sec}>Resume</h2>
          </div>
          <ResumeViewer />
        </section>

        <section id="contact" className={styles.contact}>
          <div className={styles.contactLabel}>10</div>
          <h2 className={styles.h2Contact}>Contact</h2>
          <p className={styles.contactText}>{statusLine}</p>
          <div className={styles.contactBtns}>
            <PlaceholderLink href={emailHref(links.email)} className={styles.cEmail}>
              {links.email}
            </PlaceholderLink>
            <PlaceholderLink href={links.linkedin} className={styles.cGhost}>
              {linkText.linkedin}
            </PlaceholderLink>
            <PlaceholderLink href={links.github} className={styles.cGhost}>
              {linkText.github}
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
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
