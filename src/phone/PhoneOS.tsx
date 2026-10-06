import { useCallback, useEffect, useReducer, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AsciiArt } from '../ascii/AsciiArt';
import { AsciiWordmark } from '../ascii/AsciiWordmark';
import { aumWordmark, fullAscii } from '../ascii/art.generated';
import { phoneCopy, phoneHomeApps, type PhoneAppId } from '../data/phone';
import { wallpapers } from '../data/wallpapers';
import { usePageMeta } from '../lib/usePageMeta';
import { AppSheet } from './AppSheet';
import { appIcons, dockIcons } from './icons';
import { CLOSE_MS, initialPhoneState, phoneReducer } from './phoneState';
import { RaceWidget } from './RaceWidget';
import { usePhoneWallpaper } from './usePhoneWallpaper';
import { Wallpapers } from './Wallpapers';
import styles from './Phone.module.css';

const BOOT_MS = 2300;
const CLOCK_MS = 20_000;
const LAP_MS = 5000;
const LAPS = 57;

/** The design's clock: hours are not zero-padded. */
const formatTime = (d: Date) => `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function Glyph({ d, stroke = 'var(--text)' }: { d: string; stroke?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function StatusBar({ time }: { time: string }) {
  return (
    <div className={styles.status} aria-hidden="true">
      <span>{time}</span>
      <span className={styles.statusIcons}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="var(--text)">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="7" rx="1" />
          <rect x="10" y="2" width="3" height="10" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          stroke="var(--text)"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M1.5 4.5a9.5 9.5 0 0 1 13 0" />
          <path d="M4 7.2a6 6 0 0 1 8 0" />
          <path d="M6.6 9.8a2.4 2.4 0 0 1 2.8 0" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="var(--text)" opacity=".6" />
          <rect x="2" y="2" width="16" height="8" rx="2" fill="var(--acc)" />
          <rect x="24" y="4" width="2" height="4" rx="1" fill="var(--text)" opacity=".6" />
        </svg>
      </span>
    </div>
  );
}

/** Boot splash: the ASCII wordmark over a dim ASCII portrait, then the progress bar. */
function Boot() {
  return (
    <div className={styles.boot} role="status" aria-label="Starting portfolio.os">
      <AsciiArt art={fullAscii} size="lg" className={styles.bootBackdrop} />
      <AsciiWordmark
        mark={aumWordmark}
        accentFrom={aumWordmark.accentFrom}
        label="aum."
        className={styles.bootLogo}
      />
      <div className={styles.bootTrack} aria-hidden="true">
        <div className={styles.bootFill} />
      </div>
      <div className={styles.bootText} aria-hidden="true">
        {phoneCopy.boot}
      </div>
    </div>
  );
}

interface Props {
  /** Accent colour (one of the palette's two accents), exposed to every descendant as `--acc`. */
  accent?: '#3B82F6' | '#60A5FA';
}

/** The phone view: an iPhone-style home screen of apps over animated wallpapers. */
export function PhoneOS({ accent = '#3B82F6' }: Props) {
  usePageMeta({
    title: 'Aum · Full-stack engineer',
    description:
      'Aum, a full-stack engineer in Vadodara, India, building backends and LLM-powered products in Node.js and TypeScript. Open to roles in the Netherlands, Finland and Germany.',
  });

  const [state, dispatch] = useReducer(phoneReducer, initialPhoneState);
  const wp = usePhoneWallpaper();
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [lap, setLap] = useState(1);
  const [booting, setBooting] = useState(() => !reducedMotion());
  const phone = useRef<HTMLDivElement>(null);
  const invoker = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const clock = setInterval(() => setTime(formatTime(new Date())), CLOCK_MS);
    const laps = setInterval(() => setLap((l) => (l % LAPS) + 1), LAP_MS);
    const boot = setTimeout(() => setBooting(false), BOOT_MS);
    return () => {
      clearInterval(clock);
      clearInterval(laps);
      clearTimeout(boot);
    };
  }, []);

  // Let the view reach under notches and home indicators (env(safe-area-inset-*)); undone on leave.
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    const previous = meta?.getAttribute('content');
    if (meta && previous && !previous.includes('viewport-fit')) {
      meta.setAttribute('content', `${previous}, viewport-fit=cover`);
    }
    return () => {
      if (meta && previous) meta.setAttribute('content', previous);
    };
  }, []);

  // The sheet unmounts once its close animation has played.
  useEffect(() => {
    if (!state.closing) return;
    const t = setTimeout(() => dispatch({ type: 'closed' }), CLOSE_MS);
    return () => clearTimeout(t);
  }, [state.closing]);

  // Closing hands keyboard focus back to the icon that opened the app.
  useEffect(() => {
    if (state.app) {
      wasOpen.current = true;
    } else if (wasOpen.current) {
      wasOpen.current = false;
      if (invoker.current?.isConnected) invoker.current.focus({ preventScroll: true });
    }
  }, [state.app]);

  /** Opens `app` growing from `from` (an icon or widget), or from mid-screen when opened from a sheet. */
  const open = useCallback((app: PhoneAppId, from?: HTMLElement | null) => {
    const bounds = phone.current?.getBoundingClientRect();
    let origin = { x: (bounds?.width ?? 390) / 2, y: (bounds?.height ?? 844) / 2 };
    if (from && bounds) {
      const r = from.getBoundingClientRect();
      origin = { x: r.left - bounds.left + r.width / 2, y: r.top - bounds.top + r.height / 2 };
      invoker.current = from;
    }
    dispatch({ type: 'open', app, origin });
  }, []);
  const close = useCallback(() => dispatch({ type: 'close' }), []);

  const current = wallpapers[wp.index] ?? wallpapers[0]!;
  const locked = state.app !== null || booting;
  // `inert` takes the covered home screen out of the tab order and the accessibility tree.
  const inertProps = { inert: locked ? '' : undefined } as object;

  return (
    <div
      className={styles.root}
      data-wp-light={current.light ? 'true' : undefined}
      style={{ '--acc': accent, '--acc2': `${accent}2E` } as CSSProperties}
    >
      <div
        ref={phone}
        className={styles.phone}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && state.app) close();
        }}
      >
        <Wallpapers index={wp.index} />
        <StatusBar time={time} />

        <div className={styles.homeLayer} {...inertProps}>
          <main className={styles.home}>
            <h1 className="sr-only">Aum · Full-stack engineer</h1>
            <RaceWidget lap={lap} laps={LAPS} />

            <div className={styles.widgets}>
              <button
                type="button"
                className={`${styles.widget} ${styles.photoWidget}`}
                aria-label="Open About"
                onClick={(e) => open('about', e.currentTarget)}
              >
                <img
                  src="/images/aum-portrait.jpg"
                  alt=""
                  width={164}
                  height={164}
                  className={styles.photoImg}
                />
                <span className={styles.photoCaption}>
                  {phoneCopy.widgetHello}
                  <span className={styles.acc}>.</span>
                </span>
              </button>
              <button
                type="button"
                className={`${styles.widget} ${styles.quoteWidget}`}
                aria-label="Next quote and wallpaper"
                aria-describedby={current.quote ? 'phone-quote phone-quote-by' : undefined}
                onClick={wp.cycle}
              >
                <span className={styles.wpName}>{current.name}</span>
                {current.quote ? (
                  <>
                    <span
                      id="phone-quote"
                      className={styles.quote}
                      style={{ opacity: wp.quoteVisible ? 1 : 0 }}
                    >
                      “{current.quote}”
                    </span>
                    <span
                      id="phone-quote-by"
                      className={styles.quoteBy}
                      style={{ opacity: wp.quoteVisible ? 1 : 0 }}
                    >
                      {current.by}
                    </span>
                  </>
                ) : null}
              </button>
            </div>

            <div className={styles.apps} role="group" aria-label="Apps">
              {phoneHomeApps.map((app, i) => (
                <button
                  key={app.id}
                  type="button"
                  className={styles.app}
                  aria-label={`Open ${app.label}`}
                  style={{ animationDelay: `${(2.2 + i * 0.08).toFixed(2)}s` }}
                  onClick={(e) => open(app.id, e.currentTarget)}
                >
                  <span
                    className={styles.tile}
                    style={{ background: appIcons[app.id as keyof typeof appIcons].bg }}
                  >
                    <Glyph d={appIcons[app.id as keyof typeof appIcons].d} />
                  </span>
                  <span className={styles.appLabel}>{app.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.dots} aria-hidden="true">
              <span />
              <span className={styles.dotOff} />
            </div>
          </main>

          <nav className={styles.dock} aria-label="Dock">
            <button
              type="button"
              className={styles.app}
              aria-label="Contact"
              style={{ animationDelay: '2.5s' }}
              onClick={(e) => open('contact', e.currentTarget)}
            >
              <span className={styles.tile} style={{ background: dockIcons.contact.bg }}>
                <Glyph d={dockIcons.contact.d} stroke={dockIcons.contact.fg} />
              </span>
            </button>
            <button
              type="button"
              className={styles.app}
              aria-label="Resume"
              style={{ animationDelay: '2.58s' }}
              onClick={(e) => open('resume', e.currentTarget)}
            >
              <span className={styles.tile} style={{ background: dockIcons.resume.bg }}>
                <Glyph d={dockIcons.resume.d} stroke={dockIcons.resume.fg} />
              </span>
            </button>
            <Link
              className={styles.app}
              to="/classic"
              aria-label="Classic site"
              style={{ animationDelay: '2.66s' }}
            >
              <span className={styles.tile} style={{ background: dockIcons.classic.bg }}>
                <Glyph d={dockIcons.classic.d} stroke={dockIcons.classic.fg} />
              </span>
            </Link>
            <button
              type="button"
              className={styles.app}
              aria-label="Change wallpaper"
              style={{ animationDelay: '2.74s' }}
              onClick={wp.cycle}
            >
              <span className={styles.tile} style={{ background: dockIcons.wallpaper.bg }}>
                <Glyph d={dockIcons.wallpaper.d} stroke={dockIcons.wallpaper.fg} />
              </span>
            </button>
          </nav>
        </div>

        {state.app && (
          <AppSheet state={state} dispatch={dispatch} onOpen={(app) => open(app)} onClose={close} />
        )}

        <button
          type="button"
          className={styles.homeBar}
          aria-label="Go to home screen"
          onClick={close}
        >
          <span />
        </button>

        <div className={styles.toastHost} role="status" aria-live="polite">
          {wp.toast && <div className={styles.toast}>Wallpaper: {current.name}</div>}
        </div>

        {booting && <Boot />}
      </div>
    </div>
  );
}
