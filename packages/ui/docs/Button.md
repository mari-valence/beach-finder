---
category: Actions
---
# Button

Uppercase editorial button: 12px, .2em tracking, 18×36px padding, 2px radius. `primary` (default) is solid ink and turns rosewood on hover; `variant="secondary"` is a 1px ink outline that fills with ink on hover; `variant="text"` is an underlined uppercase link ("View on map", "Reset filters"). Disabled buttons go `#E4DDD1` with stone text. Pass `href` to render it as a link (e.g. directions). Use one primary per action group. No icons or emoji in labels.

```jsx
<Button href={directionsUrl} target="_blank">Get directions</Button>
<Button variant="secondary">Save beach</Button>
<Button variant="text" onClick={focusMap}>View on map</Button>
```
