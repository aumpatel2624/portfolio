import { ArtImage } from '../../desktop/illustrations/ArtImage';
import { AiArt as DesktopAiArt } from '../../desktop/illustrations/AiArt';
import type { ProjectArtName } from '../../data/projects';
import styles from './Art.module.css';

/** The illustration panel above a project screen. */
export function ProjectArt({ name }: { name: ProjectArtName }) {
  if (name === 'ai') return <DesktopAiArt className={styles.art} />;
  return (
    <div className={`${styles.art} ${name === 'more' ? styles.more : ''}`}>
      <ArtImage name={name} />
    </div>
  );
}
