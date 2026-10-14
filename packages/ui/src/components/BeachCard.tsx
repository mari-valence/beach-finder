import type { MouseEventHandler } from "react";
import { Card } from "./Card";
import { Pill } from "./Pill";

export interface Beach {
  name: string;
  region: string;
  /** Distance from the searched origin, in km. */
  distance: number;
  blurb: string;
  /** Blended 0–100 match score. */
  score: number;
  /** 1–100: how well-known / visited. */
  popularity: number;
  /** 1–10 vibe score. */
  cool: number;
  vibes: string[];
}

export interface BeachCardProps {
  beach: Beach;
  /** Google Maps (or other) directions link; omit to hide the "Directions →" link. */
  directionsHref?: string;
  as?: "div" | "li" | "article";
  onClick?: MouseEventHandler<HTMLElement>;
}

export function formatKm(km: number) {
  return km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km).toLocaleString()} km`;
}

/** The content of one beach result: name, region · distance, blurb, then a meta row with score, popularity, cool, vibe pills, directions. */
export function BeachCardBody({ beach, directionsHref }: Pick<BeachCardProps, "beach" | "directionsHref">) {
  return (
    <>
      <h3 className="bf-beach__name">{beach.name}</h3>
      <div className="bf-beach__region">{beach.region} · {formatKm(beach.distance)} away</div>
      <p className="bf-beach__blurb">{beach.blurb}</p>
      <div className="bf-beach__meta">
        <span className="bf-beach__score">⭐ {beach.score}</span>
        <span>🔥 {beach.popularity} popular</span>
        <span>😎 {beach.cool}/10 cool</span>
        {beach.vibes.map((v) => <Pill key={v}>{v}</Pill>)}
        {directionsHref && (
          <a className="bf-beach__directions" href={directionsHref} target="_blank" rel="noopener">Directions →</a>
        )}
      </div>
    </>
  );
}

/** A beach search result in a Card. Clickable when `onClick` is set (e.g. to focus the map). */
export function BeachCard({ beach, directionsHref, as, onClick }: BeachCardProps) {
  return (
    <Card as={as} interactive={!!onClick} onClick={onClick}>
      <BeachCardBody beach={beach} directionsHref={directionsHref} />
    </Card>
  );
}
