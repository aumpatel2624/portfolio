import { asset } from '../lib/asset';
import { AsciiDivider } from '../ascii/AsciiDivider';
import {
  aiProjects,
  awards,
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
  type Project,
} from '../data';
import { ResumeViewer } from '../components/ResumeViewer';
import { SkillIcon } from '../components/SkillIcon';
import { PlaceholderLink } from '../lib/PlaceholderLink';
import { usePageMeta } from '../lib/usePageMeta';
import styles from './MobileHome.module.css';

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.article}>
      {project.context && (
        <div className={styles.cardTop}>
          <span className={styles.tag}>{project.context}</span>
        </div>
      )}
      <h3 className={styles.h3}>{project.title}</h3>
      {project.summary && <p className={styles.text}>{project.summary}</p>}
      {project.bullets.length > 0 && (
        <ul className={styles.bullets}>
          {project.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {project.stack && <div className={styles.stack}>{project.stack}</div>}
      {project.link && (
        <a
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.more}
        >
          {project.link.label}
        </a>
      )}
    </article>
  );
}

/** Mobile.dc.html: single column, 390px reference, fluid up to 767px. */
export function MobileHome() {
  usePageMeta(profile.meta);
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <a href="#top" className={styles.logo}>
            aum<span className={styles.acc}>_</span>
          </a>
          <PlaceholderLink
            href={links.resume}
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
              src={asset('images/aum-portrait.jpg')}
              alt={profile.photoAlt}
              width={96}
              height={96}
              loading="eager"
              decoding="async"
            />
            <div className={styles.kicker}>{profile.location}</div>
            <h1 className={styles.h1}>
              {profile.name} <span className={styles.role}>{profile.role}</span>
            </h1>
            <p className={styles.lead}>{statusLine}</p>
            <div className={styles.ctas}>
              <PlaceholderLink
                href={links.resume}
                download
                aria-label={resumeLabel}
                className={styles.primary}
              >
                Download resume
              </PlaceholderLink>
              <a href="#resume" className={styles.ghost}>
                View resume
              </a>
              <PlaceholderLink href={emailHref(links.email)} className={styles.ghost}>
                {links.email}
              </PlaceholderLink>
              <PlaceholderLink href={links.linkedin} className={styles.ghost}>
                {linkText.linkedin}
              </PlaceholderLink>
              <PlaceholderLink href={links.github} className={styles.ghost}>
                {linkText.github}
              </PlaceholderLink>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="m-profile">
            <h2 id="m-profile" className={styles.h2}>
              {sections.profile}
            </h2>
            <p className={styles.text}>{profile.summary}</p>
          </section>

          <section className={styles.section} aria-labelledby="m-ai">
            <h2 id="m-ai" className={styles.h2}>
              {sections.ai}
            </h2>
            {aiProjects.map((p) => (
              <ProjectCard key={p.key} project={p} />
            ))}
          </section>

          <section className={styles.section} aria-labelledby="m-experience">
            <h2 id="m-experience" className={styles.h2}>
              {sections.experience}
            </h2>
            {experience.map((job) => (
              <article key={job.title} className={styles.article}>
                <div className={styles.when}>{job.when}</div>
                <h3 className={styles.h3}>{job.title}</h3>
                <p className={styles.text}>{job.place}</p>
                <ul className={styles.bullets}>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className={styles.stack}>{job.stack}</div>
              </article>
            ))}
          </section>

          <section className={styles.section} aria-labelledby="m-skills">
            <h2 id="m-skills" className={styles.h2}>
              {sections.skills}
            </h2>
            {skills.map((group) => (
              <div key={group.title} className={styles.group}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                {group.rows.map((row) => (
                  <div key={row.level ?? group.title} className={styles.head}>
                    {row.level && <p className={styles.text}>{row.level}:</p>}
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
          </section>

          <section className={styles.section} aria-labelledby="m-work">
            <h2 id="m-work" className={styles.h2}>
              {sections.work} · {sections.workScope}
            </h2>
            {workProjects.map((p) => (
              <ProjectCard key={p.key} project={p} />
            ))}
          </section>

          <section className={styles.section} aria-labelledby="m-education">
            <h2 id="m-education" className={styles.h2}>
              {sections.education}
            </h2>
            {education.map((e) => (
              <article key={e.degree} className={styles.article}>
                <div className={styles.when}>{e.when}</div>
                <h3 className={styles.h3}>{e.degree}</h3>
                <p className={styles.text}>{e.school}</p>
              </article>
            ))}
          </section>

          <section className={styles.section} aria-labelledby="m-awards">
            <h2 id="m-awards" className={styles.h2}>
              {sections.awards}
            </h2>
            <ul className={styles.bullets}>
              {awards.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="m-languages">
            <h2 id="m-languages" className={styles.h2}>
              {sections.languages}
            </h2>
            <ul className={styles.chips}>
              {languages.map((l) => (
                <li key={l.name} className={styles.chip}>
                  {l.name}: {l.level}
                </li>
              ))}
            </ul>
          </section>

          <section id="resume" className={styles.section} aria-labelledby="m-resume">
            <h2 id="m-resume" className={styles.h2}>
              Resume
            </h2>
            <ResumeViewer />
          </section>

          <section className={styles.contact} aria-labelledby="m-contact">
            <h2 id="m-contact" className={styles.h2Contact}>
              Contact
            </h2>
            <p className={styles.contactText}>{statusLine}</p>
            <PlaceholderLink href={emailHref(links.email)} className={styles.email}>
              {links.email}
            </PlaceholderLink>
          </section>
        </main>

        <footer className={styles.footer}>
          <AsciiDivider pattern="·-=-·" />
          <div className={styles.footRow}>
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
