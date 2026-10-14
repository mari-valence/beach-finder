import type { HTMLAttributes } from "react";
import { cx } from "../cx";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Element to render as. Use `li` inside lists. */
  as?: "div" | "li" | "article" | "section";
  /** Adds pointer cursor and a hover lift; set when the whole card is clickable. */
  interactive?: boolean;
}

/** White rounded surface with a hairline border — the base container for list items and panels. */
export function Card({ as: Tag = "div", interactive, className, ...rest }: CardProps) {
  return <Tag className={cx("bf-card", interactive && "bf-card--interactive", className)} {...rest} />;
}
