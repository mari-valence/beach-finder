import type { HTMLAttributes, MouseEventHandler } from "react";
import { cx } from "../cx";
import { BeachPhoto, crowdLevel, formatKm, type Beach } from "./BeachCard";

export interface PickBannerProps extends HTMLAttributes<HTMLElement> {
  beach: Beach;
  /** Rosewood eyebrow label. Default "Today's pick". */
  label?: string;
  /** Renders the primary "Get directions" button. */
  directionsHref?: string;
  /** Renders a "View on map" text link next to the directions button. */
  onViewMap?: MouseEventHandler<HTMLButtonElement>;
  /** `card` (default): photo | content on a paper card. `feature`: the large 7:5 layout used at the top of the results page. */
  layout?: "card" | "feature";
}

/** The single top recommendation: photo, rosewood eyebrow, serif name, meta, blurb, a four-stat row and actions. */
export function PickBanner({ beach, label = "Today's pick", directionsHref, onViewMap, layout = "card", className, ...rest }: PickBannerProps) {
  const feature = layout === "feature";
  const Name = feature ? "h2" : "h3";
  const stats: [string, string][] = [
    ["Score", String(beach.score)],
    ["Crowds", crowdLevel(beach.popularity)],
    ["Cool factor", `${beach.cool}/10`],
    ["Chair rental", beach.chairRental ? "Yes" : "No"],
  ];
  return (
    <section className={cx("bf-pick", feature && "bf-pick--feature", className)} {...rest}>
      <BeachPhoto beach={beach} className="bf-pick__photo" />
      <div className="bf-pick__body">
        <div className="bf-pick__label bf-eyebrow">{label}</div>
        <Name className="bf-pick__name">{beach.name}</Name>
        <div className="bf-pick__meta">{beach.region} · {formatKm(beach.distance)} away</div>
        <p className="bf-pick__blurb">{beach.blurb}</p>
        <dl className="bf-stats">
          {stats.map(([k, v]) => (
            <div key={k}>
              <dt className="bf-label">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        {(directionsHref || onViewMap) && (
          <div className="bf-pick__actions">
            {directionsHref && (
              <a className="bf-button" href={directionsHref} target="_blank" rel="noopener">Get directions</a>
            )}
            {onViewMap && (
              <button type="button" className="bf-button bf-button--text" onClick={onViewMap}>View on map</button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
