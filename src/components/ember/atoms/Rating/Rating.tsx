import { useCallback, useState } from 'react';
import styles from './Rating.module.css';

export type RatingProps = {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
};

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

export const Rating = ({
  value: valueProp = 0,
  max = 5,
  onChange,
  readonly = false,
  size = 'md',
  showValue = false,
  className,
}: RatingProps) => {
  const [internalValue, setInternalValue] = useState(valueProp);
  const [hover, setHover] = useState<number | null>(null);

  const isControlled = onChange !== undefined;
  const rawValue = isControlled ? valueProp : internalValue;
  const displayRounded = Math.min(
    max,
    Math.max(0, Math.round(Number(rawValue))),
  );

  const filledCount =
    !readonly && hover !== null ? hover : displayRounded;

  const setValue = useCallback(
    (next: number) => {
      const clamped = Math.min(max, Math.max(0, next));
      if (!isControlled) {
        setInternalValue(clamped);
      }
      onChange?.(clamped);
    },
    [isControlled, max, onChange],
  );

  const rootClass = [styles.root, sizeClassMap[size], className ?? '']
    .filter(Boolean)
    .join(' ');

  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div
      className={rootClass}
      role="group"
      aria-label={
        readonly
          ? `Rating: ${displayRounded} out of ${max} stars`
          : 'Star rating'
      }
      onMouseLeave={readonly ? undefined : () => setHover(null)}
    >
      <ul className={styles.stars}>
        {stars.map((i) => {
          const filled = i <= filledCount;
          const isHoverPreview =
            !readonly && hover !== null && i <= hover;
          const starClass = [
            styles.star,
            filled
              ? isHoverPreview
                ? styles.filledHover
                : styles.filled
              : styles.empty,
          ].join(' ');

          const char = filled ? '★' : '☆';

          if (readonly) {
            return (
              <li key={i}>
                <span className={starClass} aria-hidden>
                  {char}
                </span>
              </li>
            );
          }

          return (
            <li key={i}>
              <button
                type="button"
                className={styles.starBtn}
                aria-label={`Rate ${i} out of ${max}`}
                aria-pressed={i <= displayRounded}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => setValue(i)}
              >
                <span className={starClass} aria-hidden>
                  {char}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {showValue ? (
        <span className={styles.valueLabel}>
          {Number(rawValue).toFixed(1)} / {max}
        </span>
      ) : null}
    </div>
  );
};
