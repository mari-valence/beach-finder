import type { HTMLAttributes } from "react";
import { cx } from "../cx";

export interface BeachRootProps extends HTMLAttributes<HTMLDivElement> {}

/** Root wrapper: applies Hanken Grotesk, ink text and the ivory page background. Wrap every page/screen in it. */
export function BeachRoot({ className, ...rest }: BeachRootProps) {
  return <div className={cx("bf-root", className)} {...rest} />;
}
