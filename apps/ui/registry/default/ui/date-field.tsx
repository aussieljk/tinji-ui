"use client";

import * as React from "react";
import { cn } from "@/registry/default/lib/utils";

type Segment = "day" | "month" | "year";

export type DateFieldValue = {
  day: string;
  month: string;
  year: string;
};

const emptyValue: DateFieldValue = { day: "", month: "", year: "" };

const segmentConfig: Record<
  Segment,
  { max: number; length: number; placeholder: string; label: string }
> = {
  day: { max: 31, length: 2, placeholder: "dd", label: "Day" },
  month: { max: 12, length: 2, placeholder: "mm", label: "Month" },
  year: { max: 9999, length: 4, placeholder: "yyyy", label: "Year" },
};

const order: Segment[] = ["day", "month", "year"];

export type DateFieldProps = Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue"
> & {
  value?: DateFieldValue;
  defaultValue?: DateFieldValue;
  onValueChange?: (value: DateFieldValue) => void;
  disabled?: boolean;
};

export function DateField({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  "aria-label": ariaLabel,
  ...props
}: DateFieldProps): React.ReactElement {
  const [uncontrolled, setUncontrolled] = React.useState<DateFieldValue>(
    defaultValue ?? emptyValue,
  );
  const value = valueProp ?? uncontrolled;
  const refs = React.useRef<Record<Segment, HTMLInputElement | null>>({
    day: null,
    month: null,
    year: null,
  });

  const setValue = (next: DateFieldValue) => {
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const focusSegment = (segment: Segment) => {
    const el = refs.current[segment];
    el?.focus();
    el?.select();
  };

  const handleChange = (segment: Segment, raw: string) => {
    const config = segmentConfig[segment];
    const digits = raw.replace(/\D/g, "").slice(0, config.length);
    setValue({ ...value, [segment]: digits });

    if (digits.length === config.length) {
      const index = order.indexOf(segment);
      const nextSegment = order[index + 1];
      if (nextSegment) focusSegment(nextSegment);
    }
  };

  const handleKeyDown = (
    segment: Segment,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const index = order.indexOf(segment);
    const previous = order[index - 1];
    const next = order[index + 1];
    if (event.key === "Backspace" && value[segment].length === 0 && previous) {
      event.preventDefault();
      focusSegment(previous);
    }
    if (event.key === "ArrowLeft" && previous) {
      event.preventDefault();
      focusSegment(previous);
    }
    if (event.key === "ArrowRight" && next) {
      event.preventDefault();
      focusSegment(next);
    }
  };

  return (
    <div
      aria-label={ariaLabel ?? "Date"}
      className={cn(
        "relative inline-flex w-fit items-center rounded-lg border border-input bg-background not-dark:bg-clip-padding px-[calc(--spacing(3)-1px)] text-base text-foreground shadow-xs/5 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-has-focus-visible:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:border-ring has-disabled:opacity-64 has-focus-visible:shadow-none has-focus-visible:ring-[3px] sm:text-sm dark:bg-input/32 dark:not-has-disabled:not-has-focus-visible:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className,
      )}
      data-slot="date-field"
      role="group"
      {...props}
    >
      {order.map((segment, index) => (
        <React.Fragment key={segment}>
          <DateFieldSegment
            disabled={disabled}
            onChange={(event) => handleChange(segment, event.target.value)}
            onFocus={(event) => event.target.select()}
            onKeyDown={(event) => handleKeyDown(segment, event)}
            ref={(el) => {
              refs.current[segment] = el;
            }}
            segment={segment}
            value={value[segment]}
          />
          {index < order.length - 1 ? (
            <span
              aria-hidden="true"
              className="select-none text-muted-foreground/72"
              data-slot="date-field-separator"
            >
              /
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

type DateFieldSegmentProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type"
> & {
  segment: Segment;
};

export function DateFieldSegment({
  className,
  segment,
  ...props
}: DateFieldSegmentProps): React.ReactElement {
  const config = segmentConfig[segment];

  return (
    <input
      aria-label={config.label}
      className={cn(
        "h-8.5 bg-transparent text-center tabular-nums leading-8.5 outline-none placeholder:text-muted-foreground/72 sm:h-7.5 sm:leading-7.5",
        className,
      )}
      data-slot="date-field-segment"
      inputMode="numeric"
      placeholder={config.placeholder}
      size={config.length}
      style={{ width: `${config.length + 1}ch` }}
      type="text"
      {...props}
    />
  );
}
