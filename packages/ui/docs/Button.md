---
category: Actions
---
# Button

Sea-blue action button. Use **one `primary`** per action group for the main call to action and `variant="secondary"` (white, sea outline) for the alternatives next to it. Defaults to `type="button"`; pass `type="submit"` inside forms.

```jsx
<Button type="submit">Find beaches</Button>
<Button variant="secondary" onClick={useLocation}>📍 Use my location</Button>
```
