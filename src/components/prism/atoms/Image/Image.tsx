import {
  useEffect,
  useState,
  type CSSProperties,
} from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import styles from './Image.module.css';

export type ImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  height?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  loading?: 'lazy' | 'eager';
  fallback?: string;
  aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2';
};

const roundedClassMap = {
  none: styles.roundedNone,
  sm: styles.roundedSm,
  md: styles.roundedMd,
  lg: styles.roundedLg,
  full: styles.roundedFull,
} as const;

export const Image = ({
  src,
  alt,
  caption,
  width,
  height,
  objectFit = 'cover',
  rounded = 'md',
  loading = 'lazy',
  fallback,
  aspectRatio,
}: ImageProps) => {
  const [srcUsed, setSrcUsed] = useState(src);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    setSrcUsed(src);
    setPhase('loading');
  }, [src]);

  const wrapperStyle: CSSProperties = {
    width,
    height,
    ...(aspectRatio != null ? { aspectRatio } : {}),
  };

  const handleLoad = () => {
    setPhase('ready');
  };

  const handleError = () => {
    if (fallback != null && srcUsed !== fallback) {
      setSrcUsed(fallback);
      setPhase('loading');
      return;
    }
    setPhase('error');
  };

  const roundedClass = roundedClassMap[rounded];

  return (
    <figure className={styles.figure}>
      <div className={[styles.wrapper, roundedClass].join(' ')} style={wrapperStyle}>
        {phase === 'loading' ? (
          <div className={styles.skeletonLayer} aria-hidden>
            <Skeleton variant="rectangle" animated width="100%" height="100%" />
          </div>
        ) : null}
        {phase === 'error' ? (
          <div className={styles.errorWrap}>
            <span className={styles.errorIcon} aria-hidden />
          </div>
        ) : (
          <img
            className={[
              styles.img,
              phase === 'ready' ? styles.imgVisible : styles.imgHidden,
            ].join(' ')}
            src={srcUsed}
            alt={alt}
            loading={loading}
            style={{ objectFit }}
            onLoad={handleLoad}
            onError={handleError}
            decoding="async"
          />
        )}
      </div>
      {caption != null ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
};
