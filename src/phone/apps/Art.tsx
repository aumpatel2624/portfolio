import type { CSSProperties } from 'react';
import styles from './Art.module.css';

/** Illustration panels for the project and hobby screens. Decorative, so hidden from screen readers. */

const delay = (s: string): CSSProperties => ({ animationDelay: s });

export function PhoneDeckArt() {
  return (
    <div className={`${styles.art} ${styles.deck}`} aria-hidden="true">
      <div className={styles.phone}>
        {['0s', '0.4s', '0.8s', '1.2s'].map((d) => (
          <div key={d} className={styles.tile} style={delay(d)} />
        ))}
      </div>
      <div className={styles.channel}>
        <span className={styles.channelLabel}>noise ik · encrypted</span>
        {['0s', '0.8s', '1.6s'].map((d) => (
          <span key={d} className={styles.packet} style={delay(d)} />
        ))}
      </div>
      <div className={styles.laptop}>
        <div className={styles.screen}>
          <div className={styles.line} style={{ width: '70%' }} />
          <div className={styles.line} style={{ width: '45%' }} />
          <div className={styles.allow}>Allow</div>
        </div>
        <div className={styles.base} />
      </div>
    </div>
  );
}

export function RecruitArt() {
  return (
    <div className={`${styles.art} ${styles.recruit}`} aria-hidden="true">
      <div className={styles.doc}>
        <div className={styles.docTitle} />
        {['100%', '88%', '94%', '60%', '90%'].map((w, i) => (
          <div key={i} className={styles.docLine} style={{ width: w }} />
        ))}
        <span className={styles.scan} />
      </div>
      <div className={styles.gemini}>
        <span className={styles.geminiLabel}>Gemini</span>
        <span className={styles.arrow}>→</span>
      </div>
      <div className={styles.chips}>
        {[
          ['"name": "…"', '0s'],
          ['"skills": [ … ]', '0.5s'],
          ['"experience": …', '1s'],
        ].map(([text, d]) => (
          <span
            key={text}
            className={styles.chip}
            style={{ animation: `chipIn 3.6s ease-in-out ${d} infinite` }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export function WhatsAppArt() {
  const bubble = (d: string) => ({ animation: `bubble 6s ease-in-out ${d} infinite` });
  return (
    <div className={`${styles.art} ${styles.whatsapp}`} aria-hidden="true">
      <div className={styles.bubbles}>
        <div className={styles.bubble} style={bubble('0s')}>
          2 kg rice and 1 oil please
        </div>
        <div className={styles.bubble} style={bubble('1s')}>
          deliver on friday
        </div>
      </div>
      <span className={`${styles.arrow} ${styles.arrowSolo}`}>→</span>
      <div className={styles.chips}>
        <span className={styles.chip} style={bubble('2s')}>
          2 items matched
        </span>
        <span className={styles.chip} style={bubble('2.5s')}>
          delivery: friday
        </span>
      </div>
      <span className={styles.tag}>illustration</span>
    </div>
  );
}

export function MoreArt() {
  return (
    <div className={`${styles.art} ${styles.more}`} aria-hidden="true">
      {['helpdesk', 'sso hub', 'workflow'].map((name, i) => (
        <div
          key={name}
          className={`${styles.card} ${i === 0 ? styles.cardOn : ''}`}
          style={{ animation: `floaty 4s ease-in-out ${(i * 0.7).toFixed(1)}s infinite` }}
        >
          <span className={styles.cardName}>{name}</span>
          <span className={styles.cardLine} style={{ width: '80%' }} />
          <span className={styles.cardLine} style={{ width: '50%' }} />
        </div>
      ))}
    </div>
  );
}

export function F1Art() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.oval}>
        <svg
          width="280"
          height="110"
          viewBox="0 0 280 110"
          fill="none"
          stroke="var(--border)"
          strokeWidth="12"
          className={styles.ovalSvg}
        >
          <ellipse cx="140" cy="55" rx="120" ry="42" />
        </svg>
        <svg
          width="280"
          height="110"
          viewBox="0 0 280 110"
          fill="none"
          stroke="var(--acc)"
          strokeWidth="1"
          strokeDasharray="4 6"
          className={styles.ovalSvg}
        >
          <ellipse cx="140" cy="55" rx="120" ry="42" />
        </svg>
        <div className={styles.lapCar} />
      </div>
      <span className={styles.corner}>formula 1</span>
      <div className={styles.dots}>
        <span style={{ background: 'var(--danger)' }} />
        <span style={{ background: '#FFD27A' }} />
        <span style={{ background: 'var(--text)' }} />
      </div>
    </div>
  );
}

export function IotArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      {['0s', '0.8s', '1.6s'].map((d) => (
        <span
          key={d}
          className={styles.ping}
          style={{ animation: `ping 2.4s ease-out ${d} infinite` }}
        />
      ))}
      <div className={styles.board}>
        <span className={`${styles.pinsV} ${styles.pinsLeft}`} />
        <span className={`${styles.pinsV} ${styles.pinsRight}`} />
        <span className={`${styles.pinsH} ${styles.pinsTop}`} />
        <span className={`${styles.pinsH} ${styles.pinsBottom}`} />
        <span className={styles.boardLabel}>IoT</span>
        <div className={styles.leds}>
          <span
            style={{ background: 'var(--danger)', animation: 'ledBlink 1.2s steps(2) infinite' }}
          />
          <span
            style={{
              background: 'var(--acc)',
              animation: 'ledBlink 1.7s steps(2) infinite',
            }}
          />
          <span
            style={{ background: 'var(--text)', animation: 'ledBlink 0.9s steps(2) infinite' }}
          />
        </div>
      </div>
    </div>
  );
}

/** In DOM order; the stack is column-reverse, so the first book sits at the bottom. */
const BOOKS: [height: number, width: number, margin: number, color: string][] = [
  [24, 170, 0, '#7A3A2E'],
  [20, 150, 14, '#4B5E4A'],
  [22, 160, 4, '#B5733E'],
];

export function BooksArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.lamp} />
      <div className={styles.stack}>
        {BOOKS.map(([height, width, marginLeft, background]) => (
          <div
            key={background}
            className={styles.book}
            style={{ height, width, marginLeft, background }}
          />
        ))}
        <div
          className={`${styles.book} ${styles.topBook}`}
          style={{ height: 20, width: 140, marginLeft: 20, background: '#5A3D55' }}
        >
          <span className={styles.ribbon} />
        </div>
      </div>
    </div>
  );
}
