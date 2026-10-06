import {
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { windowDefs, type WindowId } from '../data/windows';
import type { ProjectKey } from '../data/projects';
import type { HobbyKey } from '../data/hobbies';
import { usePageMeta } from '../lib/usePageMeta';
import { WallpaperPhoto } from '../components/WallpaperPhoto';
import { BootScreen } from './BootScreen';
import { DesktopIcons } from './DesktopIcons';
import { Polaroid } from './Polaroid';
import { StartMenu } from './StartMenu';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { Sticker } from './wallpapers/Sticker';
import { useWindowManager } from './useWindowManager';
import styles from './Desktop.module.css';

const About = lazy(() => import('./windows/About').then((m) => ({ default: m.About })));
const Projects = lazy(() => import('./windows/Projects').then((m) => ({ default: m.Projects })));
const Experience = lazy(() =>
  import('./windows/Experience').then((m) => ({ default: m.Experience })),
);
const Skills = lazy(() => import('./windows/Skills').then((m) => ({ default: m.Skills })));
const Setup = lazy(() => import('./windows/Setup').then((m) => ({ default: m.Setup })));
const Hobbies = lazy(() => import('./windows/Hobbies').then((m) => ({ default: m.Hobbies })));
const Contact = lazy(() => import('./windows/Contact').then((m) => ({ default: m.Contact })));
const Resume = lazy(() => import('./windows/Resume').then((m) => ({ default: m.Resume })));

const BOOT_MS = 2500;
const CLOCK_MS = 20_000;

const formatTime = (d: Date) =>
  `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

interface Props {
  /** Accent colour (one of the palette's two accents), exposed to every descendant as `--acc`. */
  accent?: '#3B82F6' | '#60A5FA';
}

export function Desktop({ accent = '#3B82F6' }: Props) {
  usePageMeta({
    title: 'Aum · Full-stack engineer',
    description:
      'Aum, a full-stack engineer in Vadodara, India, building backends and LLM-powered products in Node.js and TypeScript. Open to roles in the Netherlands, Finland and Germany.',
  });

  const wm = useWindowManager();
  const [booting, setBooting] = useState(true);
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [project, setProject] = useState<ProjectKey>('phonedeck');
  const [hobby, setHobby] = useState<HobbyKey>('f1');
  const icons = useRef<Partial<Record<WindowId, HTMLButtonElement | null>>>({});

  const { open, close, minimize, taskbar, closeStart, toggleStart } = wm;

  useEffect(() => {
    const clock = setInterval(() => setTime(formatTime(new Date())), CLOCK_MS);
    const boot = setTimeout(() => {
      setBooting(false);
      open('about');
    }, BOOT_MS);
    return () => {
      clearInterval(clock);
      clearTimeout(boot);
    };
  }, [open]);

  const registerIcon = useCallback((id: WindowId, el: HTMLButtonElement | null) => {
    icons.current[id] = el;
  }, []);

  // Closing hands keyboard focus back to the icon that opens the window.
  const closeWindow = useCallback(
    (id: WindowId) => {
      close(id);
      requestAnimationFrame(() => icons.current[id]?.focus({ preventScroll: true }));
    },
    [close],
  );

  const visible = (id: WindowId) => wm.state.open.includes(id) && !wm.state.min[id];

  const bodies: Record<WindowId, ReactNode> = {
    about: <About onOpen={open} />,
    projects: <Projects selected={project} onSelect={setProject} />,
    experience: <Experience />,
    skills: <Skills />,
    setup: <Setup />,
    hobbies: <Hobbies selected={hobby} onSelect={setHobby} />,
    contact: <Contact />,
    resume: <Resume />,
  };

  return (
    <div
      className={styles.desktop}
      data-wp-light="true"
      style={{ '--acc': accent, '--acc2': `${accent}2E` } as CSSProperties}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && wm.state.startOpen) closeStart();
      }}
    >
      <div className={styles.layer} aria-hidden="true">
        <WallpaperPhoto variant="desktop" />
      </div>

      <div className={styles.vignette} />
      {/* Clicking the bare wallpaper dismisses the Start menu. */}
      <div className={styles.dismiss} onClick={closeStart} />

      <Sticker />
      <Polaroid onOpen={() => open('about')} />
      <DesktopIcons onOpen={open} registerRef={registerIcon} />

      <div className={styles.windows}>
        {wm.state.open.map((id) =>
          visible(id) ? (
            <Window
              key={id}
              def={windowDefs[id]}
              z={10 + (wm.state.z[id] ?? 0)}
              accentShadow={id === 'contact'}
              onFocus={() => open(id)}
              onMinimize={() => minimize(id)}
              onClose={() => closeWindow(id)}
            >
              {bodies[id]}
            </Window>
          ) : null,
        )}
      </div>

      {wm.state.startOpen && <StartMenu onOpen={open} />}

      <Taskbar
        open={wm.state.open}
        active={wm.top}
        startOpen={wm.state.startOpen}
        time={time}
        onStart={toggleStart}
        onTask={taskbar}
      />

      {booting && <BootScreen />}
    </div>
  );
}
