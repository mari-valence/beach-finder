import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  as?: "div" | "li" | "section";
  /** Display-serif headline, e.g. "No beaches match." */
  title?: ReactNode;
  /** Usually a `<Button variant="text">`, e.g. "Reset filters". */
  action?: ReactNode;
}

/** Centred, hairline-bordered message for empty or fallback results. `children` is the stone body copy. */
export function EmptyState({ as: Tag = "div", title, action, children, className, ...rest }: EmptyStateProps) {
  return (
    <Tag className={cx("bf-empty", className)} {...rest}>
      {title && <div className="bf-empty__title">{title}</div>}
      {children && <p className="bf-empty__body">{children}</p>}
      {action && <div className="bf-empty__action">{action}</div>}
    </Tag>
  );
}
