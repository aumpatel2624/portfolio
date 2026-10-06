export type SetupKey = 'laptop' | 'server' | 'pi' | 'phone' | 'ai' | 'stack';

export interface SetupItem {
  /** Shown as a chip. Also the key into the skill-icon map when a brand icon exists. */
  name: string;
  /** Not built yet. Rendered with a "planned" tag. */
  planned?: boolean;
}

export interface SetupSection {
  key: SetupKey;
  title: string;
  summary: string;
  /** Label and value rows, for hardware that is worth listing. */
  specs?: { label: string; value: string }[];
  /** Name of the chip row, e.g. "Runs on it". */
  itemsLabel?: string;
  items: SetupItem[];
}

/**
 * The tools and machines I use day to day. The site is public, so no hostnames, driver versions,
 * remote-access details or network identifiers appear here.
 */
export const setup: SetupSection[] = [
  {
    key: 'laptop',
    title: 'Daily laptop',
    summary: 'Lenovo LOQ. I develop on Windows and Linux, with Ubuntu on WSL.',
    items: [{ name: 'Lenovo LOQ' }, { name: 'Windows' }, { name: 'Linux' }, { name: 'Ubuntu WSL' }],
  },
  {
    key: 'server',
    title: 'Homelab server',
    summary:
      'An ASUS ROG Strix G513RM running Ubuntu Server around the clock as my home lab and development server. It is reachable remotely over a private network.',
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 7 6800H, 8 cores / 16 threads' },
      { label: 'Memory', value: '16 GB DDR5-4800 (2 × 8 GB)' },
      { label: 'Storage', value: '512 GB NVMe SSD' },
      { label: 'GPU', value: 'NVIDIA RTX 3050 Mobile (4 GB) and AMD Radeon 680M integrated' },
      { label: 'Network', value: '2.5 GbE, Wi-Fi 6E and Bluetooth' },
    ],
    itemsLabel: 'Runs on it',
    items: [
      { name: 'Ubuntu Server' },
      { name: 'Docker' },
      { name: 'KVM/QEMU' },
      { name: 'LXC-style virtualization' },
      { name: 'Codex CLI' },
      { name: 'Antigravity CLI' },
      { name: 'nvm / Node.js' },
    ],
  },
  {
    key: 'pi',
    title: 'Raspberry Pi helper',
    summary: 'A Raspberry Pi 2 used as a network helper, wired to the server over Ethernet.',
    itemsLabel: 'Next',
    items: [
      { name: 'Raspberry Pi 2' },
      { name: 'Wake-on-LAN', planned: true },
      { name: 'API endpoint to wake the server', planned: true },
    ],
  },
  {
    key: 'phone',
    title: 'Phone',
    summary: 'An iPhone 12, now an older phone that I use for homelab experiments.',
    items: [{ name: 'iPhone 12' }],
  },
  {
    key: 'ai',
    title: 'AI tools',
    summary: 'What I use for coding and everyday questions.',
    items: [
      { name: 'ChatGPT Plus' },
      { name: 'Claude Pro' },
      { name: 'Claude Code' },
      { name: 'Gemini Pro' },
      { name: 'Antigravity CLI' },
      { name: 'Herdr' },
      { name: 'Jev (TypeSafe)' },
    ],
  },
  {
    key: 'stack',
    title: 'Preferred stack',
    summary: 'What I reach for first on a new project.',
    items: [
      { name: 'Bun' },
      { name: 'Hono' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'GitHub CLI' },
    ],
  },
];
