---
category: Forms
---
# TextInput

Single-line text field with the system's 10px radius and hairline border. There is no built-in label: pass `aria-label` (or wrap in your own `<label>`). In a search row, let it grow with `style={{ flex: "1 1 260px" }}` next to its `Button`s.

```jsx
<TextInput placeholder="City or address, e.g. Los Angeles" aria-label="City or address" value={q} onChange={(e) => setQ(e.target.value)} />
```
