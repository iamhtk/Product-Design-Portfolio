/**
 * Coyax component showcase demos, imported by CoyaxDesignSystem.tsx
 * (kept in a sibling file to avoid a 5000+ line single file; re-exported locally)
 */
import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  AreaChart,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  Database,
  FileText,
  Home,
  Minus,
  PanelLeft,
  Plus,
  Search,
  Sparkles,
  Upload,
} from 'lucide-react';

export const COYAX_DEMO_COLORS = {
  bgPrimary: '#18181b',
  fgPrimary: '#fafaf9',
  stone50: '#fafaf9',
  stone100: '#f5f5f4',
  stone200: '#e7e5e4',
  stone300: '#d6d3d1',
  stone400: '#a8a29e',
  stone500: '#78716c',
  stone600: '#57534e',
  stone700: '#44403c',
  stone800: '#292524',
  stone900: '#1c1917',
  zinc100: '#f4f4f5',
  zinc200: '#e4e4e7',
  zinc400: '#a1a1aa',
  zinc500: '#71717a',
  border: '#e4e4e7',
  destructive: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  blue: '#2563eb',
  white: '#ffffff',
  hoverBg: '#e5e5e5',
} as const;

const C = COYAX_DEMO_COLORS;
const COYAX_STONE = C.stone500;

const DEMO_LABEL: CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.12em',
  color: '#a8a29e',
  textTransform: 'uppercase',
  margin: '0 0 16px',
};

const DEMO_TOKEN: CSSProperties = {
  fontSize: 10,
  fontFamily: 'monospace',
  color: '#a8a29e',
  margin: '16px 0 0',
  marginTop: 16,
  paddingTop: 12,
  borderTop: '1px solid #f0f0ef',
};

const DEMO_CARD: CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e7e5e4',
  borderRadius: '12px',
  padding: '20px 24px 24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
};

export function CoyaxDemoCard({
  name,
  token,
  children,
  style,
}: {
  name: string;
  token: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...DEMO_CARD, paddingTop: 20, ...style }}>
      <p style={{ ...DEMO_LABEL, marginBottom: 16 }}>{name}</p>
      <div style={{ paddingTop: 8, paddingBottom: 8 }}>{children}</div>
      <p style={{ ...DEMO_TOKEN, marginTop: 16, paddingTop: 12, borderTop: '1px solid #f0f0ef' }}>{token}</p>
    </div>
  );
}

const STATE_PILL_BASE: CSSProperties = {
  padding: '6px 14px',
  borderRadius: 9999,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 1.3,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'background-color 0.15s ease, color 0.15s ease',
};

