import styles from './MoreArt.module.css';

const CARDS = [
  { name: 'helpdesk', widths: [80, 50], delay: '0s', accent: true },
  { name: 'sso hub', widths: [65, 85], delay: '0.7s', accent: false },
  { name: 'workflow', widths: [90, 40], delay: '1.4s', accent: false },
];

/** Three floating system cards. */
export function MoreArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      {CARDS.map((c) => (
        <div
          key={c.name}
          className={`${styles.card} ${c.accent ? styles.accent : ''}`}
          style={{ animationDelay: c.delay }}
        >
          <span className={styles.name}>{c.name}</span>
          {c.widths.map((w) => (
            <span key={w} className={styles.bar} style={{ width: `${w}%` }} />
          ))}
        </div>
      ))}
    </div>
  );
}
