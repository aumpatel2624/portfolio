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
import { wallpapers } from '../data/wallpapers';
import type { ProjectKey } from '../data/projects';
import type { HobbyKey } from '../data/hobbies';
import { usePageMeta } from '../lib/usePageMeta';
import { WallpaperPhoto } from '../components/WallpaperPhoto';
import { BootScreen } from './BootScreen';
import { DesktopIcons } from './DesktopIcons';
import { Mug } from './Mug';
import { Polaroid } from './Polaroid';
import { QuoteCard } from './QuoteCard';
import { StartMenu } from './StartMenu';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { RaceDay } from './wallpapers/RaceDay';
import { Sticker } from './wallpapers/Sticker';
import { useWallpaper } from './useWallpaper';
import { useWindowManager } from './useWindowManager';
import styles from './Desktop.module.css';

const PaddockNight = lazy(() =>
  import('./wallpapers/PaddockNight').then((m) => ({ default: m.PaddockNight })),
);
const ReadingNook = lazy(() =>
  import('./wallpapers/ReadingNook').then((m) => ({ default: m.ReadingNook })),
);

const About = lazy(() => import('./windows/About').then((m) => ({ default: m.About })));
const Projects = lazy(() => import('./windows/Projects').then((m) => ({ default: m.Projects })));
const Experience = lazy(() =>
  import('./windows/Experience').then((m) => ({ default: m.Experience })),
);
const Skills = lazy(() => import('./windows/Skills').then((m) => ({ default: m.Skills })));
const Hobbies = lazy(() => import('./windows/Hobbies').then((m) => ({ default: m.Hobbies })));
const Contact = lazy(() => import('./windows/Contact').then((m) => ({ default: m.Contact })));
const Resume = lazy(() => import('./windows/Resume').then((m) => ({ default: m.Resume })));

const BOOT_MS = 2500;
const CLOCK_MS = 20_000;
const LAP_MS = 5000;
const LAPS = 57;

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
  const wp = useWallpaper();
  const [booting, setBooting] = useState(true);
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [lap, setLap] = useState(1);
  const [project, setProject] = useState<ProjectKey>('phonedeck');
  const [hobby, setHobby] = useState<HobbyKey>('f1');
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const icons = useRef<Partial<Record<WindowId, HTMLButtonElement | null>>>({});

  const { open, close, minimize, taskbar, closeStart, toggleStart } = wm;

  useEffect(() => {
    const clock = setInterval(() => setTime(formatTime(new Date())), CLOCK_MS);
    const laps = setInterval(() => setLap((l) => (l % LAPS) + 1), LAP_MS);
    const boot = setTimeout(() => {
      setBooting(false);
      open('about');
    }, BOOT_MS);
    return () => {
      clearInterval(clock);
      clearInterval(laps);
      clearTimeout(boot);
    };
  }, [open]);

  // Mount a wallpaper the first time it is shown, then keep it mounted for the crossfade back.
  if (!seen.has(wp.index)) setSeen(new Set(seen).add(wp.index));

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

  const cycleWallpaper = useCallback(() => {
    closeStart();
    wp.cycle();
  }, [closeStart, wp]);

  const current = wallpapers[wp.index] ?? wallpapers[0]!;
  const visible = (id: WindowId) => wm.state.open.includes(id) && !wm.state.min[id];

  const bodies: Record<WindowId, ReactNode> = {
    about: <About onOpen={open} />,
    projects: <Projects selected={project} onSelect={setProject} />,
    experience: <Experience />,
    skills: <Skills />,
    hobbies: <Hobbies selected={hobby} onSelect={setHobby} />,
    contact: <Contact />,
    resume: <Resume />,
  };

  const layers: { index: number; node: ReactNode }[] = [
    { index: 0, node: <WallpaperPhoto variant="desktop" /> },
    { index: 1, node: seen.has(1) ? <RaceDay lap={lap} /> : null },
    { index: 2, node: seen.has(2) ? <PaddockNight /> : null },
    { index: 3, node: seen.has(3) ? <ReadingNook /> : null },
  ];

  return (
    <div
      className={styles.desktop}
      data-wp-light={current.light ? 'true' : undefined}
      style={{ '--acc': accent, '--acc2': `${accent}2E` } as CSSProperties}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && wm.state.startOpen) closeStart();
      }}
    >
      {layers.map(({ index, node }) => (
        <div
          key={index}
          className={`${styles.layer} ${wp.index === index ? styles.layerOn : ''}`}
          aria-hidden="true"
        >
          {node}
        </div>
      ))}

      <Mug />
      {current.quote && (
        <QuoteCard quote={current.quote} by={current.by ?? ''} visible={wp.quoteVisible} />
      )}

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

      {wm.state.startOpen && <StartMenu onOpen={open} onWallpaper={cycleWallpaper} />}

      <Taskbar
        open={wm.state.open}
        active={wm.top}
        startOpen={wm.state.startOpen}
        wallpaperName={current.name}
        time={time}
        onStart={toggleStart}
        onTask={taskbar}
        onWallpaper={cycleWallpaper}
      />

      {booting && <BootScreen />}
    </div>
  );
}
