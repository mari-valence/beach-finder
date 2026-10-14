import type { KeyboardEvent, MouseEventHandler, ReactNode } from "react";
import { cx } from "../cx";

export interface Beach {
  name: string;
  region: string;
  /** Distance from the searched origin, in km. */
  distance: number;
  blurb: string;
  /** Blended 0–100 match score. */
  score: number;
  /** 1–100: how well-known / visited. Shown as the "Crowds" stat. */
  popularity: number;
  /** 1–10 vibe score. */
  cool: number;
  vibes: string[];
  /** Whether loungers/chairs can be rented on the beach. */
  chairRental: boolean;
  /** Photo URL. Without one, a warm tonal placeholder is shown. */
  image?: string;
}

export interface BeachCardProps {
  beach: Beach;
  /** 1-based position in the results; shown as "02" on the photo. */
  rank?: number;
  /** Google Maps (or other) directions link; omit to hide the "Directions" link. */
  directionsHref?: string;
  as?: "div" | "li" | "article";
  /** Makes the whole card clickable (e.g. to focus the map). */
  onClick?: MouseEventHandler<HTMLElement>;
}

export function formatKm(km: number) {
  return km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km).toLocaleString()} km`;
}

/** Popularity (1–100) as a crowd level. */
export function crowdLevel(popularity: number) {
  return popularity >= 88 ? "Busy" : popularity >= 72 ? "Moderate" : "Quiet";
}

const titleCase = (s: string) => s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

export function BeachPhoto({ beach, className, children }: { beach: Beach; className?: string; children?: ReactNode }) {
  return (
    <div className={cx("bf-photo", className)}>
      {beach.image && <img src={beach.image} alt={beach.name} loading="lazy" />}
      {children}
    </div>
  );
}

/** The text of one beach result: name with score, "region · km", blurb, then the vibe line. */
export function BeachCardBody({ beach, directionsHref }: Pick<BeachCardProps, "beach" | "directionsHref">) {
  return (
    <>
      <div className="bf-beach__head">
        <h3 className="bf-beach__name">{beach.name}</h3>
        <span className="bf-beach__score" aria-label={`Score ${beach.score}`}>{beach.score}</span>
      </div>
      <div className="bf-beach__meta">{beach.region} · {formatKm(beach.distance)}</div>
      <p className="bf-beach__blurb">{beach.blurb}</p>
      <div className="bf-beach__foot">
        <span className="bf-beach__vibes">{beach.vibes.map(titleCase).join("  ·  ")}</span>
        {directionsHref && (
          <a className="bf-button bf-button--text bf-beach__directions" href={directionsHref} target="_blank" rel="noopener">Directions</a>
        )}
      </div>
    </>
  );
}

/** A beach search result: 4:5 photo with rank, then name, score, meta, blurb and vibes. Clickable when `onClick` is set. */
export function BeachCard({ beach, rank, directionsHref, as: Tag = "div", onClick }: BeachCardProps) {
  const onKeyDown = onClick
    ? (e: KeyboardEvent<HTMLElement>) => {
        if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          (e.currentTarget as HTMLElement).click();
        }
      }
    : undefined;
  return (
    <Tag
      className={cx("bf-beach", onClick && "bf-beach--interactive")}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={onClick ? 0 : undefined}
    >
      <BeachPhoto beach={beach} className="bf-beach__photo">
        {rank != null && <span className="bf-beach__rank">{String(rank).padStart(2, "0")}</span>}
      </BeachPhoto>
      <BeachCardBody beach={beach} directionsHref={directionsHref} />
    </Tag>
  );
}
