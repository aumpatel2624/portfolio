import { WINDOW_IDS, windowDefs, type WindowId } from '../data/windows';
import styles from './DesktopIcons.module.css';

interface Props {
  onOpen: (id: WindowId) => void;
  registerRef: (id: WindowId, el: HTMLButtonElement | null) => void;
}

/** Single column of desktop icons that wraps into extra columns on short screens. */
export function DesktopIcons({ onOpen, registerRef }: Props) {
  return (
    <div className={styles.icons}>
      {WINDOW_IDS.map((id, i) => {
        const def = windowDefs[id];
        return (
          <button
            key={id}
            ref={(el) => registerRef(id, el)}
            type="button"
            className={styles.ic}
            aria-label={`Open ${def.title}`}
            onClick={() => onOpen(id)}
            style={{ animationDelay: `${(2.1 + i * 0.09).toFixed(2)}s` }}
          >
            {def.kind === 'folder' ? (
              <svg
                className={styles.art}
                width="56"
                height="48"
                viewBox="0 0 56 48"
                fill="none"
                stroke="var(--acc)"
                strokeWidth="2"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M4 10a4 4 0 0 1 4-4h12l5 6h23a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"
                  fill="#241A17"
                />
              </svg>
            ) : (
              <svg
                className={styles.art}
                width="56"
                height="48"
                viewBox="0 0 56 48"
                fill="none"
                stroke="#F6ECDC"
                strokeWidth="2"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M14 4h20l10 10v28a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
                  fill="#241A17"
                />
                <path d="M34 4v10h10" />
                <path d="M19 26h18M19 33h18" />
              </svg>
            )}
            <span className={styles.label}>{def.title}</span>
          </button>
        );
      })}
    </div>
  );
}
