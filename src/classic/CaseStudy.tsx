import { Link } from 'react-router-dom';
import { AsciiDivider } from '../ascii/AsciiDivider';
import { emailHref, links, phonedeckCaseStudy as cs } from '../data';
import { PlaceholderLink } from '../lib/PlaceholderLink';
import { usePageMeta } from '../lib/usePageMeta';
import styles from './CaseStudy.module.css';

export function CaseStudy() {
  usePageMeta({ title: 'PhoneDeck case study · Aum', description: cs.summary });
  return (
    <div id="top" className={styles.root}>
      <div className={styles.wrap}>
        <header className={styles.header}>
          <Link to="/classic" className={styles.logo}>
            aum<span className={styles.acc}>_</span>
          </Link>
          <Link to="/classic" className={styles.back}>
            ← Back to work
          </Link>
        </header>

        <main>
          <section className={styles.hero}>
            <div className={styles.kicker}>{cs.kicker}</div>
            <h1 className={styles.h1}>
              {cs.title}
              <span className={styles.acc}>.</span>
            </h1>
            <p className={styles.summary}>{cs.summary}</p>
            <dl className={styles.meta}>
              {cs.meta.map((m) => (
                <div key={m.label} className={styles.metaItem}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
              <div className={styles.metaItem}>
                <dt>Code</dt>
                <dd>
                  <PlaceholderLink href={links.phonedeckRepo} className={styles.acc}>
                    {links.phonedeckRepo} →
                  </PlaceholderLink>
                </dd>
              </div>
            </dl>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>The problem</h2>
            <p className={styles.prose}>{cs.problem}</p>
          </section>

          <section className={`${styles.section} ${styles.gap28}`}>
            <h2 className={styles.h2}>Architecture</h2>
            <ol className={styles.arch}>
              {cs.architecture.map((node, i) => (
                <li key={node.name} className={styles.archItem} style={{ flexBasis: node.basis }}>
                  {i > 0 && <span className={styles.link} aria-hidden="true" />}
                  <div className={`${styles.node} ${node.accent ? styles.nodeOn : ''}`}>
                    <span className={styles.nodeName}>{node.name}</span>
                    <span className={styles.nodeNote}>{node.note}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.note}>{cs.architectureNote}</p>
          </section>

          <section className={`${styles.section} ${styles.gap28}`}>
            <h2 className={styles.h2}>Key decisions</h2>
            <div className={styles.decisions}>
              {cs.decisions.map((d) => (
                <div key={d.title} className={styles.decision}>
                  <h3 className={styles.h3}>{d.title}</h3>
                  <p className={styles.decisionText}>{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.section} ${styles.two}`}>
            <div className={styles.col}>
              <h2 className={styles.h2}>Result</h2>
              <p className={styles.prose}>{cs.result}</p>
            </div>
            <div className={styles.col}>
              <h2 className={styles.h2}>What I'd do next</h2>
              <p className={styles.prose}>{cs.next}</p>
            </div>
          </section>

          <section className={styles.cta}>
            <h2 className={styles.h2}>{cs.talk}</h2>
            <div className={styles.ctaBtns}>
              <PlaceholderLink href={emailHref(links.email)} className={styles.email}>
                {links.email}
              </PlaceholderLink>
              <Link to="/classic" className={styles.more}>
                More work
              </Link>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <AsciiDivider pattern="·-=-·" />
        </footer>
      </div>
    </div>
  );
}
