import type { HTMLAttributes } from "react";
import { cx } from "../cx";

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  /** Filled ink state, for an active filter. */
  selected?: boolean;
}

/** Small square-cornered uppercase tag with a hairline border, used for beach vibes ("Surf", "Chill"). */
export function Pill({ selected, className, ...rest }: PillProps) {
  return <span className={cx("bf-pill", selected && "bf-pill--selected", className)} {...rest} />;
}
