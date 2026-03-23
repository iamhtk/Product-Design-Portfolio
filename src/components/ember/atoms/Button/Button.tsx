import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonProps = {
  label?: string;
  type?: 'default' | 'outlined' | 'transparent';
  status?: 'default' | 'hover' | 'pressed' | 'focus' | 'disabled';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
  colorScheme?: 'primary' | 'success' | 'information';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

const typeClassMap = {
  default: styles.typeDefault,
  outlined: styles.typeOutlined,
  transparent: styles.typeTransparent,
} as const;

export const Button = ({
  label,
  type: buttonType = 'default',
  status = 'default',
  iconLeft,
  iconRight,
  onClick,
  colorScheme = 'primary',
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled === true || status === 'disabled';
  const interactive = status === 'default';
  const forceHover = status === 'hover';
  const forcePressed = status === 'pressed';
  const forceFocus = status === 'focus';

  const schemeClass =
    colorScheme === 'success'
      ? styles.schemeSuccess
      : colorScheme === 'information'
        ? styles.schemeInformation
        : undefined;

  const rootClass = [
    styles.root,
    typeClassMap[buttonType],
    schemeClass,
    interactive ? styles.interactive : '',
    forceHover ? styles.forceHover : '',
    forcePressed ? styles.forcePressed : '',
    forceFocus ? styles.forceFocus : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={rootClass}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      {...rest}
    >
      {iconLeft != null ? <span className={styles.iconSlot}>{iconLeft}</span> : null}
      {label != null ? <span className={styles.label}>{label}</span> : null}
      {iconRight != null ? <span className={styles.iconSlot}>{iconRight}</span> : null}
    </button>
  );
};
