import { act, renderHook } from '@testing-library/react';
import { QUOTE_FADE_MS, useWallpaper } from './useWallpaper';

describe('wallpaper cycling', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('fades the quote out, switches, then fades it back in', () => {
    const { result } = renderHook(() => useWallpaper(3));
    expect(result.current.index).toBe(0);
    act(() => result.current.cycle());
    expect(result.current.quoteVisible).toBe(false);
    expect(result.current.index).toBe(0);
    act(() => void vi.advanceTimersByTime(QUOTE_FADE_MS));
    expect(result.current.index).toBe(1);
    expect(result.current.quoteVisible).toBe(true);
  });

  it('wraps around after the last wallpaper', () => {
    const { result } = renderHook(() => useWallpaper(3));
    for (let i = 0; i < 3; i += 1) {
      act(() => result.current.cycle());
      act(() => void vi.advanceTimersByTime(QUOTE_FADE_MS));
    }
    expect(result.current.index).toBe(0);
  });

  it('a rapid second click restarts the fade instead of skipping twice', () => {
    const { result } = renderHook(() => useWallpaper(3));
    act(() => result.current.cycle());
    act(() => void vi.advanceTimersByTime(QUOTE_FADE_MS - 100));
    act(() => result.current.cycle());
    act(() => void vi.advanceTimersByTime(QUOTE_FADE_MS));
    expect(result.current.index).toBe(1);
  });
});
