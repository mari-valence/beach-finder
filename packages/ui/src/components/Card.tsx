import type { HTMLAttributes } from "react";
import { cx } from "../cx";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Element to render as. Use `li` inside lists. */
  as?: "div" | "li" | "article" | "section";
  /** Adds a pointer cursor and an ink border on hover; set when the whole card is clickable. */
  interactive?: boolean;
}

/** Paper surface with a hairline border and 32px padding, no shadow. For panels and grouped content. */
export function Card({ as: Tag = "div", interactive, className, ...rest }: CardProps) {
  return <Tag className={cx("bf-card", interactive && "bf-card--interactive", className)} {...rest} />;
}
