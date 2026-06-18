import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export const dataListVariants = cva("text-sm", {
  defaultVariants: {
    orientation: "vertical",
  },
  variants: {
    orientation: {
      horizontal: "grid grid-cols-1",
      vertical: "flex flex-col",
    },
  },
});

export function DataList({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"dl"> &
  VariantProps<typeof dataListVariants>): React.ReactElement {
  return (
    <dl
      className={cn(dataListVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="data-list"
      {...props}
    />
  );
}

export function DataListItem({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex in-data-[orientation=horizontal]:grid in-data-[orientation=horizontal]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] in-data-[orientation=vertical]:flex-col in-data-[orientation=horizontal]:items-center gap-1 in-data-[orientation=horizontal]:gap-4 in-data-[orientation=horizontal]:py-1.5 in-data-[orientation=vertical]:py-2",
        className,
      )}
      data-slot="data-list-item"
      {...props}
    />
  );
}

export function DataListLabel({
  className,
  ...props
}: React.ComponentProps<"dt">): React.ReactElement {
  return (
    <dt
      className={cn("text-muted-foreground", className)}
      data-slot="data-list-label"
      {...props}
    />
  );
}

export function DataListValue({
  className,
  ...props
}: React.ComponentProps<"dd">): React.ReactElement {
  return (
    <dd
      className={cn("text-foreground", className)}
      data-slot="data-list-value"
      {...props}
    />
  );
}
