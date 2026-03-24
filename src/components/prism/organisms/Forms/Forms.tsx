import type { ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Card } from '../Card/Card';
import { Input } from '../../molecules/Input/Input';
import styles from './Forms.module.css';

export type FormField = {
  label: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
  hint?: string;
  iconType?: 'default' | 'email';
};

export type FormsProps = {
  title?: string;
  description?: string;
  fields: FormField[];
  checkboxLabels?: string[];
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  footerText?: string;
  footerLinkText?: string;
  onSubmit?: () => void;
  onClose?: () => void;
};

const formsInfoIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
      fill="currentColor"
    />
  </svg>
);

const formsMailIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      fill="currentColor"
    />
  </svg>
);

export const Forms = ({
  title,
  description,
  fields,
  checkboxLabels,
  primaryButtonLabel,
  secondaryButtonLabel,
  footerText,
  footerLinkText,
  onSubmit,
  onClose,
}: FormsProps) => {
  const footerNode: ReactNode =
    footerText != null || footerLinkText != null ? (
      <p className={styles.footerText}>
        {footerText != null ? <>{footerText} </> : null}
        {footerLinkText != null ? (
          <a className={styles.footerLink} href="#">
            {footerLinkText}
          </a>
        ) : null}
      </p>
    ) : null;

  return (
    <Card footer={footerNode}>
      {title != null ? <h2 className={styles.formTitle}>{title}</h2> : null}
      {description != null ? (
        <p className={styles.description}>{description}</p>
      ) : null}
      <div className={styles.fields}>
        {fields.map((field) => (
          <Input
            key={field.label}
            label={field.label}
            type={field.type}
            required={field.required}
            hint={field.hint}
            showHintIcon={field.iconType === 'default'}
            iconLeft={
              field.iconType === 'email'
                ? formsMailIcon
                : field.iconType === 'default'
                  ? formsInfoIcon
                  : undefined
            }
            iconRight={field.iconType === 'default' ? formsInfoIcon : undefined}
            width="100%"
          />
        ))}
      </div>
      {checkboxLabels != null && checkboxLabels.length > 0 ? (
        <div className={styles.checkboxSection}>
          {checkboxLabels.map((label) => (
            <label key={label} className={styles.checkboxLabel}>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                name={label}
              />
              {label}
            </label>
          ))}
        </div>
      ) : null}
      {primaryButtonLabel != null || secondaryButtonLabel != null ? (
        <div className={styles.buttonRow}>
          {primaryButtonLabel != null ? (
            <Button
              label={primaryButtonLabel}
              colorScheme="success"
              onClick={onSubmit}
            />
          ) : null}
          {secondaryButtonLabel != null ? (
            <Button
              label={secondaryButtonLabel}
              type="default"
              onClick={onClose}
            />
          ) : null}
        </div>
      ) : null}
    </Card>
  );
};
