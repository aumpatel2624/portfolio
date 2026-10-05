import styles from './BooksArt.module.css';

/** A stack of books under a flickering lamp, with a swaying bookmark. */
export function BooksArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <div className={styles.lamp} />
      <div className={styles.stack}>
        <div className={styles.book} style={{ width: 170, height: 24, background: '#7A3A2E' }} />
        <div
          className={styles.book}
          style={{ width: 150, height: 20, marginLeft: 14, background: '#4B5E4A' }}
        />
        <div
          className={styles.book}
          style={{ width: 160, height: 22, marginLeft: 4, background: '#B5733E' }}
        />
        <div
          className={`${styles.book} ${styles.top}`}
          style={{ width: 140, height: 20, marginLeft: 20, background: '#5A3D55' }}
        >
          <span className={styles.bookmark} />
        </div>
      </div>
    </div>
  );
}
