import type { SelectHTMLAttributes } from "react";
import { cx } from "../cx";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  /** Visible label rendered before the select, e.g. "Within" or "Sort by". */
  label: string;
  options: SelectOption[];
}

/** Inline labelled dropdown used for compact filters ("Within 150 km", "Vibe: Surf"). */
export function SelectField({ label, options, className, ...rest }: SelectFieldProps) {
  return (
    <label className={cx("bf-select-field", className)}>
      {label}
      <select {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
