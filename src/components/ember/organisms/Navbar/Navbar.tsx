import styles from './Navbar.module.css';

export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export type NavbarProps = {
  items: NavItem[];
  activeHref?: string;
  logoSrc?: string;
  /** When false, navbar scrolls with the page (use inside case studies / iframes so it does not cover a host site nav). Default true. */
  sticky?: boolean;
};

export const Navbar = ({ items, activeHref, logoSrc, sticky = true }: NavbarProps) => {
  const rootClass = [styles.root, sticky ? '' : styles.rootStatic].filter(Boolean).join(' ');
  return (
    <header className={rootClass}>
      <a className={styles.logoLink} href="/">
        {logoSrc != null && logoSrc.length > 0 ? (
          <img
            className={styles.logoImage}
            src={logoSrc}
            alt="Catastrophic Wildfire Prevention Consortium"
          />
        ) : (
          <span className={styles.logoText}>CWPC</span>
        )}
      </a>
      <nav className={styles.nav} aria-label="Primary">
        {items.map((item) => {
          const isActive = activeHref != null && item.href === activeHref;
          const linkClass = [styles.link, isActive ? styles.linkActive : '']
            .filter(Boolean)
            .join(' ');
          return (
            <a key={item.href} className={linkClass} href={item.href}>
              <span className={styles.linkLabel}>{item.label}</span>
              {item.hasDropdown === true ? (
                <span className={styles.dropdownMark} aria-hidden>
                  ▾
                </span>
              ) : null}
            </a>
          );
        })}
      </nav>
    </header>
  );
};
