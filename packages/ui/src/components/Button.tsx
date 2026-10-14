import type { ButtonHTMLAttributes } from "react";
import { cx } from "../cx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` is the solid sea-blue call to action; `secondary` is the outlined alternative. */
  variant?: "primary" | "secondary";
}

/** Sea-blue action button. Use one `primary` per action group, `secondary` for alternatives. */
export function Button({ variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={cx("bf-button", variant === "secondary" && "bf-button--secondary", className)} {...rest} />;
}
