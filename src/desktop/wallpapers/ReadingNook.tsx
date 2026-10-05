import styles from './ReadingNook.module.css';

const MOTES = [
  { left: '18%', bottom: '24%', dur: '14s', delay: '0s' },
  { left: '27%', bottom: '30%', dur: '17s', delay: '3s' },
  { left: '39%', bottom: '22%', dur: '15s', delay: '6s' },
  { left: '52%', bottom: '28%', dur: '18s', delay: '2s' },
  { left: '61%', bottom: '24%', dur: '13s', delay: '8s' },
  { left: '72%', bottom: '30%', dur: '16s', delay: '5s' },
  { left: '84%', bottom: '26%', dur: '19s', delay: '1s' },
];

type Spine = [width: number, height: number, color: string, rotate?: number];
const SPINES: Spine[] = [
  [26, 150, '#7A3A2E'],
  [20, 120, '#B5733E'],
  [32, 180, '#4B5E4A'],
  [22, 140, '#8C6A48'],
  [28, 165, '#5A3D55'],
  [18, 110, '#C79A5B'],
  [30, 190, '#6B3A38', 6],
  [24, 150, '#3F5560'],
  [20, 130, '#A5683A'],
  [34, 175, '#5E4A33'],
  [22, 115, '#8A4B3E'],
  [26, 160, '#4B5E4A'],
  [18, 135, '#C79A5B'],
  [30, 185, '#7A3A2E'],
  [22, 125, '#5A3D55'],
  [28, 170, '#8C6A48'],
  [20, 105, '#B5733E'],
  [32, 155, '#3F5560'],
];

export function ReadingNook() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.lamp} />
      <div className={styles.leftGlow} />
      {MOTES.map((m) => (
        <span
          key={m.left}
          className={styles.mote}
          style={{
            left: m.left,
            bottom: m.bottom,
            animation: `mote ${m.dur} linear ${m.delay} infinite`,
          }}
        />
      ))}
      <div className={styles.books}>
        {SPINES.map(([width, height, color, rotate], i) => (
          <span
            key={i}
            className={styles.book}
            style={{ width, height, background: color, rotate: `${rotate ?? 0}deg` }}
          />
        ))}
      </div>
    </div>
  );
}
