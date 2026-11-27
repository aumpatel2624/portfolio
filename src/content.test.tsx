import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ClassicHome } from './classic/ClassicHome';
import { ResumeText } from './components/ResumeText';
import {
  aiProjects,
  awards,
  certificates,
  certificatesHeading,
  education,
  experience,
  languages,
  links,
  linkText,
  profile,
  sections,
  skills,
  workProjects,
  type Project,
} from './data';
import { About as DesktopAbout } from './desktop/windows/About';
import { Contact as DesktopContact } from './desktop/windows/Contact';
import { Education as DesktopEducation } from './desktop/windows/Education';
import { Experience as DesktopExperience } from './desktop/windows/Experience';
import { Projects as DesktopProjects } from './desktop/windows/Projects';
import { Skills as DesktopSkills } from './desktop/windows/Skills';
import { About } from './phone/apps/About';
import { Contact } from './phone/apps/Contact';
import { Education } from './phone/apps/Education';
import { Experience } from './phone/apps/Experience';
import { Projects } from './phone/apps/Projects';
import { Skills } from './phone/apps/Skills';

const noop = () => {};
const workHeading = `${sections.work} · ${sections.workScope}`;

const projectText = (p: Project) =>
  [p.title, p.context, p.summary, ...p.bullets, p.stack, p.link?.label].filter((s): s is string =>
    Boolean(s),
  );

/** Every string the CV holds, apart from the omitted phone number. */
const cv = [
  profile.name,
  profile.role,
  profile.location,
  links.email,
  linkText.linkedin,
  linkText.github,
  profile.relocation,
  profile.visa,
  profile.availability,
  sections.profile,
  profile.summary,
  sections.ai,
  ...aiProjects.flatMap(projectText),
  sections.experience,
  ...experience.flatMap((e) => [e.title, e.place, e.when, ...e.points, e.stack]),
  sections.skills,
  ...skills.flatMap((g) => [g.title, ...g.rows.flatMap((r) => [r.level ?? g.title, ...r.items])]),
  sections.work,
  sections.workScope,
  ...workProjects.flatMap(projectText),
  sections.education,
  ...education.flatMap((e) => [e.degree, e.when, e.school]),
  sections.awards,
  ...awards,
  sections.languages,
  ...languages.map((l) => `${l.name}: ${l.level}`),
];

/** The course completion badges, which are not part of the CV. */
const badges = [
  certificatesHeading,
  ...certificates.flatMap((c) => [
    c.title,
    c.kind,
    c.issuer,
    `Issued ${c.issued}`,
    c.verifyUrl.replace('https://', ''),
  ]),
];

/** Visible text of each screen, one after another. */
function textOf(screens: ReactElement[]): string {
  return screens
    .map((screen) => {
      const view = render(<MemoryRouter>{screen}</MemoryRouter>);
      // The resume's text version repeats the CV, so it must not stand in for a missing screen.
      view.container.querySelectorAll('[data-resume-text]').forEach((el) => el.remove());
      const text = view.container.textContent ?? '';
      view.unmount();
      return text;
    })
    .join('\n');
}

function stubWidth(narrow: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      matches: narrow,
      addEventListener() {},
      removeEventListener() {},
    })),
  );
}

const desktopScreens = [
  <DesktopAbout onOpen={noop} />,
  ...aiProjects.map((p) => (
    <DesktopProjects heading={sections.ai} projects={aiProjects} selected={p.key} onSelect={noop} />
  )),
  <DesktopExperience />,
  <DesktopSkills />,
  ...workProjects.map((p) => (
    <DesktopProjects
      heading={workHeading}
      projects={workProjects}
      selected={p.key}
      onSelect={noop}
    />
  )),
  <DesktopEducation />,
  <DesktopContact />,
];

const phoneList = (heading: string, projects: Project[], scope?: string) =>
  [null, ...projects.map((p) => p.key)].map((selected) => (
    <Projects
      heading={heading}
      scope={scope}
      projects={projects}
      selected={selected}
      onPick={noop}
    />
  ));

const phoneScreens = [
  <About onProjects={noop} onContact={noop} />,
  ...phoneList(sections.ai, aiProjects),
  <Experience />,
  <Skills />,
  ...phoneList(sections.work, workProjects, sections.workScope),
  <Education />,
  <Contact />,
];

describe('CV content', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('is all in the text alternative to the resume page images', () => {
    const { container } = render(<ResumeText />);
    // Skills are comma-joined there, so level labels share a paragraph with their items.
    const text = container.textContent ?? '';
    const levels = ['Programming', ...skills.map((g) => g.title)];
    expect(cv.filter((s) => !text.includes(s) && !levels.includes(s))).toEqual([]);
  });

  it.each([
    ['desktop OS', false, desktopScreens],
    ['phone OS', true, phoneScreens],
    ['classic page', false, [<ClassicHome />]],
    ['classic page, mobile layout', true, [<ClassicHome />]],
  ])('is all reachable in the %s', (_, narrow, screens) => {
    stubWidth(narrow);
    const text = textOf(screens);
    expect([...cv, ...badges].filter((s) => !text.includes(s))).toEqual([]);
  });
});

describe('certificates', () => {
  afterEach(() => vi.unstubAllGlobals());

  it.each([
    ['desktop OS', false, <DesktopEducation />],
    ['phone OS', true, <Education />],
    ['classic page', false, <ClassicHome />],
    ['classic page, mobile layout', true, <ClassicHome />],
  ])('follow Awards, with image, verification link and PDF, in the %s', (_, narrow, screen) => {
    stubWidth(narrow);
    const view = render(<MemoryRouter>{screen}</MemoryRouter>);
    const headings = view.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    const at = headings.indexOf(certificatesHeading);
    expect(headings.slice(at - 1, at + 2)).toEqual([
      sections.awards,
      certificatesHeading,
      sections.languages,
    ]);
    for (const c of certificates) {
      expect(view.getByRole('img', { name: c.alt })).toHaveAttribute('src', c.image);
      expect(view.getByRole('link', { name: c.verifyUrl.replace('https://', '') })).toHaveAttribute(
        'href',
        c.verifyUrl,
      );
      expect(
        view.getByRole('link', { name: `Open the ${c.title} badge (PDF) in a new tab` }),
      ).toHaveAttribute('href', c.pdf);
    }
  });
});
