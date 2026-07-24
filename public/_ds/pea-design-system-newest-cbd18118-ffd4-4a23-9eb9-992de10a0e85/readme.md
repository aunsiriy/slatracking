
# PEA Design System

Bundled distribution of `@pea-ds/react@0.1.1` for PEA (การไฟฟ้าส่วนภูมิภาค). Load `styles.css` and `pea-ds-react.bundle.js`; set `data-brand="pea"` and `data-theme="light|dark|high-contrast"` on `<html>` — components are unstyled without those two attributes.

```html
<html data-brand="pea" data-theme="light">
<link rel="stylesheet" href="styles.css">
<script src="pea-ds-react.bundle.js"></script>
```

## Components

Each lives in `components/<Name>/` with `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, `<Name>.html` (variant card).

- Avatar
- Badge
- Button
- ButtonGroup
- Checkbox
- Dot
- EmptyState
- FeaturedIcon
- FeaturedIconOutline
- InputField
- LoadingIcon
- Pagination
- PaymentMethodIcon
- Radio
- Tag
- Textarea
- Toggle
- Tooltip

## Tokens

`tokens/primitive.css`, `tokens/semantic-light.css`, `tokens/semantic-dark.css`, `tokens/semantic-high-contrast.css`, `tokens/tokens.css`, `tokens/typography.css` — all `@import`ed from `styles.css`. ~1700 CSS custom properties, names preserved verbatim from upstream `@pea-ds/base` (`--pea-*`), plus a small set of Tailwind-internal utility tokens (`--tw-*`, `--animate-*`, `--default-*`) used only inside the bundled component CSS.

## Icons

Bundled inside `styles.css`/`pea-ds-react.bundle.css` — no external CDN. Reference by kebab-case name via a component's icon prop (`<Button leadingIcon="search">`) or `<span className="icon search" />`.

## Source

Provided as `uploads/PEA Design System/` (initial import) and `uploads/PEA Design System 2/` (update), a bundled export of the published `@pea-ds/react@0.1.1` package with its Storybook-derived preview decorators. No Figma or GitHub source was attached — all values were taken from this bundle.
