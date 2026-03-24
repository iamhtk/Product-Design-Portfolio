import type { ReactNode } from 'react';
import styles from './Text.module.css';

export type TextProps = {
  variant?:
    | 'body-xl'
    | 'body-lg'
    | 'body-md'
    | 'body-sm'
    | 'body-xs'
    | 'caption'
    | 'label';
  children: ReactNode;
  color?:
    | 'default'
    | 'caption'
    | 'placeholder'
    | 'primary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'disabled';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  as?: 'p' | 'span' | 'div' | 'label';
  className?: string;
  id?: string;
  htmlFor?: string;
};

const variantClassMap = {
  'body-xl': styles.variantBodyXl,
  'body-lg': styles.variantBodyLg,
  'body-md': styles.variantBodyMd,
  'body-sm': styles.variantBodySm,
  'body-xs': styles.variantBodyXs,
  caption: styles.variantCaption,
  label: styles.variantLabel,
} as const;

const colorClassMap = {
  default: styles.colorDefault,
  caption: styles.colorCaption,
  placeholder: styles.colorPlaceholder,
  primary: styles.colorPrimary,
  success: styles.colorSuccess,
  error: styles.colorError,
  warning: styles.colorWarning,
  info: styles.colorInfo,
  disabled: styles.colorDisabled,
} as const;

const weightClassMap = {
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
} as const;

const alignClassMap = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
} as const;

export const Text = ({
  variant = 'body-md',
  children,
  color = 'default',
  weight: weightProp,
  align = 'left',
  truncate = false,
  as: Component = 'p',
  className,
  id,
  htmlFor,
}: TextProps) => {
  const resolvedWeight =
    weightProp ?? (variant === 'label' ? 'medium' : 'regular');
  const resolvedColor = variant === 'caption' && color === 'default' ? 'caption' : color;
  const colorClass = colorClassMap[resolvedColor];

  const rootClass = [
    styles.root,
    variantClassMap[variant],
    colorClass,
    weightClassMap[resolvedWeight],
    alignClassMap[align],
    truncate ? styles.truncate : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={rootClass} id={id} htmlFor={htmlFor}>
      {children}
    </Component>
  );
};
