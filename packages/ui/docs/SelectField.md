---
category: Forms
---
# SelectField

Compact inline dropdown with its label rendered before it ("Within [150 km ▾]"). Used for filter rows — lay several out in a centred, wrapping flex row with a 16px gap. Options are `{ value, label }` objects; it is a controlled/uncontrolled native `<select>`, so `value`/`defaultValue`/`onChange` work as usual.

```jsx
<SelectField label="Sort by" value={sort} onChange={(e) => setSort(e.target.value)}
  options={[{ value: "best", label: "Best match" }, { value: "distance", label: "Closest" }]} />
```
