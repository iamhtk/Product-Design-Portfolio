import type { CSSProperties } from 'react';
import styles from './Skeleton.module.css';

export type SkeletonProps = {
  width?: string;
  height?: string;
  variant?: 'text' | 'circle' | 'rectangle' | 'card';
  lines?: number;
  animated?: boolean;
};

const variantClassMap = {
  text: styles.text,
  circle: styles.circle,
  rectangle: styles.rectangle,
  card: styles.card,
} as const;

export const Skeleton = ({
  width,
  height,
  variant = 'text',
  lines = 1,
  animated = true,
}: SkeletonProps) => {
  const blockClass = [
    styles.base,
    variantClassMap[variant],
    animated ? styles.animated : '',
  ]
    .filter(Boolean)
    .join(' ');

  const style: CSSProperties = {};
  if (width != null) style.width = width;
  if (height != null) style.height = height;

  if (variant === 'text' && lines > 1) {
    return (
      <div className={styles.lines}>
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className={[
              blockClass,
              i === lines - 1 ? styles.lastLine : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={i === lines - 1 ? { ...style } : style}
          />
        ))}
      </div>
    );
  }

  return <span className={blockClass} style={style} />;
};
