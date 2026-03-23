import type { ReactNode } from 'react';
import styles from './Heading.module.css';

export type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | 'default' | 'info' | 'success';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  className?: string;
};

const levelClassMap = {
  1: styles.level1,
  2: styles.level2,
  3: styles.level3,
  4: styles.level4,
  5: styles.level5,
  6: styles.level6,
} as const;

const colorClassMap = {
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  tertiary: styles.colorTertiary,
  default: styles.colorDefault,
  info: styles.colorInfo,
  success: styles.colorSuccess,
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

const tagMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

export const Heading = ({
  level = 2,
  children,
  color = 'default',
  weight = 'bold',
  align = 'left',
  className,
}: HeadingProps) => {
  const Tag = tagMap[level];
  const rootClass = [
    styles.heading,
    levelClassMap[level],
    colorClassMap[color],
    weightClassMap[weight],
    alignClassMap[align],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={rootClass}>{children}</Tag>;
};
