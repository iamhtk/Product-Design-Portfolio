import styles from './Avatar.module.css';

export type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'presenter';
  variant?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away';
  className?: string;
};

const sizeClassMap = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
  presenter: styles.sizePresenter,
} as const;

const initialsHueClasses = [
  styles.initialsHue0,
  styles.initialsHue1,
  styles.initialsHue2,
  styles.initialsHue3,
] as const;

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) {
    h = (h + name.charCodeAt(i) * (i + 1)) % 100007;
  }
  return Math.abs(h) % initialsHueClasses.length;
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

export const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  variant = 'circle',
  status,
  className,
}: AvatarProps) => {
  const shapeClass = variant === 'circle' ? styles.circle : styles.square;
  const rootClass = [
    styles.root,
    shapeClass,
    sizeClassMap[size],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const initialsSizeClass =
    size === 'xs' || size === 'presenter'
      ? styles.initialsXs
      : size === 'sm'
        ? styles.initialsSm
        : size === 'md'
          ? styles.initialsMd
          : size === 'lg'
            ? styles.initialsLg
            : styles.initialsXl;

  const initials = name != null ? getInitials(name) : '';
  const hueClass =
    name != null && initials.length > 0
      ? initialsHueClasses[hashName(name)]
      : '';

  const initialsClass = [
    styles.initials,
    initialsSizeClass,
    hueClass,
  ]
    .filter(Boolean)
    .join(' ');

  const statusClass =
    status === 'online'
      ? styles.statusOnline
      : status === 'offline'
        ? styles.statusOffline
        : status === 'away'
          ? styles.statusAway
          : '';

  const statusDot =
    status != null ? (
      <span
        className={[styles.status, statusClass].filter(Boolean).join(' ')}
        aria-hidden="true"
      />
    ) : null;

  if (src != null && src.length > 0) {
    return (
      <span className={rootClass}>
        <span className={styles.inner}>
          <img className={styles.image} src={src} alt={alt ?? name ?? ''} />
        </span>
        {statusDot}
      </span>
    );
  }

  if (initials.length > 0) {
    return (
      <span className={rootClass} aria-label={name} role="img">
        <span className={styles.inner}>
          <span className={initialsClass}>{initials}</span>
        </span>
        {statusDot}
      </span>
    );
  }

  return (
    <span className={rootClass} aria-label={alt ?? 'User'} role="img">
      <span className={styles.inner}>
        <span className={styles.fallback}>
          <span className={styles.personHead} />
          <span className={styles.personBody} />
        </span>
      </span>
      {statusDot}
    </span>
  );
};

export type AvatarGroupProps = {
  avatars: AvatarProps[];
  max?: number;
};

export const AvatarGroup = ({
  avatars,
  max = 4,
}: AvatarGroupProps) => {
  const visible = avatars.slice(0, max);
  const rest = Math.max(0, avatars.length - max);

  return (
    <div className={styles.group} role="group" aria-label="Avatars">
      {visible.map((props, index) => (
        <span
          key={props.name ?? props.src ?? String(index)}
          className={styles.groupItem}
        >
          <Avatar {...props} size="sm" className={styles.avatarStacked} />
        </span>
      ))}
      {rest > 0 ? (
        <span
          className={styles.groupMore}
          aria-label={`${rest} more`}
        >
          +{rest}
        </span>
      ) : null}
    </div>
  );
};
