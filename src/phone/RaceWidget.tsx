import styles from './RaceWidget.module.css';

const TRACK =
  'M60 190 C 40 140 60 90 120 70 S 220 60 260 40 S 360 30 370 90 S 330 150 290 160 S 250 220 190 225 S 80 235 60 190 Z';

const CARS = [
  { fill: 'var(--danger)', dur: '8.2s', begin: '-0.5s' },
  { fill: 'var(--accent)', dur: '8.4s', begin: '-1.4s' },
  { fill: '#5CE1FF', dur: '8.6s', begin: '-2.6s' },
  { fill: 'var(--text)', dur: '8.8s', begin: '-3.7s' },
  { fill: '#9B8CFF', dur: '9.0s', begin: '-4.9s' },
];

const STANDINGS = [
  { color: 'var(--danger)', gap: 'LEAD' },
  { color: 'var(--accent)', gap: '+1.8' },
  { color: '#5CE1FF', gap: '+3.4' },
  { color: 'var(--text)', gap: '+5.1' },
  { color: '#9B8CFF', gap: '+6.9' },
  { color: 'var(--success)', gap: '+9.2' },
];

/** Live race-day widget: a track map with five cars and the top six of the standings. */
export function RaceWidget({ lap, laps }: { lap: number; laps: number }) {
  return (
    <div className={styles.widget} role="img" aria-label={`Race day, lap ${lap} of ${laps}, live`}>
      <div className={styles.bar} aria-hidden="true">
        <span>
          RACE DAY · LAP {lap} / {laps}
        </span>
        <span className={styles.live}>
          <span className={styles.liveDot} />
          LIVE
        </span>
      </div>
      <svg viewBox="0 0 400 260" aria-hidden="true" className={styles.track}>
        <path d={TRACK} fill="none" stroke="#263041" strokeWidth="16" strokeLinejoin="round" />
        <path d={TRACK} fill="none" stroke="#4A5568" strokeWidth="2" strokeDasharray="4 6" />
        {CARS.map((c) => (
          <circle key={c.fill} r="7" fill={c.fill}>
            <animateMotion dur={c.dur} begin={c.begin} repeatCount="indefinite" path={TRACK} />
          </circle>
        ))}
      </svg>
      <div className={styles.standings} aria-hidden="true">
        {STANDINGS.map((s, i) => (
          <div key={s.color} className={styles.row}>
            <span className={styles.pos}>{i + 1}</span>
            <span className={styles.swatch} style={{ background: s.color }} />
            <span className={styles.gapBar} />
            <span className={styles.gap}>{s.gap}</span>
          </div>
        ))}
      </div>
      <div className={styles.sheen} />
    </div>
  );
}
