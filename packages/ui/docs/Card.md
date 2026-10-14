---
category: Surfaces
---
# Card

White surface, 12px radius, hairline border, 14×16px padding — the base container for list rows and panels. Set `interactive` when the whole card is clickable (adds a pointer cursor and a 1px hover lift). Use `as="li"` inside `<ol>`/`<ul>`.

```jsx
<Card interactive onClick={open}>
  <h3 style={{ margin: 0 }}>Saved search</h3>
  <p>Surf beaches within 150 km of San Diego</p>
</Card>
```
