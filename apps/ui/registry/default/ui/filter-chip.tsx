"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export const filterChipVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border font-medium text-foreground outline-none transition-shadow pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "h-8 px-[calc(--spacing(3)-1px)] text-base sm:h-7 sm:text-sm",
        sm: "h-7 gap-1 px-[calc(--spacing(2.5)-1px)] text-sm sm:h-6 sm:text-xs",
      },
    },
  },
);

export interface FilterChipProps
  extends useRender.ComponentProps<"button">,
    VariantProps<typeof filterChipVariants> {
  /** Whether the chip is currently selected. */
  selected?: boolean;
}

export function FilterChip({
  className,
  size,
  selected,
  render,
  ...props
}: FilterChipProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      filterChipVariants({ size }),
      "border-input bg-background not-dark:bg-clip-padding shadow-xs/5 hover:bg-accent/50 dark:bg-input/32 dark:hover:bg-input/64",
      "data-[selected]:border-primary data-[selected]:bg-primary/8 data-[selected]:text-primary data-[selected]:shadow-none dark:data-[selected]:bg-primary/16",
      className,
    ),
    "aria-pressed": selected,
    "data-selected": selected ? "" : undefined,
    "data-slot": "filter-chip",
    type: render ? undefined : ("button" as const),
  };

  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(defaultProps, props),
    render,
  });
}

export function FilterChipRemove({
  className,
  "aria-label": ariaLabel = "Remove filter",
  children,
  ...props
}: React.ComponentProps<"button">): React.ReactElement {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "-me-1 inline-flex size-4.5 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/64 outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring sm:size-4 [&_svg:not([class*='size-'])]:size-3.5 sm:[&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="filter-chip-remove"
      type="button"
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </button>
  );
}
