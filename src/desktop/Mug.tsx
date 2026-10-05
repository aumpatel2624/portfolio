import styles from './Mug.module.css';

const WISPS = [
  { left: 26, bottom: 70, height: 34, delay: '0s' },
  { left: 44, bottom: 74, height: 38, delay: '1s' },
  { left: 62, bottom: 70, height: 32, delay: '2s' },
];

export function Mug() {
  return (
    <div className={styles.mug} aria-hidden="true">
      {WISPS.map((w) => (
        <span
          key={w.left}
          className={styles.steam}
          style={{ left: w.left, bottom: w.bottom, height: w.height, animationDelay: w.delay }}
        />
      ))}
      <div className={styles.body} />
      <div className={styles.rim} />
      <div className={styles.handle} />
      <div className={styles.saucer} />
    </div>
  );
}
