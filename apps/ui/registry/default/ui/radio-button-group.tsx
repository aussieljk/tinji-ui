"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export function RadioButtonGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={cn("flex flex-col gap-2", className)}
      data-slot="radio-button-group"
      {...props}
    />
  );
}

export function RadioButtonGroupItem({
  className,
  children,
  ...props
}: RadioPrimitive.Root.Props): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-3 rounded-lg border border-input bg-popover not-dark:bg-clip-padding p-3 text-start text-foreground text-sm shadow-xs/5 outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 data-disabled:cursor-not-allowed data-checked:border-primary data-disabled:opacity-64 data-checked:ring-1 data-checked:ring-primary dark:bg-input/32 dark:hover:bg-input/48 [[data-disabled],[data-checked]]:shadow-none",
        className,
      )}
      data-slot="radio-button-group-item"
      {...props}
    >
      {children}
    </RadioPrimitive.Root>
  );
}

export { RadioGroupPrimitive, RadioPrimitive };
