import { ArtImage } from './ArtImage';
import styles from './BooksArt.module.css';

/** A stack of books under a warm reading lamp */
export function BooksArt() {
  return (
    <div className={styles.art}>
      <ArtImage name="books" alt="A stack of books under a warm reading lamp" />
    </div>
  );
}
