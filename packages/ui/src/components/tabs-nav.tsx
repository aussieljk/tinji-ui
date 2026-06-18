"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@tinji/ui/lib/utils";
import type React from "react";

export function TabsNav({
  className,
  ...props
}: React.ComponentProps<"nav">): React.ReactElement {
  return (
    <nav
      className={cn("flex flex-col gap-2", className)}
      data-slot="tabs-nav"
      {...props}
    />
  );
}

export function TabsNavList({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "relative z-0 flex w-fit items-center justify-center gap-x-0.5 py-1 text-muted-foreground",
        className,
      )}
      data-slot="tabs-nav-list"
      {...props}
    />
  );
}

export interface TabsNavLinkProps extends useRender.ComponentProps<"a"> {
  /** Marks the link as the currently active page (sets `aria-current="page"`). */
  active?: boolean;
}

export function TabsNavLink({
  className,
  active,
  render,
  ...props
}: TabsNavLinkProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-[calc(--spacing(2.5)-1px)] font-medium text-base no-underline outline-none transition-[color,background-color,box-shadow] after:absolute after:inset-x-2.5 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity hover:bg-accent hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring data-[active]:text-foreground data-[active]:after:opacity-100 sm:h-8 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
      className,
    ),
    "aria-current": active ? ("page" as const) : undefined,
    "data-active": active ? "" : undefined,
    "data-slot": "tabs-nav-link",
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}
