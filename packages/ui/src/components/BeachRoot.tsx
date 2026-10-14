import type { HTMLAttributes } from "react";
import { cx } from "../cx";

export interface BeachRootProps extends HTMLAttributes<HTMLDivElement> {}

/** Root wrapper: applies the system font, ink colour and sand background. Wrap every page/screen in it. */
export function BeachRoot({ className, ...rest }: BeachRootProps) {
  return <div className={cx("bf-root", className)} {...rest} />;
}
