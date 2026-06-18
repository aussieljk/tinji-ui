"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@tinji/ui/lib/utils";
import type React from "react";

export function WidgetStack({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative isolate grid w-full max-w-sm grid-cols-1 grid-rows-1 *:[&>[data-slot=widget-stack-item]]:col-start-1 *:[&>[data-slot=widget-stack-item]]:row-start-1",
      className,
    ),
    "data-slot": "widget-stack",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export interface WidgetStackItemProps extends useRender.ComponentProps<"div"> {
  /**
   * Depth in the stack. `0` is the front-most card, larger numbers sit
   * further back, peeking out below with reduced scale and opacity.
   */
  depth?: number;
}

export function WidgetStackItem({
  className,
  depth = 0,
  style,
  render,
  ...props
}: WidgetStackItemProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "col-start-1 row-start-1 flex flex-col rounded-2xl border bg-card p-4 text-card-foreground shadow-lg transition-[transform,opacity] duration-300 will-change-transform",
      className,
    ),
    style: {
      transform: `translateY(${depth * 12}px) scale(${1 - depth * 0.05})`,
      opacity: depth > 0 ? Math.max(1 - depth * 0.18, 0.4) : 1,
      zIndex: 100 - depth,
      ...style,
    },
    "data-slot": "widget-stack-item",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
