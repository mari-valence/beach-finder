import type { InputHTMLAttributes } from "react";
import { cx } from "../cx";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

/** Single-line text input with the system's rounded border. Pass `aria-label` when no visible label exists. */
export function TextInput({ className, type = "text", ...rest }: TextInputProps) {
  return <input type={type} className={cx("bf-input", className)} {...rest} />;
}
