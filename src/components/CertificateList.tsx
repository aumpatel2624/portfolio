import { certificateImageSize, certificates } from '../data/certificates';
import styles from './CertificateList.module.css';

/** The course completion badges. Each view supplies its own section heading. */
export function CertificateList() {
  return (
    <ul className={styles.list}>
      {certificates.map((c) => (
        <li key={c.verifyUrl} className={styles.item}>
          <img
            className={styles.badge}
            src={c.image}
            alt={c.alt}
            width={certificateImageSize.width}
            height={certificateImageSize.height}
            loading="lazy"
            decoding="async"
          />
          <h3 className={styles.title}>{c.title}</h3>
          <p>{c.kind}</p>
          <p>{c.issuer}</p>
          <p>
            Issued <time dateTime={c.issuedIso}>{c.issued}</time>
          </p>
          <p>
            Verify:{' '}
            <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {c.verifyUrl.replace('https://', '')}
            </a>
          </p>
          <a
            href={c.pdf}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${c.title} badge (PDF) in a new tab`}
            className={styles.open}
          >
            Open PDF
          </a>
        </li>
      ))}
    </ul>
  );
}
