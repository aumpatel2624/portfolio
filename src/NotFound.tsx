import { Link } from 'react-router-dom';
import { notFound } from './ascii/art.generated';
import { AsciiWordmark } from './ascii/AsciiWordmark';
import { usePageMeta } from './lib/usePageMeta';
import styles from './NotFound.module.css';

export function NotFound() {
  usePageMeta({ title: 'Page not found · Aum' });
  return (
    <main className={styles.page}>
      <AsciiWordmark mark={notFound} label="404" className={styles.art} />
      <h1 className={styles.title}>This page is not here.</h1>
      <p className={styles.body}>The link may be old, or the address mistyped.</p>
      <div className={styles.links}>
        <Link className={styles.primary} to="/">
          Open the desktop
        </Link>
        <Link className={styles.secondary} to="/classic">
          Classic site
        </Link>
      </div>
      <pre className={styles.shrug} aria-hidden="true">
        {'¯\\_(ツ)_/¯'}
      </pre>
    </main>
  );
}
