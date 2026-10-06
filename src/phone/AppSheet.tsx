import { useEffect, useRef, type Dispatch } from 'react';
import { phoneAppTitles, phoneCopy, phoneProjectTitles } from '../data/phone';
import { About } from './apps/About';
import { Contact } from './apps/Contact';
import { Experience } from './apps/Experience';
import { Hobbies } from './apps/Hobbies';
import { Photos } from './apps/Photos';
import { Projects } from './apps/Projects';
import { Resume } from './apps/Resume';
import { Setup } from './apps/Setup';
import { Skills } from './apps/Skills';
import type { PhoneAction, PhoneState } from './phoneState';
import styles from './Phone.module.css';

interface Props {
  state: PhoneState;
  dispatch: Dispatch<PhoneAction>;
  /** Opens another app from inside a sheet, growing from the middle of the screen. */
  onOpen: (app: 'projects' | 'contact') => void;
  onClose: () => void;
}

function Body({ state, dispatch, onOpen }: Omit<Props, 'onClose'>) {
  switch (state.app) {
    case 'about':
      return <About onProjects={() => onOpen('projects')} onContact={() => onOpen('contact')} />;
    case 'projects':
      return (
        <Projects
          project={state.project}
          onPick={(project) => dispatch({ type: 'project', project })}
        />
      );
    case 'experience':
      return <Experience />;
    case 'skills':
      return <Skills />;
    case 'setup':
      return <Setup />;
    case 'hobbies':
      return (
        <Hobbies selected={state.hobby} onSelect={(hobby) => dispatch({ type: 'hobby', hobby })} />
      );
    case 'photos':
      return <Photos />;
    case 'contact':
      return <Contact />;
    case 'resume':
      return <Resume />;
    default:
      return null;
  }
}

/** A full-screen app that grows from the icon that opened it. */
export function AppSheet({ state, dispatch, onOpen, onClose }: Props) {
  const back = useRef<HTMLButtonElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const { app, project, origin, closing } = state;

  // Keyboard users land in the sheet; a new project or app starts at the top.
  useEffect(() => back.current?.focus({ preventScroll: true }), []);
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0;
  }, [app, project]);

  if (!app) return null;
  const inDetail = app === 'projects' && project !== null;
  const title = inDetail ? phoneProjectTitles[project] : phoneAppTitles[app];
  const chevronColor = 'var(--acc)';

  return (
    <div
      className={styles.sheet}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      data-closing={closing}
      style={{ transformOrigin: `${origin.x}px ${origin.y}px` }}
    >
      <div className={styles.sheetTop} />
      <div className={styles.navbar}>
        <button
          type="button"
          ref={back}
          className={styles.homeBack}
          aria-label="Back to home"
          onClick={onClose}
        >
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            stroke={chevronColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 2L2 8l6 6" />
          </svg>
          {phoneCopy.home}
        </button>
        <span className={styles.navTitle}>{title}</span>
        <span className={styles.navSpacer} />
      </div>
      <div className={styles.content} ref={scroller}>
        {inDetail && (
          <button
            type="button"
            className={styles.allProjects}
            onClick={() => dispatch({ type: 'project', project: null })}
          >
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              stroke={chevronColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 2L2 8l6 6" />
            </svg>
            {phoneCopy.allProjects}
          </button>
        )}
        <Body state={state} dispatch={dispatch} onOpen={onOpen} />
      </div>
    </div>
  );
}
