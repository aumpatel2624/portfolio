import styles from './PaddockNight.module.css';

const LIGHTS = ['lightOn1', 'lightOn2', 'lightOn3', 'lightOn4', 'lightOn5'];

const STREAKS = [
  { top: '34%', width: '38%', dur: '3.2s', delay: '0s' },
  { top: '42%', width: '30%', dur: '2.4s', delay: '0.8s' },
  { top: '50%', width: '44%', dur: '3.8s', delay: '1.6s' },
  { top: '58%', width: '34%', dur: '2.8s', delay: '0.4s' },
  { top: '66%', width: '40%', dur: '3.4s', delay: '2.2s' },
  { top: '74%', width: '28%', dur: '2.6s', delay: '1.2s' },
];

export function PaddockNight() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.lights}>
        {LIGHTS.map((name) => (
          <span
            key={name}
            className={styles.light}
            style={{ animation: `${name} 7s linear infinite` }}
          />
        ))}
      </div>
      {STREAKS.map((s) => (
        <div
          key={s.top}
          className={styles.streak}
          style={{
            top: s.top,
            width: s.width,
            animation: `streak ${s.dur} linear ${s.delay} infinite`,
          }}
        />
      ))}
      <div className={styles.road}>
        <div className={styles.dashes} />
      </div>
    </div>
  );
}
