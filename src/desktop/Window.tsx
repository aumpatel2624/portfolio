import {
  Suspense,
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import type { WindowDef } from '../data/windows';
import styles from './Window.module.css';

interface Props {
  def: WindowDef;
  z: number;
  /** Contact uses the accent as its hard shadow colour. */
  accentShadow?: boolean;
  onFocus: () => void;
  onMinimize: () => void;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Window chrome: title bar, minimise and close. Focus follows `mousedown` on the window (not
 * click, so pressing close does not re-focus it), Escape closes it, and keyboard focus moves
 * into the dialog whenever it opens or is brought to the front.
 */
export function Window({ def, z, accentShadow, onFocus, onMinimize, onClose, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const titleId = `win-title-${def.id}`;

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, [z]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
    }
  };

  const style = {
    '--win-w': `${def.width}px`,
    '--win-dx': `${def.dx}px`,
    '--win-dy': `${def.dy}px`,
    zIndex: z,
  } as CSSProperties;

  return (
    <section
      ref={ref}
      className={`${styles.win} ${accentShadow ? styles.accentShadow : ''}`}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      style={style}
      onMouseDown={onFocus}
      onKeyDown={onKeyDown}
    >
      <div className={styles.titleBar}>
        <span id={titleId} className={styles.title}>
          {def.path}
        </span>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.wbtn}
            aria-label={`Minimize ${def.aria}`}
            onClick={onMinimize}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="#F6ECDC"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 10h8" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.wbtn} ${styles.wbtnX}`}
            aria-label={`Close ${def.aria}`}
            onClick={onClose}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="#F6ECDC"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        </div>
      </div>
      <Suspense fallback={<div className={styles.loading} aria-busy="true" />}>{children}</Suspense>
    </section>
  );
}
