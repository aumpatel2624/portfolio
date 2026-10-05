import { AsciiDivider } from '../../ascii/AsciiDivider';
import { emailHref, links } from '../../data/links';
import { profile } from '../../data/profile';
import { PlaceholderLink } from '../../lib/PlaceholderLink';
import common from '../common.module.css';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <div className={styles.body}>
      <h2 className={`${common.rise} ${styles.h2}`} style={{ animationDelay: '0.05s' }}>
        {profile.contact.heading}
      </h2>
      <p className={`${common.rise} ${common.lede}`} style={{ animationDelay: '0.12s' }}>
        {profile.contact.body}
      </p>
      <AsciiDivider pattern="·-=-·" className={styles.rule} />
      <div className={`${common.rise} ${styles.actions}`} style={{ animationDelay: '0.2s' }}>
        <PlaceholderLink
          href={emailHref(links.email)}
          className={`${common.btn} ${common.glow} ${styles.primary}`}
        >
          {links.email}
        </PlaceholderLink>
        <PlaceholderLink href={links.linkedin} className={`${common.btn} ${styles.secondary}`}>
          LinkedIn
        </PlaceholderLink>
        <PlaceholderLink href={links.github} className={`${common.btn} ${styles.secondary}`}>
          GitHub
        </PlaceholderLink>
      </div>
    </div>
  );
}
