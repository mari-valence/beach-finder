import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cx } from "../cx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` is the solid ink call to action; `secondary` is the ink outline; `text` is an underlined uppercase link. */
  variant?: "primary" | "secondary" | "text";
  /** Renders an `<a>` with the button styling instead of a `<button>` (e.g. "Get directions"). */
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
}

/** Uppercase editorial button. Use one `primary` per action group; `secondary` or `text` for the alternatives. */
export function Button({ variant = "primary", className, type = "button", href, target, rel, ...rest }: ButtonProps) {
  const cls = cx("bf-button", variant !== "primary" && `bf-button--${variant}`, className);
  if (href) {
    const { disabled, ...anchorRest } = rest;
    return <a className={cls} href={href} target={target} rel={rel} {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }
  return <button type={type} className={cls} {...rest} />;
}
