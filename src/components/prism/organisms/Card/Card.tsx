import type { ReactNode } from 'react';
import styles from './Card.module.css';

export type CardProps = {
  title?: string;
  titleColor?: 'primary' | 'information';
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
  footer?: ReactNode;
  variant?: 'default' | 'highlighted';
  width?: string;
};

export const Card = ({
  title,
  titleColor = 'primary',
  imageSrc,
  imageAlt,
  children,
  footer,
  variant = 'default',
  width,
}: CardProps) => {
  const rootClass = [
    styles.root,
    variant === 'highlighted' ? styles.highlighted : '',
  ]
    .filter(Boolean)
    .join(' ');

  const titleClass = [
    styles.title,
    titleColor === 'information' ? styles.titleInformation : styles.titlePrimary,
  ].join(' ');

  return (
    <div
      className={rootClass}
      style={width !== undefined ? { width } : undefined}
    >
      <div className={styles.inner}>
        {title != null ? <h2 className={titleClass}>{title}</h2> : null}
        {imageSrc != null ? (
          <img
            className={styles.image}
            src={imageSrc}
            alt={imageAlt ?? ''}
          />
        ) : null}
        {children != null ? <div className={styles.content}>{children}</div> : null}
        {footer != null ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>
  );
};
