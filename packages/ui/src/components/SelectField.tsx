import type { SelectHTMLAttributes } from "react";
import { cx } from "../cx";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  /** Visible label, e.g. "Within" or "Sort". */
  label: string;
  options: SelectOption[];
  /** `stacked` (default): uppercase label above a ruled field. `inline`: "Sort: Best match ⌄" in running text. */
  variant?: "stacked" | "inline";
}

/** Labelled native dropdown with a stone "⌄" caret. */
export function SelectField({ label, options, variant = "stacked", className, ...rest }: SelectFieldProps) {
  const inline = variant === "inline";
  return (
    <label className={cx("bf-field", inline && "bf-field--inline", className)}>
      <span className={cx("bf-field__label", !inline && "bf-label")}>{inline ? `${label}:` : label}</span>
      <span className="bf-field__control">
        <select {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="bf-caret" aria-hidden="true">⌄</span>
      </span>
    </label>
  );
}
