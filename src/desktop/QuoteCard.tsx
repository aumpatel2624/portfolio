import styles from './QuoteCard.module.css';

interface Props {
  quote: string;
  by: string;
  visible: boolean;
}

export function QuoteCard({ quote, by, visible }: Props) {
  return (
    <figure className={styles.card} style={{ opacity: visible ? 1 : 0 }}>
      <blockquote className={styles.quote}>“{quote}”</blockquote>
      <figcaption className={styles.by}>{by}</figcaption>
    </figure>
  );
}
