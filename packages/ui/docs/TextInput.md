---
category: Forms
---
# TextInput

Single-line field: 17px value, 10px vertical padding, bottom rule only (`--bf-hairline`, ink on focus). Pass `label` for the 11px uppercase stone label above it; without one, pass `aria-label`. Matches `SelectField` so they line up in a form grid.

```jsx
<TextInput label="Starting from" placeholder="City or address" value={q} onChange={(e) => setQ(e.target.value)} />
```
