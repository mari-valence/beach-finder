---
category: Forms
---
# SelectField

Labelled native `<select>` with a stone "⌄" caret. `variant="stacked"` (default) is a form field: an 11px uppercase stone label above a 17px value with a bottom rule that turns ink on focus. `variant="inline"` reads as running text ("Sort: Best match ⌄", 14px, no rule). Use it for the filters in a results header, spaced 40px apart. Options are `{ value, label }`, and `value`/`defaultValue`/`onChange` work as usual.

```jsx
<SelectField label="Within" value={radius} onChange={(e) => setRadius(e.target.value)}
  options={[{ value: "50", label: "50 km" }, { value: "150", label: "150 km" }]} />
<SelectField variant="inline" label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}
  options={[{ value: "best", label: "Best match" }, { value: "distance", label: "Closest" }]} />
```