function CoyaxStatePills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="coyax-state-pill"
          style={{
            ...STATE_PILL_BASE,
            ...(value === opt
              ? { backgroundColor: COYAX_STONE, color: C.white }
              : { backgroundColor: C.stone100, color: C.stone600 }),
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

type ButtonVisualState = 'default' | 'hover' | 'pressed' | 'focused' | 'disabled';

function coyaxButtonStyle(
  variant: 'primary' | 'secondary' | 'ghost' | 'outlined' | 'destructive' | 'link' | 'upload',
  state: ButtonVisualState
): CSSProperties {
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    height: variant === 'upload' ? 32 : undefined,
    padding: '7px 16px',
    fontSize: variant === 'upload' ? 12 : 13,
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
    opacity: state === 'disabled' ? 0.4 : 1,
    transition: 'background 0.15s ease, border-color 0.15s ease',
    whiteSpace: 'nowrap',
  };

  const variants: Record<typeof variant, { default: CSSProperties; hover: CSSProperties; pressed: CSSProperties }> = {
    primary: {
      default: { background: C.bgPrimary, color: C.fgPrimary, border: 'none' },
      hover: { background: '#292524', color: C.fgPrimary, border: 'none' },
      pressed: { background: C.stone900, color: C.fgPrimary, border: 'none' },
    },
    secondary: {
      default: { background: C.zinc100, color: C.bgPrimary, border: `1px solid ${C.border}` },
      hover: { background: C.zinc200, color: C.bgPrimary, border: `1px solid ${C.border}` },
      pressed: { background: '#d4d4d8', color: C.bgPrimary, border: `1px solid ${C.border}` },
    },
    ghost: {
      default: { background: 'transparent', color: C.bgPrimary, border: 'none' },
      hover: { background: C.zinc100, color: C.bgPrimary, border: 'none' },
      pressed: { background: C.zinc200, color: C.bgPrimary, border: 'none' },
    },
    outlined: {
      default: { background: 'transparent', color: C.bgPrimary, border: `1px solid ${C.bgPrimary}` },
      hover: { background: C.stone100, color: C.bgPrimary, border: `1px solid ${C.bgPrimary}` },
      pressed: { background: C.stone200, color: C.bgPrimary, border: `1px solid ${C.bgPrimary}` },
    },
    destructive: {
      default: { background: C.destructive, color: C.white, border: 'none' },
      hover: { background: '#dc2626', color: C.white, border: 'none' },
      pressed: { background: '#b91c1c', color: C.white, border: 'none' },
    },
    link: {
      default: { background: 'transparent', color: C.blue, border: 'none', textDecoration: 'none' },
      hover: { background: 'transparent', color: C.blue, border: 'none', textDecoration: 'underline' },
      pressed: { background: 'transparent', color: '#1d4ed8', border: 'none', textDecoration: 'underline' },
    },
    upload: {
      default: { background: C.zinc100, color: C.bgPrimary, border: `1px solid ${C.border}` },
      hover: { background: C.zinc200, color: C.bgPrimary, border: `1px solid ${C.border}` },
      pressed: { background: '#d4d4d8', color: C.bgPrimary, border: `1px solid ${C.border}` },
    },
  };

  const v = variants[variant];
  const stateStyle =
    state === 'hover' ? v.hover : state === 'pressed' ? v.pressed : state === 'disabled' ? v.default : v.default;
  const style: CSSProperties = { ...base, ...stateStyle };
  if (state === 'focused') {
    style.outline = `2px solid ${C.blue}`;
    style.outlineOffset = '2px';
  }
  return style;
}

const BUTTON_STATE_LABELS = ['Default', 'Hover', 'Pressed', 'Focused', 'Disabled'] as const;
const BUTTON_STATE_MAP: Record<(typeof BUTTON_STATE_LABELS)[number], ButtonVisualState> = {
  Default: 'default',
  Hover: 'hover',
  Pressed: 'pressed',
  Focused: 'focused',
  Disabled: 'disabled',
};

export function CoyaxButtonDemo() {
  const [activeState, setActiveState] = useState<(typeof BUTTON_STATE_LABELS)[number]>('Default');
  const variants = [
    { key: 'primary' as const, label: 'Primary' },
    { key: 'secondary' as const, label: 'Secondary' },
    { key: 'ghost' as const, label: 'Ghost' },
    { key: 'outlined' as const, label: 'Outlined' },
    { key: 'destructive' as const, label: 'Destructive' },
    { key: 'link' as const, label: 'Link' },
    { key: 'upload' as const, label: 'Upload' },
  ];
  const states: ButtonVisualState[] = ['default', 'hover', 'pressed', 'focused', 'disabled'];
  const applied = BUTTON_STATE_MAP[activeState];

  return (
    <CoyaxDemoCard name="Button Variants" token="bg: semantic/primary · border: semantic/border · radius: 6px">
      <CoyaxStatePills
        options={BUTTON_STATE_LABELS}
        value={activeState}
        onChange={setActiveState}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {variants.map((v) => (
          <div key={v.key} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ width: 72, fontSize: 11, color: C.stone500, flexShrink: 0 }}>{v.label}</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
              {states.map((s) => (
                <button
                  key={s}
                  type="button"
                  style={{
                    ...coyaxButtonStyle(v.key, s),
                    boxShadow: applied === s ? `0 0 0 2px ${C.blue}44` : undefined,
                    opacity: s === 'disabled' ? 0.4 : applied === s ? 1 : 0.85,
                  }}
                  disabled={s === 'disabled'}
                >
                  {v.key === 'upload' ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Upload size={12} /> Upload
                    </span>
                  ) : (
                    v.label
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

type InputState = 'Default' | 'Hover' | 'Focused' | 'Error' | 'Success' | 'Disabled';

export function CoyaxInputDemo() {
  const [inputState, setInputState] = useState<InputState>('Default');

  const inputStyle: CSSProperties = {
    height: 28,
    borderRadius: 6,
    padding: '0 8px',
    fontSize: 13,
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #e4e4e7',
    background: '#ffffff',
    outline: 'none',
  };

  if (inputState === 'Hover') {
    inputStyle.border = '1px solid #a8a29e';
  } else if (inputState === 'Focused') {
    inputStyle.border = '2px solid #18181b';
    inputStyle.outline = 'none';
  } else if (inputState === 'Error') {
    inputStyle.border = '1px solid #ef4444';
  } else if (inputState === 'Success') {
    inputStyle.border = '1px solid #22c55e';
  } else if (inputState === 'Disabled') {
    inputStyle.opacity = 0.4;
    inputStyle.background = '#f5f5f4';
    inputStyle.cursor = 'not-allowed';
  }

  return (
    <CoyaxDemoCard name="Input Field States" token="border: semantic/border · error: semantic/destructive · height: 28px">
      <CoyaxStatePills
        options={['Default', 'Hover', 'Focused', 'Error', 'Success', 'Disabled']}
        value={inputState}
        onChange={setInputState}
      />
      <p style={{ fontSize: 11, color: '#a8a29e', fontStyle: 'italic', marginBottom: 8, marginTop: 0 }}>
        Click a state above to change the input
      </p>
      <input
        type="text"
        placeholder="Enter value…"
        style={inputStyle}
        disabled={inputState === 'Disabled'}
        readOnly={inputState !== 'Disabled'}
        defaultValue=""
      />
      {inputState === 'Error' ? <p style={{ fontSize: 11, color: C.destructive, margin: '6px 0 0' }}>This field is required</p> : null}
    </CoyaxDemoCard>
  );
}

function CoyaxCheckboxRow({
  state,
  label,
  onClick,
}: {
  state: 'unchecked' | 'checked' | 'indeterminate' | 'focused' | 'disabled-on' | 'disabled-off';
  label: string;
  onClick?: () => void;
}) {
  const checked = state === 'checked' || state === 'disabled-on';
  const indeterminate = state === 'indeterminate';
  const disabled = state === 'disabled-on' || state === 'disabled-off';
  return (
    <label
      style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1 }}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
    >
      <div
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        onClick={onClick}
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          border: `1px solid ${checked || indeterminate ? C.bgPrimary : C.border}`,
          background: checked || indeterminate ? C.bgPrimary : C.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          outline: state === 'focused' ? `2px solid ${C.bgPrimary}` : undefined,
          outlineOffset: state === 'focused' ? 2 : undefined,
        }}
      >
        {checked ? <Check size={10} color={C.white} strokeWidth={3} /> : null}
        {indeterminate ? <Minus size={10} color={C.white} strokeWidth={3} /> : null}
      </div>
      <span style={{ fontSize: 13, color: C.stone700 }}>{label}</span>
    </label>
  );
}

export function CoyaxCheckboxDemo() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  return (
    <CoyaxDemoCard name="Checkbox States" token="bg: semantic/primary when checked · border: semantic/border">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <CoyaxCheckboxRow state="unchecked" label="Default unchecked" />
        <CoyaxCheckboxRow state="checked" label="Checked" onClick={() => setChecked(!checked)} />
        <CoyaxCheckboxRow state="indeterminate" label="Indeterminate (click to toggle)" onClick={() => setIndeterminate(!indeterminate)} />
        <CoyaxCheckboxRow state="focused" label="Focused" />
        <CoyaxCheckboxRow state="disabled-on" label="Disabled on" />
        <CoyaxCheckboxRow state="disabled-off" label="Disabled off" />
        <div style={{ marginTop: 4, padding: 10, background: C.stone50, borderRadius: 6, border: `1px solid ${C.border}` }}>
          <CoyaxCheckboxRow
            state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
            label="Interactive checkbox"
            onClick={() => {
              setIndeterminate(false);
              setChecked(!checked);
            }}
          />
        </div>
      </div>
    </CoyaxDemoCard>
  );
}

function CoyaxSwitchRow({
  on,
  disabled,
  label,
  onToggle,
}: {
  on: boolean;
  disabled?: boolean;
  label: string;
  onToggle?: () => void;
}) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1 }}>
      <div
        role="switch"
        aria-checked={on}
        onClick={() => !disabled && onToggle?.()}
        style={{
          width: 36,
          height: 18,
          borderRadius: 9999,
          background: on ? C.bgPrimary : C.stone200,
          position: 'relative',
          transition: 'background 200ms ease',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: on ? 20 : 2,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: C.white,
            transition: 'left 200ms ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }}
        />
      </div>
      <span style={{ fontSize: 13, color: C.stone700 }}>{label}</span>
    </label>
  );
}

export function CoyaxSwitchDemo() {
  const [on, setOn] = useState(false);
  return (
    <CoyaxDemoCard name="Switch Toggle States" token="bg: semantic/primary when on · transition: 200ms">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <CoyaxSwitchRow on={false} label="Off" />
        <CoyaxSwitchRow on={true} label="On" />
        <CoyaxSwitchRow on={false} disabled label="Disabled off" />
        <CoyaxSwitchRow on={true} disabled label="Disabled on" />
        <CoyaxSwitchRow on={on} label="Interactive switch" onToggle={() => setOn(!on)} />
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxRadioDemo() {
  const [selected, setSelected] = useState('a');
  const rows = [
    { id: 'default', state: 'default' as const, label: 'Default', value: 'default' },
    { id: 'selected', state: 'selected' as const, label: 'Selected', value: 'selected' },
    { id: 'variant', state: 'variant' as const, label: 'Variant', value: 'variant' },
    { id: 'focused', state: 'focused' as const, label: 'Focused', value: 'focused' },
    { id: 'disabled', state: 'disabled' as const, label: 'Disabled', value: 'disabled' },
  ];

  return (
    <CoyaxDemoCard name="Radio Button States" token="border: semantic/primary when selected">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((row) => {
          const isSelected = row.state === 'selected' || selected === row.value;
          const isDisabled = row.state === 'disabled';
          const isFocused = row.state === 'focused';
          return (
            <label
              key={row.id}
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: isDisabled ? 'not-allowed' : 'pointer', opacity: isDisabled ? 0.4 : 1 }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: `1px solid ${isSelected ? C.bgPrimary : C.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: isFocused ? `2px solid ${C.bgPrimary}` : undefined,
                  outlineOffset: isFocused ? 2 : undefined,
                }}
                onClick={() => !isDisabled && setSelected(row.value)}
              >
                {isSelected ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.bgPrimary }} /> : null}
              </div>
              <span style={{ fontSize: 13, color: C.stone700 }}>{row.label}</span>
            </label>
          );
        })}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxSelectDemo() {
  const selectStyle: CSSProperties = {
    height: 28,
    borderRadius: 6,
    border: `1px solid ${C.border}`,
    padding: '0 28px 0 8px',
    fontSize: 13,
    fontFamily: 'inherit',
    width: '100%',
    background: `${C.white}`,
    appearance: 'none',
    WebkitAppearance: 'none',
    boxSizing: 'border-box',
  };
  return (
    <CoyaxDemoCard name="Select Dropdown" token="border: semantic/border · height: 28px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <select style={selectStyle} defaultValue="invoices">
            <option value="invoices">Invoices</option>
            <option value="documents">Documents</option>
            <option value="reports">Reports</option>
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: 8, top: 7, pointerEvents: 'none', color: C.stone500 }} />
        </div>
        <div style={{ position: 'relative', opacity: 0.4 }}>
          <select style={selectStyle} disabled defaultValue="invoices">
            <option value="invoices">Invoices</option>
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: 8, top: 7, pointerEvents: 'none', color: C.stone500 }} />
          <p style={{ fontSize: 11, color: C.stone500, margin: '4px 0 0' }}>Disabled</p>
        </div>
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxSearchInputDemo() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const base: CSSProperties = {
    height: 30,
    borderRadius: 6,
    border: `1px solid ${focused ? C.bgPrimary : C.border}`,
    padding: '0 8px 0 28px',
    fontSize: 13,
    fontFamily: 'inherit',
    width: '100%',
    background: C.white,
    boxSizing: 'border-box',
    outline: focused ? `2px solid ${C.bgPrimary}` : undefined,
    outlineOffset: focused ? 1 : undefined,
  };
  return (
    <CoyaxDemoCard name="Search Input" token="border: semantic/border · icon: semantic/muted">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 8, top: 8, color: C.stone500 }} />
          <input
            type="search"
            placeholder="Search documents…"
            style={base}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        <div style={{ position: 'relative', opacity: 0.4 }}>
          <Search size={14} style={{ position: 'absolute', left: 8, top: 8, color: C.stone500 }} />
          <input type="search" placeholder="Disabled" style={{ ...base, outline: undefined }} disabled />
          <p style={{ fontSize: 11, color: C.stone500, margin: '4px 0 0' }}>Disabled</p>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 8, top: 8, color: C.stone500 }} />
          <input type="search" defaultValue="Invoice #1042" style={base} readOnly />
          <p style={{ fontSize: 11, color: C.stone500, margin: '4px 0 0' }}>Filled</p>
        </div>
      </div>
    </CoyaxDemoCard>
  );
}

type TextareaState = 'Default' | 'Focused' | 'Error' | 'Long';

export function CoyaxTextareaDemo() {
  const [state, setState] = useState<TextareaState>('Default');
  const style: CSSProperties = {
    height: state === 'Long' ? 200 : 80,
    borderRadius: 6,
    border: `1px solid ${state === 'Error' ? C.destructive : state === 'Focused' ? C.bgPrimary : C.border}`,
    fontSize: 13,
    fontFamily: 'inherit',
    padding: 8,
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box',
    outline: state === 'Focused' ? `2px solid ${C.bgPrimary}` : undefined,
    outlineOffset: state === 'Focused' ? 1 : undefined,
  };
  return (
    <CoyaxDemoCard name="Text Area" token="border: semantic/border · resize: vertical">
      <CoyaxStatePills options={['Default', 'Focused', 'Error', 'Long']} value={state} onChange={setState} />
      <textarea style={style} placeholder="Enter description…" defaultValue={state === 'Long' ? 'Long form content…\n'.repeat(8) : ''} />
      {state === 'Error' ? <p style={{ fontSize: 11, color: C.destructive, margin: '6px 0 0' }}>Description is too short</p> : null}
    </CoyaxDemoCard>
  );
}

export function CoyaxSegmentedControlDemo() {
  const [active, setActive] = useState<'Area' | 'Bar'>('Area');
  return (
    <CoyaxDemoCard name="Segmented Control" token="bg: semantic/primary when active · bg: semantic/muted">
      <div style={{ display: 'inline-flex', border: `1px solid ${C.border}`, borderRadius: 6, padding: 2, gap: 2 }}>
        {(['Area', 'Bar'] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setActive(opt)}
            style={{
              padding: '6px 16px',
              borderRadius: 4,
              border: 'none',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              background: active === opt ? C.bgPrimary : 'transparent',
              color: active === opt ? C.fgPrimary : C.stone500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {opt === 'Area' ? <AreaChart size={14} /> : <BarChart3 size={14} />}
            {opt}
          </button>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxUploadButtonDemo() {
  const [state, setState] = useState<'default' | 'hover' | 'pressed'>('default');
  const btnStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: state === 'pressed' ? '#d4d4d8' : state === 'hover' ? C.zinc200 : C.zinc100,
    color: C.bgPrimary,
    border: `1px solid ${C.border}`,
    borderRadius: 6,
    height: 32,
    padding: '0 12px',
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'inherit',
    cursor: 'pointer',
  };
  return (
    <CoyaxDemoCard name="Upload Button" token="bg: semantic/secondary">
      <CoyaxStatePills options={['Default', 'Hover', 'Pressed']} value={state === 'default' ? 'Default' : state === 'hover' ? 'Hover' : 'Pressed'} onChange={(l) => setState(l === 'Default' ? 'default' : l === 'Hover' ? 'hover' : 'pressed')} />
      <button type="button" style={btnStyle} onMouseEnter={() => setState('hover')} onMouseLeave={() => setState('default')} onMouseDown={() => setState('pressed')} onMouseUp={() => setState('hover')}>
        <Upload size={14} />
        Upload file
      </button>
    </CoyaxDemoCard>
  );
}

function SidebarLink({
  icon,
  label,
  active,
  collapsed,
  indent = 0,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  indent?: number;
}) {
  return (
    <div
      style={{
        height: 27,
        borderRadius: 9,
        padding: collapsed ? 0 : `0 10px 0 ${10 + indent}px`,
        fontSize: 12,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: 10,
        background: active ? C.hoverBg : 'transparent',
        color: C.stone700,
        borderLeft: active && !collapsed ? `2px solid ${C.bgPrimary}` : undefined,
        marginLeft: active && !collapsed ? -2 : undefined,
      }}
    >
      {icon}
      {!collapsed ? label : null}
    </div>
  );
}

export function CoyaxSidebarDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarStyle = (isCollapsed: boolean): CSSProperties => ({
    width: isCollapsed ? 48 : 208,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: 8,
    background: C.white,
    transition: 'width 0.2s ease',
  });
  const content = (isCollapsed: boolean) => (
    <>
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', gap: 8, marginBottom: 12, background: 'none', border: 'none', cursor: 'pointer', width: '100%', padding: 4 }}
      >
        <PanelLeft size={16} color={C.stone600} />
        {!isCollapsed ? <span style={{ fontSize: 14, fontWeight: 700, color: C.bgPrimary }}>Coyax</span> : null}
      </button>
      <SidebarLink icon={<Home size={14} />} label="Home" active collapsed={isCollapsed} />
      {!isCollapsed ? <p style={{ fontSize: 11, textTransform: 'uppercase', color: C.stone500, letterSpacing: '0.06em', margin: '12px 0 6px', paddingLeft: 10 }}>Documents</p> : null}
      <SidebarLink icon={<FileText size={14} />} label="Invoices" indent={12} collapsed={isCollapsed} />
      {!isCollapsed ? <p style={{ fontSize: 11, textTransform: 'uppercase', color: C.stone500, letterSpacing: '0.06em', margin: '12px 0 6px', paddingLeft: 10 }}>Automate</p> : null}
      <SidebarLink icon={<Sparkles size={14} />} label="AI Analytics" collapsed={isCollapsed} />
      <SidebarLink icon={<Database size={14} />} label="Database" collapsed={isCollapsed} />
    </>
  );
  return (
    <CoyaxDemoCard name="Sidebar Full" token="bg: sidebar-bg · link-height: 27px · radius: 9px">
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={sidebarStyle(false)}>{content(false)}</div>
        <div style={sidebarStyle(true)}>{content(true)}</div>
      </div>
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: 11,
          color: '#a8a29e',
          fontStyle: 'italic',
          marginTop: 12,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          padding: 0,
        }}
      >
        Toggle expanded / collapsed preview
      </button>
    </CoyaxDemoCard>
  );
}

export function CoyaxSidebarLinkDemo() {
  const links = [
    { label: 'Default', bg: 'transparent', border: undefined, indent: 0 },
    { label: 'Hover', bg: C.hoverBg, border: undefined, indent: 0 },
    { label: 'Active', bg: C.hoverBg, border: `2px solid ${C.bgPrimary}`, indent: 0 },
    { label: 'Indented parent', bg: 'transparent', border: undefined, indent: 12 },
    { label: 'Indented child', bg: C.hoverBg, border: undefined, indent: 12 },
  ];
  return (
    <CoyaxDemoCard name="Sidebar Link States" token="bg: color-hover on hover · bg: color-hover when active">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {links.map((l) => (
          <div
            key={l.label}
            style={{
              height: 27,
              borderRadius: 9,
              padding: `0 10px 0 ${10 + l.indent}px`,
              fontSize: 12,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: l.bg,
              color: C.stone700,
              borderLeft: l.border,
              marginLeft: l.border ? -2 : undefined,
            }}
          >
            <FileText size={14} />
            {l.label}
          </div>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxTopbarDemo() {
  return (
    <CoyaxDemoCard name="Topbar" token="border-bottom: semantic/border · height: 44px" style={{ gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44, borderBottom: `1px solid ${C.border}`, background: C.white, padding: '0 12px', borderRadius: '8px 8px 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <PanelLeft size={18} color={C.stone600} />
          <span style={{ fontSize: 14, fontWeight: 500, color: C.bgPrimary }}>Documents</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, padding: '4px 10px', border: `1px solid ${C.border}`, borderRadius: 9999, color: C.stone600 }}>AI Credits 200</span>
          <Bell size={18} color={C.stone500} />
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.stone200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: C.stone600 }}>H</div>
        </div>
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxTabsNotificationDemo() {
  const [active, setActive] = useState(0);
  const tabs = ['All', 'Unread', 'Mentions'];
  return (
    <CoyaxDemoCard name="Tabs Notification Panel" token="border-bottom: semantic/primary when active">
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${C.border}` }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(i)}
            style={{
              height: 40,
              padding: '0 16px',
              fontSize: 13,
              fontWeight: active === i ? 500 : 400,
              color: active === i ? C.bgPrimary : C.stone500,
              background: 'none',
              border: 'none',
              borderBottom: active === i ? `2px solid ${C.bgPrimary}` : '2px solid transparent',
              cursor: 'pointer',
              fontFamily: 'inherit',
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxTabsDashboardDemo() {
  const [twoTab, setTwoTab] = useState(0);
  const [threeTab, setThreeTab] = useState(0);
  const tabBtn = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      style={{
        height: 36,
        padding: '0 12px',
        fontSize: 13,
        fontWeight: active ? 500 : 400,
        color: active ? C.bgPrimary : C.stone500,
        background: 'none',
        border: 'none',
        borderBottom: active ? `2px solid ${C.bgPrimary}` : '2px solid transparent',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  );
  return (
    <CoyaxDemoCard name="Tabs Dashboard Panel" token="border-bottom: semantic/primary when active" style={{ gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${C.border}` }}>
          {['Overview', 'Analytics'].map((t, i) => tabBtn(t, twoTab === i, () => setTwoTab(i)))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex' }}>
            {['Widgets', 'Data', 'Settings'].map((t, i) => tabBtn(t, threeTab === i, () => setThreeTab(i)))}
          </div>
          <button type="button" style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${C.border}`, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 4 }}>
            <Plus size={14} color={C.stone600} />
          </button>
        </div>
      </div>
    </CoyaxDemoCard>
  );
}

function BreadcrumbPath({ variant }: { variant: 'v1' | 'v2' }) {
  const items = ['Home', 'Documents', 'Invoice'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: variant === 'v1' ? 6 : 4, flexWrap: 'wrap' }}>
      {items.map((item, i) => (
        <span key={item} style={{ display: 'flex', alignItems: 'center', gap: variant === 'v1' ? 6 : 4 }}>
          {i > 0 ? <span style={{ color: C.stone400, fontSize: variant === 'v1' ? 12 : 11 }}>/</span> : null}
          <span style={{ fontSize: variant === 'v1' ? 13 : 12, fontWeight: i === items.length - 1 ? 500 : 400, color: i === items.length - 1 ? C.bgPrimary : C.stone500 }}>{item}</span>
        </span>
      ))}
    </div>
  );
}

export function CoyaxBreadcrumbDemo() {
  return (
    <CoyaxDemoCard name="Breadcrumb" token="text: semantic/muted when inactive · text: semantic/foreground when active">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <p style={{ fontSize: 10, color: C.stone400, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>v1</p>
          <BreadcrumbPath variant="v1" />
        </div>
        <div>
          <p style={{ fontSize: 10, color: C.stone400, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>v2</p>
          <BreadcrumbPath variant="v2" />
        </div>
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxBadgeDemo() {
  const badges = [
    { label: 'Teal', bg: '#ccfbf1', color: '#115e59', border: '#2dd4bf' },
    { label: 'Amber', bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
    { label: 'Red', bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
    { label: 'Blue', bg: '#eff6ff', color: '#1e40af', border: '#93c5fd' },
    { label: 'Green', bg: '#dcfce7', color: '#166534', border: '#86efac' },
    { label: 'Gray', bg: '#f4f4f5', color: '#3f3f46', border: '#d4d4d8' },
  ];
  return (
    <CoyaxDemoCard name="Badge Variants" token="semantic/status-teal · status-amber · status-red · status-blue · status-green · status-gray">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {badges.map((b) => (
          <span key={b.label} style={{ borderRadius: 9999, padding: '2px 8px', fontSize: 11, fontWeight: 500, background: b.bg, color: b.color, border: `1px solid ${b.border}` }}>
            {b.label}
          </span>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxNotificationDotDemo() {
  const dots = [
    { label: 'Default', color: C.zinc400 },
    { label: 'Error', color: C.destructive },
    { label: 'Success', color: C.success },
    { label: 'Warning', color: C.warning },
    { label: 'Info', color: '#3b82f6' },
    { label: 'Neutral', color: '#d4d4d8' },
  ];
  return (
    <CoyaxDemoCard name="Notification Dot" token="semantic/status colors · size: 6px">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {dots.map((d) => (
          <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: d.color }} />
            <span style={{ fontSize: 10, color: C.stone500 }}>{d.label}</span>
          </div>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxProgressBarDemo() {
  const fills = [10, 35, 65, 90];
  return (
    <CoyaxDemoCard name="Progress Bar" token="bg: semantic/primary · track: stone-200 · height: 6px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {fills.map((pct) => (
          <div key={pct}>
            <p style={{ fontSize: 11, color: C.stone500, margin: '0 0 4px' }}>{pct}%</p>
            <div style={{ height: 6, borderRadius: 9999, background: C.stone200, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: C.bgPrimary, borderRadius: 9999 }} />
            </div>
          </div>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxProgressBarInfoDemo() {
  return (
    <CoyaxDemoCard name="Progress Bar With Info" token="bg: semantic/primary · text: semantic/foreground">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, height: 6, borderRadius: 9999, background: C.stone200, overflow: 'hidden' }}>
          <div style={{ width: '67%', height: '100%', background: C.bgPrimary, borderRadius: 9999 }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: C.bgPrimary, flexShrink: 0 }}>67%</span>
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxConfidencePillDemo() {
  const pills = [
    { label: 'High', bg: 'rgba(34,197,94,0.1)', color: '#166534', dot: C.success },
    { label: 'Medium', bg: 'rgba(245,158,11,0.1)', color: '#92400e', dot: C.warning },
    { label: 'Low', bg: 'rgba(239,68,68,0.1)', color: '#991b1b', dot: C.destructive },
  ];
  return (
    <CoyaxDemoCard name="Confidence Pill" token="high: green · medium: amber · low: red">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {pills.map((p) => (
          <span key={p.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 9999, padding: '2px 10px', fontSize: 12, fontWeight: 500, background: p.bg, color: p.color }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.dot }} />
            {p.label}
          </span>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxAICreditPillDemo() {
  return (
    <CoyaxDemoCard name="AI Credit Pill" token="low: amber/warning · border: semantic/border">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <span style={{ fontSize: 12, padding: '4px 12px', border: `1px solid ${C.border}`, borderRadius: 9999, background: C.white, color: C.stone600 }}>AI Credits 200</span>
        <span style={{ fontSize: 12, padding: '4px 12px', border: `1px solid ${C.warning}`, borderRadius: 9999, background: 'rgba(245,158,11,0.08)', color: '#92400e' }}>AI Credits 12</span>
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxTooltipDemo() {
  const triggers = [
    { label: 'Button', style: { background: C.bgPrimary, color: C.fgPrimary, border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'default' } as CSSProperties },
    { label: 'Ghost', style: { background: 'transparent', color: C.bgPrimary, border: 'none', padding: '6px 12px', fontSize: 12, cursor: 'default' } as CSSProperties },
    { label: 'Icon', style: { background: C.stone100, color: C.stone600, border: 'none', width: 32, height: 32, borderRadius: 6, cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' } as CSSProperties },
  ];
  return (
    <CoyaxDemoCard name="Tooltip" token="bg: semantic/foreground · text: semantic/background">
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', paddingTop: 40 }}>
        {triggers.map((t) => (
          <div key={t.label} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'absolute', bottom: '100%', marginBottom: 8, background: C.stone900, color: C.fgPrimary, fontSize: 12, padding: '6px 10px', borderRadius: 6, maxWidth: 200, whiteSpace: 'nowrap' }}>
              Tooltip for {t.label.toLowerCase()} trigger
            </div>
            <button type="button" style={t.style}>{t.label === 'Icon' ? '?' : t.label}</button>
          </div>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

function ModalPreview({ title, body, accent, actions }: { title: string; body: string; accent?: string; actions: string[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, transform: 'scale(0.7)', transformOrigin: 'top left', width: 220, flexShrink: 0 }}>
      {accent ? <div style={{ height: 4, background: accent, borderRadius: '4px 4px 0 0', margin: '-16px -16px 12px' }} /> : null}
      <p style={{ fontSize: 14, fontWeight: 600, color: C.bgPrimary, margin: '0 0 8px' }}>{title}</p>
      <p style={{ fontSize: 12, color: C.stone500, margin: '0 0 12px', lineHeight: 1.5 }}>{body}</p>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
        {actions.map((a) => (
          <span key={a} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, background: a === actions[actions.length - 1] ? C.bgPrimary : C.zinc100, color: a === actions[actions.length - 1] ? C.fgPrimary : C.bgPrimary }}>{a}</span>
        ))}
      </div>
    </div>
  );
}

export function CoyaxModalDemo() {
  return (
    <CoyaxDemoCard name="Modal Types" token="bg: semantic/card · border: semantic/border · radius: 8px">
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
        <ModalPreview title="Confirm action?" body="This cannot be undone." actions={['Cancel', 'Confirm']} />
        <ModalPreview title="Warning" body="This workflow has unsaved changes." accent={C.warning} actions={['Cancel', 'Continue']} />
        <ModalPreview title="Create workflow" body="Name and trigger fields…" actions={['Cancel', 'Create']} />
        <ModalPreview title="Top up credits" body="Add AI credits to continue." accent={C.warning} actions={['Cancel', 'Top up']} />
        <ModalPreview title="Are you sure?" body="Simple confirmation dialog." actions={['No', 'Yes']} />
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxAvatarDemo() {
  const sizes = [
    { label: 'xs', px: 22, font: 9 },
    { label: 'sm', px: 28, font: 10 },
    { label: 'md', px: 32, font: 11 },
    { label: 'lg', px: 40, font: 13 },
  ];
  return (
    <CoyaxDemoCard name="Avatar Sizes" token="bg: semantic/muted · border-radius: 50%">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        {sizes.map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ width: s.px, height: s.px, borderRadius: '50%', background: C.stone200, color: C.stone600, fontWeight: 600, fontSize: s.font, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>HS</div>
            <p style={{ fontSize: 10, color: C.stone400, margin: '4px 0 0' }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: C.stone200, color: C.stone600, fontWeight: 600, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i ? -8 : 0, border: `2px solid ${C.white}` }}>HS</div>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxMonospaceTextDemo() {
  const items = ['stone-500', '#78716c', 'inv_8f2a91'];
  return (
    <CoyaxDemoCard name="Monospace Text" token="font: monospace · bg: semantic/muted">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((t) => (
          <code key={t} style={{ background: C.stone100, borderRadius: 4, padding: '2px 6px', fontFamily: 'monospace', fontSize: 12, color: C.stone600 }}>{t}</code>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxStepperDemo() {
  const [step, setStep] = useState(1);
  const total = 5;
  return (
    <CoyaxDemoCard name="Stepper" token="bg: semantic/primary when active · step-size: 28px">
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 16, flexWrap: 'wrap' }}>
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          const done = n < step;
          const active = n === step;
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: `2px solid ${active || done ? C.bgPrimary : C.border}`,
                  background: active ? C.bgPrimary : done ? C.bgPrimary : C.white,
                  color: active || done ? C.fgPrimary : C.stone500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {done ? <Check size={14} /> : n}
              </div>
              {i < total - 1 ? <div style={{ width: 32, height: 2, background: done ? C.bgPrimary : C.stone200 }} /> : null}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={() => setStep(Math.max(1, step - 1))} style={{ padding: '6px 12px', borderRadius: 6, border: `1px solid ${C.border}`, background: C.white, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Prev</button>
        <button type="button" onClick={() => setStep(Math.min(total, step + 1))} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: C.bgPrimary, color: C.fgPrimary, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Next</button>
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxStatusFilterBarDemo() {
  const [active, setActive] = useState('All');
  const chips = ['All', 'Pending', 'Approved', 'Rejected'];
  return (
    <CoyaxDemoCard name="Status Filter Bar" token="border: semantic/border · bg: semantic/primary when active">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            style={{
              borderRadius: 6,
              border: `1px solid ${C.border}`,
              padding: '4px 10px',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'inherit',
              background: active === c ? C.bgPrimary : C.white,
              color: active === c ? C.fgPrimary : C.stone500,
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxLabelDemo() {
  return (
    <CoyaxDemoCard name="Label Component" token="text: semantic/foreground">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontSize: 12, color: C.stone600 }}>Default label</span>
        <span style={{ fontSize: 12, color: C.stone600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.warning }} />
          Important label
        </span>
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxMenuItemsDemo() {
  const items = [
    { label: 'Default unselected', selected: false, hover: false, disabled: false },
    { label: 'Default selected', selected: true, hover: false, disabled: false },
    { label: 'Hover unselected', selected: false, hover: true, disabled: false },
    { label: 'Hover selected', selected: true, hover: true, disabled: false },
    { label: 'Disabled unselected', selected: false, hover: false, disabled: true },
    { label: 'Disabled selected', selected: true, hover: false, disabled: true },
  ];
  return (
    <CoyaxDemoCard name="Menu Items" token="bg: color-hover on hover · height: 32px">
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', padding: 4 }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              height: 32,
              padding: '0 12px',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: item.hover ? C.stone100 : 'transparent',
              opacity: item.disabled ? 0.4 : 1,
              color: C.stone700,
            }}
          >
            {item.label}
            {item.selected ? <Check size={14} color={C.stone500} /> : null}
          </div>
        ))}
      </div>
    </CoyaxDemoCard>
  );
}

export function CoyaxNotificationBellDemo() {
  return (
    <CoyaxDemoCard name="Notification Bell" token="color: semantic/foreground · dot: status/error">
      <div style={{ display: 'flex', gap: 32 }}>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Bell size={22} color={C.stone500} />
          <span style={{ fontSize: 10, color: C.stone400, display: 'block', marginTop: 6 }}>Default</span>
        </div>
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Bell size={22} color={C.stone500} />
          <div style={{ position: 'absolute', top: 0, right: -2, width: 8, height: 8, borderRadius: '50%', background: C.destructive, border: `2px solid ${C.white}` }} />
          <span style={{ fontSize: 10, color: C.stone400, display: 'block', marginTop: 6 }}>Active</span>
        </div>
      </div>
    </CoyaxDemoCard>
  );
}

export type CoyaxShowcaseCategory = 'Form Controls' | 'Navigation' | 'Feedback' | 'Data Display';
export type CoyaxComponentFilter = 'All' | CoyaxShowcaseCategory;
export type CoyaxAtomicLayer = 'Atoms' | 'Molecules' | 'Organisms';
export type CoyaxAtomicFilter = 'All' | CoyaxAtomicLayer;
export type CoyaxShowcaseView = 'By Category' | 'By Atomic Layer';

export type CoyaxComponentDemoEntry = {
  id: string;
  name: string;
  category: CoyaxShowcaseCategory;
  layer: CoyaxAtomicLayer;
  wide?: boolean;
  Demo: () => ReactNode;
};

export const COYAX_COMPONENT_SHOWCASE_FILTERS: CoyaxComponentFilter[] = [
  'All',
  'Form Controls',
  'Navigation',
  'Feedback',
  'Data Display',
];

export const COYAX_ATOMIC_LAYER_FILTERS: CoyaxAtomicFilter[] = ['All', 'Atoms', 'Molecules', 'Organisms'];

export const COYAX_ATOMIC_LAYER_EXPLAINERS: Record<CoyaxAtomicLayer, string> = {
  Atoms: 'Single-purpose elements that cannot be broken down further.',
  Molecules: 'Functional units built from two or more atoms.',
  Organisms: 'Complex sections built from molecules and atoms working together.',
};

export const COYAX_COMPONENT_DEMOS: CoyaxComponentDemoEntry[] = [
  { id: 'button', name: 'Button Variants', category: 'Form Controls', layer: 'Organisms', wide: true, Demo: CoyaxButtonDemo },
  { id: 'input', name: 'Input Field States', category: 'Form Controls', layer: 'Molecules', Demo: CoyaxInputDemo },
  { id: 'checkbox', name: 'Checkbox States', category: 'Form Controls', layer: 'Atoms', Demo: CoyaxCheckboxDemo },
  { id: 'switch', name: 'Switch Toggle States', category: 'Form Controls', layer: 'Atoms', Demo: CoyaxSwitchDemo },
  { id: 'radio', name: 'Radio Button States', category: 'Form Controls', layer: 'Atoms', Demo: CoyaxRadioDemo },
  { id: 'select', name: 'Select Dropdown', category: 'Form Controls', layer: 'Molecules', Demo: CoyaxSelectDemo },
  { id: 'search', name: 'Search Input', category: 'Form Controls', layer: 'Molecules', Demo: CoyaxSearchInputDemo },
  { id: 'textarea', name: 'Text Area', category: 'Form Controls', layer: 'Molecules', Demo: CoyaxTextareaDemo },
  { id: 'segmented', name: 'Segmented Control', category: 'Form Controls', layer: 'Molecules', Demo: CoyaxSegmentedControlDemo },
  { id: 'upload', name: 'Upload Button', category: 'Form Controls', layer: 'Molecules', Demo: CoyaxUploadButtonDemo },
  { id: 'sidebar', name: 'Sidebar Full', category: 'Navigation', layer: 'Organisms', wide: true, Demo: CoyaxSidebarDemo },
  { id: 'sidebar-link', name: 'Sidebar Link States', category: 'Navigation', layer: 'Molecules', Demo: CoyaxSidebarLinkDemo },
  { id: 'topbar', name: 'Topbar', category: 'Navigation', layer: 'Organisms', wide: true, Demo: CoyaxTopbarDemo },
  { id: 'tabs-notif', name: 'Tabs Notification Panel', category: 'Navigation', layer: 'Organisms', Demo: CoyaxTabsNotificationDemo },
  { id: 'tabs-dash', name: 'Tabs Dashboard Panel', category: 'Navigation', layer: 'Organisms', wide: true, Demo: CoyaxTabsDashboardDemo },
  { id: 'breadcrumb', name: 'Breadcrumb', category: 'Navigation', layer: 'Molecules', Demo: CoyaxBreadcrumbDemo },
  { id: 'badge', name: 'Badge Variants', category: 'Feedback', layer: 'Atoms', Demo: CoyaxBadgeDemo },
  { id: 'notif-dot', name: 'Notification Dot', category: 'Feedback', layer: 'Atoms', Demo: CoyaxNotificationDotDemo },
  { id: 'progress', name: 'Progress Bar', category: 'Feedback', layer: 'Molecules', Demo: CoyaxProgressBarDemo },
  { id: 'progress-info', name: 'Progress Bar With Info', category: 'Feedback', layer: 'Molecules', Demo: CoyaxProgressBarInfoDemo },
  { id: 'confidence', name: 'Confidence Pill', category: 'Feedback', layer: 'Atoms', Demo: CoyaxConfidencePillDemo },
  { id: 'ai-credit', name: 'AI Credit Pill', category: 'Feedback', layer: 'Atoms', Demo: CoyaxAICreditPillDemo },
  { id: 'tooltip', name: 'Tooltip', category: 'Feedback', layer: 'Molecules', Demo: CoyaxTooltipDemo },
  { id: 'modal', name: 'Modal Types', category: 'Feedback', layer: 'Organisms', wide: true, Demo: CoyaxModalDemo },
  { id: 'avatar', name: 'Avatar Sizes', category: 'Data Display', layer: 'Atoms', Demo: CoyaxAvatarDemo },
  { id: 'mono', name: 'Monospace Text', category: 'Data Display', layer: 'Atoms', Demo: CoyaxMonospaceTextDemo },
  { id: 'stepper', name: 'Stepper', category: 'Data Display', layer: 'Organisms', wide: true, Demo: CoyaxStepperDemo },
  { id: 'status-filter', name: 'Status Filter Bar', category: 'Data Display', layer: 'Molecules', Demo: CoyaxStatusFilterBarDemo },
  { id: 'label', name: 'Label Component', category: 'Data Display', layer: 'Atoms', Demo: CoyaxLabelDemo },
  { id: 'menu', name: 'Menu Items', category: 'Data Display', layer: 'Molecules', Demo: CoyaxMenuItemsDemo },
  { id: 'bell', name: 'Notification Bell', category: 'Data Display', layer: 'Atoms', Demo: CoyaxNotificationBellDemo },
];
