import { emailHref, links, linkText } from '../../data/links';
import { profile, statusLine } from '../../data/profile';
import { PlaceholderLink } from '../../lib/PlaceholderLink';
import styles from './Apps.module.css';

export function Contact() {
  return (
    <div className={`${styles.rise} ${styles.contact}`}>
      <h1 className={styles.contactH1}>Contact</h1>
      <p className={styles.contactP}>
        {profile.location}
        <br />
        {statusLine}
      </p>
      <PlaceholderLink href={emailHref(links.email)} className={`${styles.btn} ${styles.email}`}>
        {links.email}
      </PlaceholderLink>
      <div className={styles.socials}>
        <PlaceholderLink href={links.linkedin} className={`${styles.btn} ${styles.social}`}>
          {linkText.linkedin}
        </PlaceholderLink>
        <PlaceholderLink href={links.github} className={`${styles.btn} ${styles.social}`}>
          {linkText.github}
        </PlaceholderLink>
      </div>
    </div>
  );
}
