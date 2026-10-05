import {
  closeWindow,
  initialWindowState,
  minimizeWindow,
  openWindow,
  taskbarClick,
  topWindow,
  windowReducer,
} from './useWindowManager';

const open = (...ids: Parameters<typeof openWindow>[1][]) =>
  ids.reduce(openWindow, initialWindowState);

describe('window manager', () => {
  it('opens a window, bumps z and closes the start menu', () => {
    const s = openWindow({ ...initialWindowState, startOpen: true }, 'about');
    expect(s.open).toEqual(['about']);
    expect(s.z.about).toBe(1);
    expect(s.min.about).toBe(false);
    expect(s.startOpen).toBe(false);
  });

  it('does not duplicate an open window and focuses it on top', () => {
    const s = openWindow(open('about', 'projects'), 'about');
    expect(s.open).toEqual(['about', 'projects']);
    expect(topWindow(s)).toBe('about');
    expect(s.z.about).toBeGreaterThan(s.z.projects ?? 0);
  });

  it('opening a minimised window restores it', () => {
    const s = openWindow(minimizeWindow(open('about'), 'about'), 'about');
    expect(s.min.about).toBe(false);
    expect(topWindow(s)).toBe('about');
  });

  it('minimise hides a window from top and keeps it open', () => {
    const s = minimizeWindow(open('about', 'projects'), 'projects');
    expect(s.open).toEqual(['about', 'projects']);
    expect(topWindow(s)).toBe('about');
  });

  it('close removes the window and top falls back to the next one', () => {
    const s = closeWindow(open('about', 'projects'), 'projects');
    expect(s.open).toEqual(['about']);
    expect(topWindow(s)).toBe('about');
    expect(topWindow(closeWindow(s, 'about'))).toBeNull();
  });

  describe('taskbar toggle', () => {
    it('restores a minimised window', () => {
      const s = taskbarClick(minimizeWindow(open('about'), 'about'), 'about');
      expect(s.min.about).toBe(false);
      expect(topWindow(s)).toBe('about');
    });

    it('minimises the window that is on top', () => {
      const s = taskbarClick(open('about', 'projects'), 'projects');
      expect(s.min.projects).toBe(true);
      expect(topWindow(s)).toBe('about');
    });

    it('focuses a window that is open but not on top', () => {
      const s = taskbarClick(open('about', 'projects'), 'about');
      expect(s.min.about).toBe(false);
      expect(topWindow(s)).toBe('about');
    });
  });

  it('reducer toggles and closes the start menu', () => {
    const opened = windowReducer(initialWindowState, { type: 'toggleStart' });
    expect(opened.startOpen).toBe(true);
    expect(windowReducer(opened, { type: 'closeStart' }).startOpen).toBe(false);
    expect(windowReducer(initialWindowState, { type: 'closeStart' })).toBe(initialWindowState);
  });
});
