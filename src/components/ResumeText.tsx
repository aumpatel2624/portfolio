import { awards, education, languages } from '../data/education';
import { experience } from '../data/experience';
import { links, linkText } from '../data/links';
import { profile, statusLine } from '../data/profile';
import { aiProjects, workProjects, type Project } from '../data/projects';
import { sections } from '../data/sections';
import { skills } from '../data/skills';
import styles from './ResumeViewer.module.css';

function Entry({ project }: { project: Project }) {
  return (
    <>
      <h4>{[project.title, project.context].filter(Boolean).join(' | ')}</h4>
      {project.summary && <p>{project.summary}</p>}
      {project.bullets.length > 0 && (
        <ul>
          {project.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {project.stack && <p>{project.stack}</p>}
      {project.link && <p>{project.link.label}</p>}
    </>
  );
}

/** The text alternative to the resume page images, in CV order. Collapsed until asked for. */
export function ResumeText() {
  return (
    <details className={styles.text} data-resume-text>
      <summary>Text version</summary>
      <h3>
        {profile.name}, {profile.role}
      </h3>
      <p>
        {profile.location} · {links.email}
      </p>
      <p>
        {linkText.linkedin} · {linkText.github}
      </p>
      <p>{statusLine}</p>
      <h3>{sections.profile}</h3>
      <p>{profile.summary}</p>
      <h3>{sections.ai}</h3>
      {aiProjects.map((p) => (
        <Entry key={p.key} project={p} />
      ))}
      <h3>{sections.experience}</h3>
      {experience.map((e) => (
        <div key={e.title}>
          <h4>
            {e.title} | {e.place}
          </h4>
          <p>{e.when}</p>
          <ul>
            {e.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p>{e.stack}</p>
        </div>
      ))}
      <h3>{sections.skills}</h3>
      {skills.map((g) => (
        <div key={g.title}>
          <h4>{g.title}</h4>
          {g.rows.map((row) => (
            <p key={row.level ?? g.title}>
              {row.level && `${row.level}: `}
              {row.items.join(', ')}
            </p>
          ))}
        </div>
      ))}
      <h3>
        {sections.work} · {sections.workScope}
      </h3>
      {workProjects.map((p) => (
        <Entry key={p.key} project={p} />
      ))}
      <h3>{sections.education}</h3>
      {education.map((e) => (
        <div key={e.degree}>
          <h4>{e.degree}</h4>
          <p>{e.when}</p>
          <p>{e.school}</p>
        </div>
      ))}
      <h3>{sections.awards}</h3>
      {awards.map((a) => (
        <p key={a}>{a}</p>
      ))}
      <h3>{sections.languages}</h3>
      <ul>
        {languages.map((l) => (
          <li key={l.name}>
            {l.name}: {l.level}
          </li>
        ))}
      </ul>
    </details>
  );
}
