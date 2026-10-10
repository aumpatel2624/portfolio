import styles from './ArtImage.module.css';

interface Props {
  name: string;
  alt: string;
}

/** A photographic illustration that fills its framed panel. */
export function ArtImage({ name, alt }: Props) {
  return (
    <img
      className={styles.img}
      src={`/images/${name}.webp`}
      alt={alt}
      width={1200}
      height={800}
      loading="lazy"
      decoding="async"
    />
  );
}
