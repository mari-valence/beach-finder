# Beach Finder

Frontend-only site that recommends the best, most popular and coolest beach for a day out near a location you give it.

- Search by city/address (OpenStreetMap Nominatim) or use your browser location
- Filter by distance and vibe (chill, party, surf, snorkel, scenic, …)
- Ranks beaches by a blend of popularity, coolness and closeness, with a "Today's pick"
- Map view (Leaflet) and one-click Google Maps directions

## Run locally

No build step. From this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

Beach data lives in `beaches.js` — add entries there to expand coverage.
