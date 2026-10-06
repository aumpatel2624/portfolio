import { skillIcons } from './skillIcons';
import styles from './SkillIcon.module.css';

/** Brand logo for a skill, or nothing when there is no matching icon. The skill name is the label. */
export function SkillIcon({ name }: { name: string }) {
  const icon = skillIcons[name];
  if (!icon) return null;
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
