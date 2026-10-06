import { useCallback, useEffect, useRef, useState } from 'react';
import { wallpapers } from '../data/wallpapers';
import { QUOTE_FADE_MS } from '../desktop/useWallpaper';

export const TOAST_MS = 1700;

/**
 * Wallpaper cycling for the phone: the quote fades out, the wallpaper advances and the quote fades
 * back in with a short "Wallpaper: name" toast. The wallpaper layers crossfade through opacity.
 */
export function usePhoneWallpaper(count: number = wallpapers.length) {
  const [index, setIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [toast, setToast] = useState(false);
  const fade = useRef<ReturnType<typeof setTimeout>>(undefined);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cycle = useCallback(() => {
    clearTimeout(fade.current);
    clearTimeout(toastTimer.current);
    setQuoteVisible(false);
    fade.current = setTimeout(() => {
      setIndex((i) => (i + 1) % count);
      setQuoteVisible(true);
      setToast(true);
      toastTimer.current = setTimeout(() => setToast(false), TOAST_MS);
    }, QUOTE_FADE_MS);
  }, [count]);

  useEffect(
    () => () => {
      clearTimeout(fade.current);
      clearTimeout(toastTimer.current);
    },
    [],
  );

  return { index, quoteVisible, toast, cycle };
}
