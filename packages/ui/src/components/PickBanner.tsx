import type { HTMLAttributes } from "react";
import { cx } from "../cx";
import { BeachCardBody, type Beach } from "./BeachCard";

export interface PickBannerProps extends HTMLAttributes<HTMLElement> {
  beach: Beach;
  /** Sun-coloured eyebrow label. */
  label?: string;
  directionsHref?: string;
}

/** Featured, sun-bordered highlight for the single top recommendation ("Today's pick"). */
export function PickBanner({ beach, label = "Today's pick", directionsHref, className, ...rest }: PickBannerProps) {
  return (
    <section className={cx("bf-pick", className)} {...rest}>
      <div className="bf-pick__label">{label}</div>
      <BeachCardBody beach={beach} directionsHref={directionsHref} />
    </section>
  );
}
