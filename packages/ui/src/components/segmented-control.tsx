"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@tinji/ui/lib/utils";
import type * as React from "react";

const trackClassName =
  "inline-flex w-fit items-center justify-stretch gap-0.5 rounded-lg bg-muted p-0.5 text-muted-foreground";

const itemClassName =
  "relative inline-flex h-8 flex-1 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-3 font-medium text-base outline-none transition-[color,background-color,box-shadow] hover:text-foreground focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-64 sm:h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0";

const selectedClassName =
  "data-pressed:bg-background data-pressed:text-foreground data-pressed:shadow-sm dark:data-pressed:bg-input";

const radioSelectedClassName =
  "data-checked:bg-background data-checked:text-foreground data-checked:shadow-sm dark:data-checked:bg-input";

const navActiveClassName =
  "aria-[current]:bg-background aria-[current]:text-foreground aria-[current]:shadow-sm dark:aria-[current]:bg-input";

/* -------------------------------------------------------------------------- */
/*                          Toggle-group based control                        */
/* -------------------------------------------------------------------------- */

export function SegmentedControl({
  className,
  ...props
}: ToggleGroupPrimitive.Props): React.ReactElement {
  return (
    <ToggleGroupPrimitive
      className={cn(trackClassName, className)}
      data-slot="segmented-control"
      {...props}
    />
  );
}

export function SegmentedControlItem({
  className,
  ...props
}: TogglePrimitive.Props): React.ReactElement {
  return (
    <TogglePrimitive
      className={cn(itemClassName, selectedClassName, className)}
      data-slot="segmented-control-item"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                            Navigation (link) variant                       */
/* -------------------------------------------------------------------------- */

export function SegmentedControlNav({
  className,
  ...props
}: React.ComponentProps<"nav">): React.ReactElement {
  return (
    <nav
      className={cn(trackClassName, className)}
      data-slot="segmented-control-nav"
      {...props}
    />
  );
}

export function SegmentedControlNavItem({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">): React.ReactElement {
  const defaultProps = {
    className: cn(itemClassName, navActiveClassName, className),
    "data-slot": "segmented-control-nav-item",
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}

/* -------------------------------------------------------------------------- */
/*                           Radio-group based control                        */
/* -------------------------------------------------------------------------- */

export function SegmentedControlRadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={cn(trackClassName, className)}
      data-slot="segmented-control-radio-group"
      {...props}
    />
  );
}

export function SegmentedControlRadioItem({
  className,
  ...props
}: RadioPrimitive.Root.Props): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={cn(itemClassName, radioSelectedClassName, className)}
      data-slot="segmented-control-radio-item"
      {...props}
    />
  );
}

export {
  ToggleGroupPrimitive,
  TogglePrimitive,
  RadioGroupPrimitive,
  RadioPrimitive,
};
