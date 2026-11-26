import { profile } from '../data/profile';
import { aumWordmarkSmall } from './art.generated';

/** The wordmark and CV header, for anyone who opens the console. */
export function consoleEasterEgg(): void {
  if (typeof console === 'undefined') return;
  const art = aumWordmarkSmall.lines.join('\n');
  console.log(`%c${art}`, 'color:#3b82f6;font-family:monospace;font-weight:bold;');
  console.log(`%c${profile.name} · ${profile.role}`, 'color:#9ca3b0;font-family:monospace;');
}
