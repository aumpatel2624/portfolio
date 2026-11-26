import { useState } from 'react';
import { links, resumeLabel, resumeOpenLabel } from '../data/links';
import { resumePages, resumePageSize } from '../data/resume';
import { PlaceholderLink } from '../lib/PlaceholderLink';
import { ResumeText } from './ResumeText';
import styles from './ResumeViewer.module.css';

const ZOOMS = [1, 1.5, 2, 2.5, 3];

/**
 * The whole resume on screen as page images, which phone browsers show reliably (an embedded PDF
 * often fails there). Zooming widens the pages inside their own scroll area; pinch zoom works too.
 */
export function ResumeViewer() {
  const [step, setStep] = useState(0);
  const zoom = ZOOMS[step] ?? 1;
  return (
    <div className={styles.viewer}>
      <div className={styles.bar}>
        <PlaceholderLink
          href={links.resume}
          download
          aria-label={resumeLabel}
          className={`${styles.action} ${styles.primary}`}
        >
          Download PDF
        </PlaceholderLink>
        <PlaceholderLink
          href={links.resume}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={resumeOpenLabel}
          className={styles.action}
        >
          Open in new tab
        </PlaceholderLink>
        <div className={styles.zoom} role="group" aria-label="Zoom">
          <button
            type="button"
            className={styles.action}
            aria-label="Zoom out"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            −
          </button>
          <output className={styles.level}>{Math.round(zoom * 100)}%</output>
          <button
            type="button"
            className={styles.action}
            aria-label="Zoom in"
            disabled={step === ZOOMS.length - 1}
            onClick={() => setStep(step + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.scroll} role="region" aria-label="Resume pages" tabIndex={0}>
        <div className={styles.pages} style={{ width: `${zoom * 100}%` }}>
          {resumePages.map((src, i) => (
            <img
              key={src}
              className={styles.page}
              src={src}
              alt={`Resume page ${i + 1} of ${resumePages.length}`}
              width={resumePageSize.width}
              height={resumePageSize.height}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
      <ResumeText />
    </div>
  );
}
