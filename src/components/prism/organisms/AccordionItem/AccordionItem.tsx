import { useId, useState } from 'react';
import styles from './AccordionItem.module.css';

export type AccordionItemProps = {
  title: string;
  body: string;
  defaultOpen?: boolean;
};

export const AccordionItem = ({
  title,
  body,
  defaultOpen = false,
}: AccordionItemProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  const titleId = useId();

  return (
    <div
      className={[styles.root, open ? styles.expanded : ''].filter(Boolean).join(' ')}
    >
      <button
        type="button"
        className={styles.header}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
      >
        <span id={titleId} className={styles.title}>
          {title}
        </span>
        <span
          className={[styles.icon, open ? styles.iconOpen : ''].filter(Boolean).join(' ')}
          aria-hidden
        >
          <span className={styles.plus} />
        </span>
      </button>
      <div
        id={contentId}
        className={styles.body}
        role="region"
        aria-labelledby={titleId}
      >
        {body}
      </div>
    </div>
  );
};
