import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BeachRoot, Hero, TextInput, Button, SelectField, PickBanner, BeachCard, EmptyState, formatKm,
} from "@beach-finder/ui";
import { BEACHES } from "./beaches.js";

// --- Helpers ---
function distanceKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Blend popularity, coolness and closeness into one 0–100 score.
function score(beach) {
  const closeness = 1 / (1 + beach.distance / 100);
  return Math.round(100 * (0.45 * (beach.popularity / 100) + 0.3 * (beach.cool / 10) + 0.25 * closeness));
}

function directionsUrl(beach, origin) {
  const dest = `${beach.lat},${beach.lng}`;
  const from = origin ? `&origin=${origin.lat},${origin.lng}` : "";
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}${from}`;
}

const RADIUS_OPTIONS = [
  { value: "50", label: "50 km" },
  { value: "150", label: "150 km" },
  { value: "500", label: "500 km" },
  { value: "2000", label: "2,000 km" },
  { value: "Infinity", label: "Anywhere" },
];
const VIBE_OPTIONS = [
  { value: "", label: "Any" },
  ...["chill", "party", "surf", "snorkel", "scenic", "family", "people-watching", "wildlife"].map((v) => ({
    value: v, label: v[0].toUpperCase() + v.slice(1),
  })),
];
const SORT_OPTIONS = [
  { value: "best", label: "Best match" },
  { value: "distance", label: "Closest" },
  { value: "popularity", label: "Most popular" },
  { value: "cool", label: "Coolest" },
];
const sorters = {
  best: (a, b) => b.score - a.score,
  distance: (a, b) => a.distance - b.distance,
  popularity: (a, b) => b.popularity - a.popularity,
  cool: (a, b) => b.cool - a.cool,
};

function rank(origin, radius, vibe, sort) {
  const all = BEACHES.map((b) => {
    const withDist = { ...b, distance: distanceKm(origin, b) };
    return { ...withDist, score: score(withDist) };
  });
  let list = all.filter((b) => b.distance <= radius && (!vibe || b.vibes.includes(vibe)));
  let fallback = false;
  if (list.length === 0) {
    // Nothing nearby: show the closest beaches that match the vibe instead.
    fallback = true;
    list = all.filter((b) => !vibe || b.vibes.includes(vibe)).sort((a, b) => a.distance - b.distance).slice(0, 5);
  }
  return { list: list.sort(sorters[sort]), fallback };
}

const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
const countWord = (n) => NUMBER_WORDS[n] ?? n.toLocaleString();

function todayLine() {
  const d = new Date();
  const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
  return `${weekday}, ${d.toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`;
}

// --- Map (Leaflet, loaded globally from the CDN) ---
const INK = "#1d1b18";
const ROSEWOOD = "#8a4a3c";

function useBeachMap(origin, list) {
  const el = useRef(null);
  const map = useRef(null);
  const markers = useRef(null);
  const byName = useRef(new Map());

  useEffect(() => {
    map.current = L.map(el.current, { scrollWheelZoom: false }).setView([25, -40], 2);
    // OSM tiles, desaturated to warm monochrome in styles.css (.map .leaflet-tile-pane).
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current);
    markers.current = L.layerGroup().addTo(map.current);
    return () => map.current.remove();
  }, []);

  useEffect(() => {
    if (!origin) return;
    markers.current.clearLayers();
    byName.current.clear();
    markers.current.addLayer(
      L.circleMarker([origin.lat, origin.lng], {
        radius: 7, color: ROSEWOOD, weight: 2, fillColor: ROSEWOOD, fillOpacity: 1,
      }).bindPopup("You are here"),
    );
    const points = [[origin.lat, origin.lng]];
    list.forEach((b, i) => {
      const m = L.circleMarker([b.lat, b.lng], {
        radius: 6, color: INK, weight: 1.5, fillColor: "#fbf9f5", fillOpacity: 1,
      }).bindPopup(`<strong>${String(i + 1).padStart(2, "0")} · ${b.name}</strong><br>${formatKm(b.distance)} · Score ${b.score}`);
      markers.current.addLayer(m);
      byName.current.set(b.name, m);
      points.push([b.lat, b.lng]);
    });
    map.current.fitBounds(points, { padding: [48, 48], maxZoom: 11 });
  }, [origin, list]);

  function focus(b) {
    el.current.scrollIntoView({ behavior: "smooth", block: "center" });
    map.current.setView([b.lat, b.lng], 12);
    byName.current.get(b.name)?.openPopup();
  }

  return { el, focus };
}

function App() {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState(null);
  const [originLabel, setOriginLabel] = useState("");
  const [status, setStatus] = useState("");
  const [radius, setRadius] = useState("150");
  const [vibe, setVibe] = useState("");
  const [sort, setSort] = useState("best");

  const { list, fallback } = useMemo(
    () => (origin ? rank(origin, Number(radius), vibe, sort) : { list: [], fallback: false }),
    [origin, radius, vibe, sort],
  );
  const { el: mapEl, focus } = useBeachMap(origin, list);

  useEffect(() => {
    if (origin) setStatus(`${list.length} beach${list.length === 1 ? "" : "es"} near ${originLabel}`);
  }, [origin, originLabel, list]);

  function setPlace(lat, lng, label) {
    setOrigin({ lat, lng });
    setOriginLabel(label);
  }

  async function onSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return setStatus("Type a city or address first.");
    setStatus("Looking up that location…");
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!data.length) return setStatus(`Couldn't find "${q}". Try a different place name.`);
      setPlace(Number(data[0].lat), Number(data[0].lon), data[0].display_name.split(",").slice(0, 2).join(","));
    } catch {
      setStatus("Location lookup failed. Check your connection and try again.");
    }
  }

  function onGeo() {
    if (!navigator.geolocation) return setStatus("Your browser doesn't support location.");
    setStatus("Getting your location…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setQuery("");
        setPlace(pos.coords.latitude, pos.coords.longitude, "your location");
      },
      () => setStatus("Couldn't get your location. Type a city instead."),
    );
  }

  function resetFilters() {
    setRadius("150");
    setVibe("");
    setSort("best");
  }

  const top = list[0];
  const rest = list.slice(1);
  const radiusLabel = RADIUS_OPTIONS.find((o) => o.value === radius)?.label;

  return (
    <BeachRoot>
      <Hero
        eyebrow={origin ? `${todayLine()} · Near ${originLabel}` : todayLine()}
        title="Find the beach that suits the day."
        nav={<><a href="#results">Beaches</a><a href="#map">Map</a></>}
      >
        <form className="search-bar" onSubmit={onSearch}>
          <TextInput
            label="Starting from"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="City or address"
            autoComplete="off"
          />
          <SelectField label="Within" options={RADIUS_OPTIONS} value={radius} onChange={(e) => setRadius(e.target.value)} />
          <SelectField label="Vibe" options={VIBE_OPTIONS} value={vibe} onChange={(e) => setVibe(e.target.value)} />
          <Button type="submit">Search</Button>
        </form>
      </Hero>

      <main className="page">
        <div className="status-row">
          <p className="status" role="status">{status}</p>
          {origin && <Button variant="text" onClick={onGeo}>Use my location</Button>}
        </div>

        {!origin && (
          <section className="section">
            <EmptyState
              title="Start with a place."
              action={<Button variant="text" onClick={onGeo}>Use my location</Button>}
            >
              Type a town or address above and we'll rank the beaches within reach by crowds, character and distance.
            </EmptyState>
          </section>
        )}

        {origin && list.length === 0 && (
          <section className="section">
            <EmptyState title="No beaches match." action={<Button variant="text" onClick={resetFilters}>Reset filters</Button>}>
              Try widening the distance or choosing a different vibe.
            </EmptyState>
          </section>
        )}

        {top && (
          <PickBanner
            className="section"
            layout="feature"
            beach={top}
            label={fallback ? "Closest great beach" : "Today's pick"}
            directionsHref={directionsUrl(top, origin)}
            onViewMap={() => focus(top)}
          />
        )}

        {origin && list.length > 0 && (
          <section className="section results" id="results">
            {fallback && (
              <EmptyState
                className="fallback"
                title={`Nothing within ${radiusLabel}.`}
                action={<Button variant="text" onClick={() => setRadius("Infinity")}>Search anywhere</Button>}
              >
                These are the closest beaches that match instead.
              </EmptyState>
            )}
            <div className="results__head">
              <div>
                <div className="bf-eyebrow results__eyebrow">{fallback ? "Next closest" : "Also within reach"}</div>
                <h2 className="results__title">
                  {rest.length ? `${countWord(rest.length)} more beach${rest.length === 1 ? "" : "es"}` : "Nothing else nearby"}
                </h2>
              </div>
              <div className="results__filters">
                <SelectField variant="inline" label="Sort" options={SORT_OPTIONS} value={sort} onChange={(e) => setSort(e.target.value)} />
                <SelectField variant="inline" label="Vibe" options={VIBE_OPTIONS} value={vibe} onChange={(e) => setVibe(e.target.value)} />
                <SelectField variant="inline" label="Within" options={RADIUS_OPTIONS} value={radius} onChange={(e) => setRadius(e.target.value)} />
              </div>
            </div>
            <ol className="results__grid">
              {rest.map((b, i) => (
                <BeachCard
                  key={b.name}
                  as="li"
                  rank={i + 2}
                  beach={b}
                  onClick={(e) => { if (!e.target.closest("a")) focus(b); }}
                />
              ))}
            </ol>
          </section>
        )}

        <section className="section map-section" id="map">
          <div ref={mapEl} className="map" />
        </section>
      </main>

      <footer className="footer">
        <span className="footer__logo">Beach Finder</span>
        <span>
          Scores blend popularity, character and distance. Geocoding by{" "}
          <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noopener">OpenStreetMap Nominatim</a>.
        </span>
      </footer>
    </BeachRoot>
  );
}

createRoot(document.getElementById("root")).render(<App />);
