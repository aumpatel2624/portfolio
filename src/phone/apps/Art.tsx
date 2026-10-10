import { ArtImage } from '../../desktop/illustrations/ArtImage';
import styles from './Art.module.css';

/** Photographic illustration panels for the project and hobby screens. */

function Panel({ name, alt, className = '' }: { name: string; alt: string; className?: string }) {
  return (
    <div className={`${styles.art} ${className}`}>
      <ArtImage name={name} alt={alt} />
    </div>
  );
}

export const PhoneDeckArt = () => (
  <Panel name="phone-deck" alt="A phone paired with a laptop over an encrypted channel" />
);
export const RecruitArt = () => (
  <Panel name="recruiting" alt="A resume being parsed into structured candidate data" />
);
export const WhatsAppArt = () => (
  <Panel name="whatsapp" alt="A WhatsApp order message turned into a matched order" />
);
export const MoreArt = () => (
  <Panel
    name="more"
    alt="Laptop showing internal business tools and dashboards"
    className={styles.more}
  />
);
export const F1Art = () => <Panel name="f1" alt="A Formula 1 car on track" />;
export const IotArt = () => (
  <Panel name="iot" alt="An IoT development board with sensors and wiring" />
);
export const BooksArt = () => (
  <Panel name="books" alt="A stack of books under a warm reading lamp" />
);
