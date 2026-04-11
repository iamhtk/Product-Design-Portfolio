import { useCallback, type KeyboardEvent } from "react";
import styles from "./TabBar.module.css";

export interface TabDef {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TabBarProps {
  tabs: TabDef[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  id?: string;
  onDark?: boolean;
}

export function TabBar({
  tabs,
  value,
  onChange,
  className = "",
  id = "cwpc-tabs",
  onDark,
}: TabBarProps) {
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLUListElement>) => {
      const enabled = tabs.filter((t) => !t.disabled);
      const idx = enabled.findIndex((t) => t.id === value);
      if (idx < 0) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = enabled[(idx + 1) % enabled.length];
        onChange(next.id);
        document.getElementById(`${id}-tab-${next.id}`)?.focus();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = enabled[(idx - 1 + enabled.length) % enabled.length];
        onChange(next.id);
        document.getElementById(`${id}-tab-${next.id}`)?.focus();
      }
      if (e.key === "Home") {
        e.preventDefault();
        const first = enabled[0];
        onChange(first.id);
        document.getElementById(`${id}-tab-${first.id}`)?.focus();
      }
      if (e.key === "End") {
        e.preventDefault();
        const last = enabled[enabled.length - 1];
        onChange(last.id);
        document.getElementById(`${id}-tab-${last.id}`)?.focus();
      }
    },
    [tabs, value, onChange, id]
  );

  return (
    <ul
      role="tablist"
      className={[styles.list, onDark ? styles.onDark : "", className]
        .filter(Boolean)
        .join(" ")}
      onKeyDown={onKeyDown}
    >
      {tabs.map((tab) => {
        const selected = tab.id === value;
        return (
          <li key={tab.id} role="presentation">
            <button
              type="button"
              role="tab"
              id={`${id}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              disabled={tab.disabled}
              className={[styles.tab, selected ? styles.active : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => !tab.disabled && onChange(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
