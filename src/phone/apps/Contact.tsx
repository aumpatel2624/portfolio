import { emailHref, links } from '../../data/links';
import { phoneCopy } from '../../data/phone';
import { profile } from '../../data/profile';
import { PlaceholderLink } from '../../lib/PlaceholderLink';
import styles from './Apps.module.css';

export function Contact() {
  return (
    <div className={`${styles.rise} ${styles.contact}`}>
      <div className={styles.eyebrow}>{phoneCopy.contactEyebrow}</div>
      <h1 className={styles.contactH1}>{profile.contact.heading}</h1>
      <p className={styles.contactP}>{profile.contact.body}</p>
      <PlaceholderLink href={emailHref(links.email)} className={`${styles.btn} ${styles.email}`}>
        {links.email}
      </PlaceholderLink>
      <div className={styles.socials}>
        <PlaceholderLink href={links.linkedin} className={`${styles.btn} ${styles.social}`}>
          LinkedIn
        </PlaceholderLink>
        <PlaceholderLink href={links.github} className={`${styles.btn} ${styles.social}`}>
          GitHub
        </PlaceholderLink>
      </div>
    </div>
  );
}
