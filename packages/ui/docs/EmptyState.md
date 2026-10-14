---
category: Display
---
# EmptyState

Centred message in a hairline-bordered box (72×32px padding): a Cormorant 300 36px `title`, stone body copy (`children`, max-width 360px) and an optional `action`, usually a text `Button`. Use for no results, fallback results and the pre-search state.

```jsx
<EmptyState title="No beaches match." action={<Button variant="text" onClick={reset}>Reset filters</Button>}>
  Try widening the distance or choosing a different vibe.
</EmptyState>
```
