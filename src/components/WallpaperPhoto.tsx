import styles from './WallpaperPhoto.module.css';

interface Props {
  variant: 'desktop' | 'phone';
}

/** The ink-wash blossom wallpaper. Decorative, so hidden from assistive tech. */
export function WallpaperPhoto({ variant }: Props) {
  return variant === 'desktop' ? (
    <img
      className={`${styles.photo} ${styles.desktop}`}
      src="/images/wallpaper-desktop.webp"
      alt=""
      width={1920}
      height={1081}
      decoding="async"
      draggable={false}
    />
  ) : (
    <img
      className={`${styles.photo} ${styles.phone}`}
      src="/images/wallpaper-phone.webp"
      srcSet="/images/wallpaper-phone-sm.webp 780w, /images/wallpaper-phone.webp 1170w"
      sizes="(max-width: 430px) 100vw, 430px"
      alt=""
      width={1170}
      height={2078}
      decoding="async"
      draggable={false}
    />
  );
}
