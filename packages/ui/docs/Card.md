---
category: Surfaces
---
# Card

Paper (`--bf-paper`) surface with a 1px `--bf-hairline-soft` border, 2px radius and 32px padding, no shadow. For panels and grouped content. Set `interactive` when the whole card is clickable (pointer cursor, border darkens to ink on hover). Use `as="li"` inside lists.

```jsx
<Card interactive onClick={open}>
  <div className="bf-label" style={{ marginBottom: 12 }}>Saved search</div>
  <p style={{ margin: 0 }}>Surf beaches within 150 km of Truro</p>
</Card>
```
