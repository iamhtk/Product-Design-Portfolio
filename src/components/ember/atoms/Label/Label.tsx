import type { LabelHTMLAttributes } from 'react';
import styles from './Label.module.css';

export type LabelProps = {
  text: string;
  required?: boolean;
  hint?: boolean;
} & Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'>;

export const Label = ({
  text,
  required = false,
  hint = false,
  className,
  ...rest
}: LabelProps) => {
  const rootClass = [styles.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <label className={rootClass} {...rest}>
      {required ? (
        <span className={styles.asterisk} aria-hidden="true">
          *
        </span>
      ) : null}
      <span className={styles.text}>{text}</span>
      {hint ? (
        <span className={styles.hintIcon} role="img" aria-label="Help">
          ?
        </span>
      ) : null}
    </label>
  );
};
