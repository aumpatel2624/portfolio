import styles from './RaceDay.module.css';

const TRACK =
  'M60 190 C 40 140 60 90 120 70 S 220 60 260 40 S 360 30 370 90 S 330 150 290 160 S 250 220 190 225 S 80 235 60 190 Z';

const BUNTING_PATH =
  'M0 8 L40 10 L116 14 L192 18 L268 22 L344 25 L420 28 L496 30 L572 32 L648 33 L724 33 L800 33 L876 32 L952 30 L1028 28 L1104 25 L1180 21 L1256 18 L1332 14 L1408 9 L1440 8';
const FLAG_Y = [10, 14, 18, 22, 25, 28, 30, 32, 33, 33, 33, 32, 30, 28, 25, 21, 18, 14, 9];
const FLAG_COLORS = ['#E5604D', '#FFB020', '#F6ECDC', '#5CE1FF', '#FF8A5C', '#F4D58D'];
const FLAGS = FLAG_Y.map((y, i) => {
  const x = 40 + i * 76;
  return {
    points: `${x - 15},${y} ${x + 15},${y} ${x},${y + 34}`,
    fill: FLAG_COLORS[i % FLAG_COLORS.length] ?? '#E5604D',
  };
});

const CARS = [
  { fill: '#E5604D', dur: '8.2s', begin: '-0.5s' },
  { fill: '#FFB020', dur: '8.4s', begin: '-1.4s' },
  { fill: '#5CE1FF', dur: '8.6s', begin: '-2.6s' },
  { fill: '#F6ECDC', dur: '8.8s', begin: '-3.7s' },
  { fill: '#9B8CFF', dur: '9.0s', begin: '-4.9s' },
];

const STANDINGS = [
  { color: '#E5604D', gap: 'LEAD' },
  { color: '#FFB020', gap: '+1.8' },
  { color: '#5CE1FF', gap: '+3.4' },
  { color: '#F6ECDC', gap: '+5.1' },
  { color: '#9B8CFF', gap: '+6.9' },
  { color: '#4ADE80', gap: '+9.2' },
  { color: '#FF8A5C', gap: '+11.0' },
  { color: '#F4D58D', gap: '+13.4' },
  { color: '#7DD3FC', gap: '+15.1' },
  { color: '#C084FC', gap: '+18.6' },
];

const TOY_CARS = [
  { left: '6%', color: '#E5604D' },
  { left: '17%', color: '#FFB020' },
  { left: '28%', color: '#5CE1FF' },
];

const TICKER =
  'GRAND PRIX · LIVE · RACE DAY · LIGHTS OUT · GRAND PRIX · LIVE · RACE DAY · LIGHTS OUT ·';

export function RaceDay({ lap }: { lap: number }) {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.tvGlow} />
      <svg
        className={styles.bunting}
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={BUNTING_PATH} fill="none" stroke="#54413A" strokeWidth="2" />
        {FLAGS.map((f) => (
          <polygon key={f.points} points={f.points} fill={f.fill} />
        ))}
      </svg>
      <div className={styles.floorGlow} />
      <div className={styles.checker} />
      <div className={styles.tv}>
        <div className={styles.screen}>
          <div className={styles.header}>
            <span>LAP {lap} / 57</span>
            <span className={styles.live}>
              <span className={styles.liveDot} />
              LIVE
            </span>
          </div>
          <svg className={styles.track} viewBox="0 0 400 260" aria-hidden="true">
            <path d={TRACK} fill="none" stroke="#263041" strokeWidth="14" strokeLinejoin="round" />
            <path d={TRACK} fill="none" stroke="#4A5568" strokeWidth="1.5" strokeDasharray="4 6" />
            <line x1="52" y1="178" x2="72" y2="184" stroke="#F6ECDC" strokeWidth="3" />
            {CARS.map((c) => (
              <circle key={c.fill} r="6" fill={c.fill}>
                <animateMotion dur={c.dur} begin={c.begin} repeatCount="indefinite" path={TRACK} />
              </circle>
            ))}
          </svg>
          <div className={styles.standings}>
            {STANDINGS.map((s, i) => (
              <div key={s.color} className={styles.row}>
                <span className={styles.pos}>{i + 1}</span>
                <span className={styles.bar} style={{ background: s.color }} />
                <span className={styles.line} />
                <span className={styles.gap}>{s.gap}</span>
              </div>
            ))}
          </div>
          <div className={styles.ticker}>
            <div className={styles.tickerTrack}>
              <span>{TICKER}</span>
              <span>{TICKER}</span>
            </div>
          </div>
          <div className={styles.sheen} />
        </div>
        <div className={styles.leg} />
        <div className={styles.shelf}>
          {TOY_CARS.map((c) => (
            <div key={c.left} className={styles.car} style={{ left: c.left }}>
              <span className={styles.body} style={{ background: c.color }} />
              <span className={styles.wing} style={{ borderTopColor: c.color }} />
              <span className={styles.nose} style={{ background: c.color }} />
              <span className={styles.wheel} style={{ left: 10 }} />
              <span className={styles.wheel} style={{ left: 38 }} />
            </div>
          ))}
          <div className={styles.helmet}>
            <span className={styles.helmetShell} />
            <span className={styles.visor} />
          </div>
        </div>
      </div>
    </div>
  );
}
