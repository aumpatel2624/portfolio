import type { CSSProperties, ReactNode } from 'react';
import styles from './Wallpapers.module.css';

const FLAG_COLORS = [
  'var(--danger)',
  'var(--accent)',
  'var(--text)',
  '#5CE1FF',
  'var(--accent-2)',
  'var(--muted)',
];
const FLAG_Y = [7, 9, 11, 13, 14, 15, 16, 15, 14, 13, 11, 9, 7];
const FLAGS = FLAG_Y.map((y, i) => {
  const x = 5 + i * 30;
  return {
    points: `${x},${y} ${x + 20},${y} ${x + 10},${y + 22}`,
    fill: FLAG_COLORS[i % FLAG_COLORS.length] ?? 'var(--danger)',
  };
});

const CARS = [
  { left: '4%', color: 'var(--danger)' },
  { left: '25%', color: 'var(--accent)' },
  { left: '46%', color: '#5CE1FF' },
];

const RACE_MOTES = [
  { left: '18%', bottom: '10%', dur: '14s', delay: '0s' },
  { left: '42%', bottom: '14%', dur: '17s', delay: '3s' },
  { left: '64%', bottom: '9%', dur: '15s', delay: '6s' },
  { left: '82%', bottom: '13%', dur: '18s', delay: '2s' },
];

const STREAKS = [
  { top: '12%', width: '60%', dur: '3.2s', delay: '0s' },
  { top: '24%', width: '50%', dur: '2.4s', delay: '0.8s' },
  { top: '38%', width: '66%', dur: '3.8s', delay: '1.6s' },
  { top: '52%', width: '54%', dur: '2.8s', delay: '0.4s' },
  { top: '66%', width: '60%', dur: '3.4s', delay: '2.2s' },
  { top: '80%', width: '48%', dur: '2.6s', delay: '1.2s' },
];

const NOOK_MOTES = [
  { left: '14%', bottom: '18%', dur: '14s', delay: '0s' },
  { left: '30%', bottom: '24%', dur: '17s', delay: '3s' },
  { left: '46%', bottom: '16%', dur: '15s', delay: '6s' },
  { left: '62%', bottom: '22%', dur: '18s', delay: '2s' },
  { left: '78%', bottom: '20%', dur: '13s', delay: '8s' },
  { left: '90%', bottom: '26%', dur: '16s', delay: '5s' },
];

const SPINES: [width: number, height: number, color: string][] = [
  [20, 90, '#7A3A2E'],
  [16, 70, '#B5733E'],
  [24, 110, '#4B5E4A'],
  [18, 84, '#8C6A48'],
  [22, 100, '#5A3D55'],
  [14, 66, '#C79A5B'],
  [24, 120, '#6B3A38'],
  [18, 90, '#3F5560'],
  [16, 78, '#A5683A'],
  [26, 104, '#5E4A33'],
  [18, 72, '#8A4B3E'],
  [20, 96, '#4B5E4A'],
  [14, 82, '#C79A5B'],
  [24, 112, '#7A3A2E'],
];

function Motes({
  motes,
}: {
  motes: { left: string; bottom: string; dur: string; delay: string }[];
}) {
  return (
    <>
      {motes.map((m) => (
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
    </>
  );
}

function Car({ left, color }: { left: string; color: string }) {
  return (
    <div className={styles.car} style={{ left, '--car': color } as CSSProperties}>
      <span className={styles.carBody} />
      <span className={styles.carWing} />
      <span className={styles.carRear} />
      <span className={styles.wheelA} />
      <span className={styles.wheelB} />
    </div>
  );
}

function RaceDay() {
  return (
    <div className={`${styles.layer} ${styles.race}`}>
      <div className={styles.tvGlow} />
      <svg
        viewBox="0 0 390 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={styles.bunting}
      >
        <path
          d="M0 6 L15 7 L45 9 L75 11 L105 13 L135 14 L165 15 L195 16 L225 15 L255 14 L285 13 L315 11 L345 9 L375 7 L390 6"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        {FLAGS.map((f) => (
          <polygon key={f.points} points={f.points} fill={f.fill} />
        ))}
      </svg>
      <div className={styles.shelf}>
        {CARS.map((c) => (
          <Car key={c.left} {...c} />
        ))}
        <div className={styles.helmet}>
          <span className={styles.helmetShell} />
          <span className={styles.visor} />
        </div>
      </div>
      <Motes motes={RACE_MOTES} />
    </div>
  );
}

function PaddockNight() {
  return (
    <div className={`${styles.layer} ${styles.paddock}`}>
      <div className={styles.paddockGlow} />
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
      <div className={styles.lights}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={styles.light}
            style={{ animation: `lightOn${n} 7s linear infinite` }}
          />
        ))}
      </div>
      <div className={styles.road}>
        <div className={styles.roadDash} />
      </div>
    </div>
  );
}

function ReadingNook() {
  return (
    <div className={`${styles.layer} ${styles.nook}`}>
      <div className={styles.lamp} />
      <div className={styles.nookGlow} />
      <Motes motes={NOOK_MOTES} />
      <div className={styles.books}>
        {SPINES.map(([w, h, color], i) => (
          <span
            key={i}
            className={styles.spine}
            style={{ width: w, height: h, background: color }}
          />
        ))}
      </div>
    </div>
  );
}

/** The three wallpapers crossfade through opacity (1.1s); only the current one is "on". */
export function Wallpapers({ index }: { index: number }) {
  const layers: ReactNode[] = [
    <RaceDay key="r" />,
    <PaddockNight key="p" />,
    <ReadingNook key="n" />,
  ];
  return (
    <div className={styles.stack} aria-hidden="true">
      {layers.map((node, i) => (
        <div key={i} className={styles.fade} style={{ opacity: index === i ? 1 : 0 }}>
          {node}
        </div>
      ))}
    </div>
  );
}
