import { useState } from 'react';
import { Badge } from '../../atoms/Badge/Badge';
import styles from './TabBar.module.css';

export type TabItem = {
  id: string;
  label: string;
  disabled?: boolean;
  badge?: number;
};

export type TabBarProps = {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  defaultTab?: string;
};

export const TabBar = ({
  tabs,
  activeTab,
  onChange,
  defaultTab,
}: TabBarProps) => {
  const isControlled = activeTab !== undefined;
  const firstId = tabs[0]?.id ?? '';

  const [internalTab, setInternalTab] = useState(
    () => defaultTab ?? firstId,
  );

  const current = isControlled ? activeTab! : internalTab;

  const handleSelect = (tab: TabItem) => {
    if (tab.disabled) return;
    onChange?.(tab.id);
    if (!isControlled) {
      setInternalTab(tab.id);
    }
  };

  return (
    <div className={styles.root} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === current;
        const tabClass = [
          styles.tab,
          isActive ? styles.tabActive : '',
          tab.disabled ? styles.tabDisabled : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={tabClass}
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => handleSelect(tab)}
          >
            <span className={styles.tabInner}>
              <span>{tab.label}</span>
              {tab.badge != null ? (
                <Badge
                  label={String(tab.badge)}
                  variant="primary"
                  size="sm"
                />
              ) : null}
            </span>
            {isActive && !tab.disabled ? (
              <span className={styles.indicator} aria-hidden="true" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
};
