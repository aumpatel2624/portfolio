import { useCallback, useEffect, useRef, useState } from 'react';
import { wallpapers } from '../data/wallpapers';

export const QUOTE_FADE_MS = 350;

/**
 * Wallpaper cycling: the quote fades out, the wallpaper index advances, the quote fades back in.
 * The three wallpaper layers crossfade on their own through opacity (see Desktop.module.css).
 */
export function useWallpaper(count: number = wallpapers.length) {
  const [index, setIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cycle = useCallback(() => {
    clearTimeout(timer.current);
    setQuoteVisible(false);
    timer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % count);
      setQuoteVisible(true);
    }, QUOTE_FADE_MS);
  }, [count]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { index, quoteVisible, cycle };
}
