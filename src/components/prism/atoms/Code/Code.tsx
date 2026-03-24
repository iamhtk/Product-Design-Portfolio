import { useCallback, useRef, type ReactNode } from 'react';
import styles from './Code.module.css';

export type CodeProps = {
  children: ReactNode;
  block?: boolean;
  language?: string;
  copyable?: boolean;
  className?: string;
};

export const Code = ({
  children,
  block = false,
  language,
  copyable = false,
  className,
}: CodeProps) => {
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = useCallback(async () => {
    const el = preRef.current;
    if (!el) return;
    const text = el.innerText ?? '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard may be unavailable */
    }
  }, []);

  if (!block) {
    return (
      <code className={[styles.inline, className ?? ''].filter(Boolean).join(' ')}>
        {children}
      </code>
    );
  }

  const showChrome = Boolean(language) || copyable;
  const preClass = [styles.pre, showChrome ? styles.preHasChrome : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={[styles.blockWrapper, className ?? ''].filter(Boolean).join(' ')}>
      {language ? <span className={styles.language}>{language}</span> : null}
      {copyable ? (
        <button
          type="button"
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          Copy
        </button>
      ) : null}
      <pre className={preClass} ref={preRef}>
        <code className={styles.blockCode}>{children}</code>
      </pre>
    </div>
  );
};
