import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  tagline?: ReactNode;
  /** Search form, filters, status — rendered centred under the tagline. */
  children?: ReactNode;
}

/** Full-width page header with the sky-to-sand gradient. Put the main search UI in `children`. */
export function Hero({ title, tagline, children, className, ...rest }: HeroProps) {
  return (
    <header className={cx("bf-hero", className)} {...rest}>
      <h1 className="bf-hero__title">{title}</h1>
      {tagline && <p className="bf-hero__tagline">{tagline}</p>}
      {children}
    </header>
  );
}
