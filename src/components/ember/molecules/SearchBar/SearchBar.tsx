import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Loader } from '../../atoms/Loader/Loader';
import styles from './SearchBar.module.css';

export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  suggestions?: string[];
};

const sizeClassMap = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

export const SearchBar = ({
  placeholder = 'Search…',
  value: valueProp,
  onChange,
  onSearch,
  onClear,
  size = 'md',
  loading = false,
  disabled = false,
  suggestions = [],
}: SearchBarProps) => {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const filtered =
    suggestions.length === 0
      ? []
      : suggestions.filter((s) =>
          s.toLowerCase().includes(value.trim().toLowerCase()),
        );

  const showList = open && filtered.length > 0 && !disabled;

  useEffect(() => {
    if (!showList) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [showList]);

  useEffect(() => {
    if (showList) {
      setHighlight(0);
    }
  }, [value, showList]);

  const rootClass = [
    styles.root,
    sizeClassMap[size],
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClear = () => {
    setValue('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showList && filtered.length > 0) {
        const pick = filtered[highlight] ?? filtered[0];
        setValue(pick);
        setOpen(false);
        onSearch?.(pick);
        return;
      }
      onSearch?.(value);
      setOpen(false);
      return;
    }
    if (!showList) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={styles.wrapper}>
      <div className={rootClass}>
        <span className={styles.iconSlot} aria-hidden>
          {loading ? (
            <Loader size="sm" variant="primary" label="Loading" />
          ) : (
            <span className={styles.searchIcon} />
          )}
        </span>
        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          role="combobox"
          aria-expanded={showList}
          aria-controls={showList ? listId : undefined}
          aria-autocomplete="list"
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(suggestions.length > 0);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
        />
        {value.length > 0 ? (
          <button
            type="button"
            className={styles.clearBtn}
            aria-label="Clear search"
            disabled={disabled}
            onClick={handleClear}
          >
            ×
          </button>
        ) : null}
      </div>
      {showList ? (
        <ul id={listId} className={styles.suggestionList} role="listbox">
          {filtered.map((s, i) => (
            <li
              key={`${s}-${i}`}
              role="option"
              aria-selected={i === highlight}
              className={[
                styles.suggestionOption,
                i === highlight ? styles.suggestionOptionHighlight : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setValue(s);
                setOpen(false);
                onSearch?.(s);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
