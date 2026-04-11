# CWPC Design System (React)

React components aligned with the **CWPC** marketing site and [`Design-system_temp`](https://www.figma.com/design/2bE1dja5Ul5JrXGhvBgE23/Design-system_temp) structure. Styling uses **CSS variables** in `src/styles/tokens.css` — swap values to match your exported Figma variables.

## Setup

```bash
npm install
npm run dev    # preview kitchen sink
npm run build
```

## Components

| Component        | Import        | Notes |
|-----------------|---------------|--------|
| SocialButton    | `SocialButton` | `network`: facebook, x, linkedin, youtube, instagram, generic |
| Card (+ subparts) | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Composable card |
| MenuItem        | `MenuItem`    | `destructive` variant |
| Checkbox        | `Checkbox`    | Controlled: `checked`, `onChange` |
| RadioGroup/Item | `RadioGroup`, `RadioItem` | Controlled |
| Switch          | `Switch`      | `role="switch"` |
| TextArea        | `TextArea`    | `label`, `hint`, `error` |
| TabBar          | `TabBar`      | Arrow/Home/End keyboard; wire panels with `aria-controls` ids |
| ButtonGroup     | `ButtonGroup` | `vertical`, `gap` |
| Link            | `Link`        | `variant`: default, subtle, inline |
| Breadcrumb      | `Breadcrumb`  | `items: { label, href? }[]` |
| Tag             | `Tag`         | `onRemove`, `variant` |
| Loader          | `Loader`      | `role="status"` |
| Badge           | `Badge`       | variants: primary, success, warning, danger, info |
| ProgressBar     | `ProgressBar` | `value` 0–`max` |
| ProgressCircle  | `ProgressCircle` | SVG ring + optional `showValue` |
| Table           | `Table`, `Tr`, `Th`, `Td` | `numeric` on cells, `striped` on table |

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Checkbox,
  TabBar,
} from "./components";
```

## Tokens

**`src/styles/tokens.css`** maps Figma variables from **Design-system_temp** (e.g. `--ds-surface-information-default: #0d72ff`, `--ds-surface-primary-default: #ff6701`, pill buttons `50px`, field radius `4px`, Work Sans scales). Re-export from Figma as you refine variables.

## Next steps

- Add your existing **Button** component and reuse inside **ButtonGroup**.
- Connect **TabBar** tab ids to visible panels (`role="tabpanel"`, `id={\`${id}-panel-${tabId}\`}`).
- Optional: Storybook for isolated docs.
