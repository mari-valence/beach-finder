import type { HTMLAttributes } from "react";
import { cx } from "../cx";

export interface EmptyStateProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "li" | "p";
}

/** Centred muted message for empty or fallback results. */
export function EmptyState({ as: Tag = "div", className, ...rest }: EmptyStateProps) {
  return <Tag className={cx("bf-empty", className)} {...rest} />;
}
