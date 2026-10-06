import { act, renderHook } from '@testing-library/react';
import { QUOTE_FADE_MS } from '../desktop/useWallpaper';
import { TOAST_MS, usePhoneWallpaper } from './usePhoneWallpaper';

describe('phone wallpaper cycling', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('fades the quote, advances the wallpaper, then shows and hides the toast', () => {
    const { result } = renderHook(() => usePhoneWallpaper(3));
    expect(result.current).toMatchObject({ index: 0, quoteVisible: true, toast: false });
    act(() => result.current.cycle());
    expect(result.current).toMatchObject({ index: 0, quoteVisible: false, toast: false });
    act(() => void vi.advanceTimersByTime(QUOTE_FADE_MS));
    expect(result.current).toMatchObject({ index: 1, quoteVisible: true, toast: true });
    act(() => void vi.advanceTimersByTime(TOAST_MS));
    expect(result.current.toast).toBe(false);
  });

  it('wraps around after the last wallpaper', () => {
    const { result } = renderHook(() => usePhoneWallpaper(3));
    for (let i = 0; i < 3; i += 1) {
      act(() => result.current.cycle());
      act(() => void vi.advanceTimersByTime(QUOTE_FADE_MS));
    }
    expect(result.current.index).toBe(0);
  });

  it('a rapid second tap restarts the fade instead of skipping twice', () => {
    const { result } = renderHook(() => usePhoneWallpaper(3));
    act(() => result.current.cycle());
    act(() => void vi.advanceTimersByTime(QUOTE_FADE_MS - 100));
    act(() => result.current.cycle());
    act(() => void vi.advanceTimersByTime(QUOTE_FADE_MS));
    expect(result.current.index).toBe(1);
  });
});
