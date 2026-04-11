import {
  createContext,
  useContext,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./Radio.module.css";

interface RadioContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onDark?: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export interface RadioGroupProps {
  name?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onDark?: boolean;
  legend?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({
  name: nameProp,
  value,
  onChange,
  disabled,
  onDark,
  legend,
  children,
  className = "",
}: RadioGroupProps) {
  const autoName = useId();
  const name = nameProp ?? `cwpc-radio-${autoName}`;

  return (
    <RadioContext.Provider value={{ name, value, onChange, disabled, onDark }}>
      <fieldset className={`${styles.fieldset} ${className}`.trim()}>
        {legend != null && (
          <legend
            className={`${styles.legend} ${onDark ? styles.legendDark : ""}`.trim()}
          >
            {legend}
          </legend>
        )}
        <div className={styles.group}>
          {children}
        </div>
      </fieldset>
    </RadioContext.Provider>
  );
}

export interface RadioItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: string;
  label: ReactNode;
}

export function RadioItem({
  value,
  label,
  id,
  className = "",
  disabled: disabledProp,
  ...rest
}: RadioItemProps) {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("RadioItem must be used inside RadioGroup");

  const disabled = disabledProp ?? ctx.disabled;
  const selected = ctx.value === value;
  const inputId = id ?? `${ctx.name}-${value}`;

  return (
    <label
      htmlFor={inputId}
      className={[
        styles.row,
        ctx.onDark ? styles.rowOnDark : "",
        selected ? styles.selected : "",
        disabled ? styles.rowDisabled : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        id={inputId}
        type="radio"
        name={ctx.name}
        value={value}
        className={styles.input}
        checked={selected}
        disabled={disabled}
        onChange={() => ctx.onChange(value)}
        {...rest}
      />
      <span className={styles.ring} aria-hidden>
        {selected && <span className={styles.dot} />}
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
