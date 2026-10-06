import { describe, expect, it } from 'vitest';
import { profile } from '../data/profile';
import { skills } from '../data/skills';
import { skillIcons } from './skillIcons';

describe('skillIcons', () => {
  const names = new Set([
    ...skills.flatMap((g) => [...g.desktop, ...g.classic]),
    ...profile.build.tools,
  ]);

  it('maps only skills that exist', () => {
    for (const name of Object.keys(skillIcons)) expect(names.has(name)).toBe(true);
  });

  it('resolves every mapped icon to a drawable path', () => {
    for (const [name, icon] of Object.entries(skillIcons)) {
      expect(icon, name).toBeDefined();
      expect(icon.path.length, name).toBeGreaterThan(20);
    }
  });
});
