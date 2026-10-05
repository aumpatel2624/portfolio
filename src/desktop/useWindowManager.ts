import { useCallback, useMemo, useReducer } from 'react';
import type { WindowId } from '../data/windows';

export interface WindowManagerState {
  /** Open windows in the order they were first opened (taskbar order). */
  open: WindowId[];
  min: Partial<Record<WindowId, boolean>>;
  z: Partial<Record<WindowId, number>>;
  /** Monotonic z counter. */
  zc: number;
  startOpen: boolean;
}

export const initialWindowState: WindowManagerState = {
  open: [],
  min: {},
  z: {},
  zc: 0,
  startOpen: false,
};

export type WindowAction =
  | { type: 'open'; id: WindowId }
  | { type: 'close'; id: WindowId }
  | { type: 'minimize'; id: WindowId }
  | { type: 'taskbar'; id: WindowId }
  | { type: 'toggleStart' }
  | { type: 'closeStart' };

/** Open or focus: add if missing, un-minimise, bump z, close the Start menu. */
export function openWindow(s: WindowManagerState, id: WindowId): WindowManagerState {
  const zc = s.zc + 1;
  return {
    open: s.open.includes(id) ? s.open : [...s.open, id],
    min: { ...s.min, [id]: false },
    z: { ...s.z, [id]: zc },
    zc,
    startOpen: false,
  };
}

export function closeWindow(s: WindowManagerState, id: WindowId): WindowManagerState {
  return { ...s, open: s.open.filter((x) => x !== id) };
}

export function minimizeWindow(s: WindowManagerState, id: WindowId): WindowManagerState {
  return { ...s, min: { ...s.min, [id]: true } };
}

/** The visible window with the highest z, or null. */
export function topWindow(s: WindowManagerState): WindowId | null {
  let best: WindowId | null = null;
  let bestZ = -1;
  for (const id of s.open) {
    const z = s.z[id] ?? 0;
    if (!s.min[id] && z > bestZ) {
      best = id;
      bestZ = z;
    }
  }
  return best;
}

/** Taskbar button: restore if minimised, minimise if on top, otherwise focus. */
export function taskbarClick(s: WindowManagerState, id: WindowId): WindowManagerState {
  if (s.min[id]) return openWindow(s, id);
  return topWindow(s) === id ? minimizeWindow(s, id) : openWindow(s, id);
}

export function windowReducer(s: WindowManagerState, a: WindowAction): WindowManagerState {
  switch (a.type) {
    case 'open':
      return openWindow(s, a.id);
    case 'close':
      return closeWindow(s, a.id);
    case 'minimize':
      return minimizeWindow(s, a.id);
    case 'taskbar':
      return taskbarClick(s, a.id);
    case 'toggleStart':
      return { ...s, startOpen: !s.startOpen };
    case 'closeStart':
      return s.startOpen ? { ...s, startOpen: false } : s;
  }
}

export function useWindowManager() {
  const [state, dispatch] = useReducer(windowReducer, initialWindowState);
  const open = useCallback((id: WindowId) => dispatch({ type: 'open', id }), []);
  const close = useCallback((id: WindowId) => dispatch({ type: 'close', id }), []);
  const minimize = useCallback((id: WindowId) => dispatch({ type: 'minimize', id }), []);
  const taskbar = useCallback((id: WindowId) => dispatch({ type: 'taskbar', id }), []);
  const toggleStart = useCallback(() => dispatch({ type: 'toggleStart' }), []);
  const closeStart = useCallback(() => dispatch({ type: 'closeStart' }), []);
  const top = useMemo(() => topWindow(state), [state]);
  return { state, top, open, close, minimize, taskbar, toggleStart, closeStart };
}
