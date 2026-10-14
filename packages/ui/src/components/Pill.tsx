import type { HTMLAttributes } from "react";
import { cx } from "../cx";

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {}

/** Small rounded tag in sea tint, used for beach vibes ("surf", "chill"). */
export function Pill({ className, ...rest }: PillProps) {
  return <span className={cx("bf-pill", className)} {...rest} />;
}
