import { useId, type InputHTMLAttributes } from "react";
import { cx } from "../cx";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Small uppercase label above the field. Without it, pass `aria-label`. */
  label?: string;
}

/** Single-line field with a bottom rule that darkens to ink on focus. */
export function TextInput({ label, className, type = "text", id, ...rest }: TextInputProps) {
  const autoId = useId();
  const input = <input type={type} id={id ?? autoId} className={cx("bf-input", !label && className)} {...rest} />;
  if (!label) return input;
  return (
    <div className={cx("bf-field", className)}>
      <label className="bf-field__label bf-label" htmlFor={id ?? autoId}>{label}</label>
      {input}
    </div>
  );
}
