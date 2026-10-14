import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  /** Small uppercase line above the title, e.g. the date and conditions. */
  eyebrow?: ReactNode;
  /** Full-bleed background photo URL. Falls back to a dark ink wash. */
  image?: string;
  /** Wordmark at the top left. Default "Beach Finder". */
  logo?: ReactNode;
  /** Nav links at the top right (plain `<a>` elements). */
  nav?: ReactNode;
  /** Search bar: sits bottom-aligned and overlaps the next section by 44px. */
  children?: ReactNode;
}

/** Full-bleed photographic page header: nav bar, eyebrow and display headline bottom-left, search overlapping below. */
export function Hero({ title, eyebrow, image, logo = "Beach Finder", nav, children, className, ...rest }: HeroProps) {
  return (
    <header className={cx("bf-hero", className)} {...rest}>
      {image && <div className="bf-hero__bg"><img src={image} alt="" /></div>}
      <nav className="bf-hero__nav">
        <div className="bf-hero__logo">{logo}</div>
        {nav && <div className="bf-hero__links">{nav}</div>}
      </nav>
      <div className="bf-hero__copy">
        {eyebrow && <div className="bf-hero__eyebrow bf-eyebrow">{eyebrow}</div>}
        <h1 className="bf-hero__title">{title}</h1>
      </div>
      {children && <div className="bf-hero__slot">{children}</div>}
    </header>
  );
}
