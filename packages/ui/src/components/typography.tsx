"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@tinji/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

export const headingVariants = cva(
  "scroll-m-20 text-balance font-semibold text-foreground tracking-tight",
  {
    defaultVariants: {
      size: "xl",
    },
    variants: {
      size: {
        "2xl": "text-4xl leading-tight",
        xl: "text-3xl leading-tight",
        lg: "text-2xl leading-snug",
        md: "text-xl leading-snug",
        sm: "text-lg leading-normal",
        xs: "text-base leading-normal",
      },
    },
  },
);

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends useRender.ComponentProps<"h2"> {
  size?: VariantProps<typeof headingVariants>["size"];
  /** Heading level 1–6. Controls the rendered tag (h1–h6). Defaults to 2. */
  level?: HeadingLevel;
}

export function Heading({
  className,
  size,
  level = 2,
  render,
  ...props
}: HeadingProps): React.ReactElement {
  const tag = HEADING_TAGS[level - 1];
  const defaultProps = {
    className: cn(headingVariants({ className, size })),
    "data-slot": "heading",
  };

  return useRender({
    defaultTagName: tag,
    props: mergeProps<"h2">(defaultProps, props),
    render,
  });
}

export const textVariants = cva("", {
  defaultVariants: {
    size: "md",
    color: "default",
  },
  variants: {
    size: {
      lg: "text-lg leading-relaxed",
      md: "text-base leading-relaxed",
      sm: "text-sm leading-normal",
      xs: "text-xs leading-normal",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
});

export interface TextProps
  extends Omit<useRender.ComponentProps<"p">, "color"> {
  size?: VariantProps<typeof textVariants>["size"];
  color?: VariantProps<typeof textVariants>["color"];
}

export function Text({
  className,
  size,
  color,
  render,
  ...props
}: TextProps): React.ReactElement {
  const defaultProps = {
    className: cn(textVariants({ className, color, size })),
    "data-slot": "text",
  };

  return useRender({
    defaultTagName: "p",
    props: mergeProps<"p">(defaultProps, props),
    render,
  });
}

export function Strong({
  className,
  ...props
}: React.ComponentProps<"strong">): React.ReactElement {
  return (
    <strong
      className={cn("font-semibold text-foreground", className)}
      data-slot="strong"
      {...props}
    />
  );
}

export function Em({
  className,
  ...props
}: React.ComponentProps<"em">): React.ReactElement {
  return <em className={cn("italic", className)} data-slot="em" {...props} />;
}

export function Code({
  className,
  ...props
}: React.ComponentProps<"code">): React.ReactElement {
  return (
    <code
      className={cn(
        "relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-medium font-mono text-foreground text-sm",
        className,
      )}
      data-slot="code"
      {...props}
    />
  );
}

export function Quote({
  className,
  ...props
}: React.ComponentProps<"q">): React.ReactElement {
  return (
    <q
      className={cn("text-foreground italic", className)}
      data-slot="quote"
      {...props}
    />
  );
}

export function Blockquote({
  className,
  ...props
}: React.ComponentProps<"blockquote">): React.ReactElement {
  return (
    <blockquote
      className={cn("border-s-2 ps-4 text-muted-foreground italic", className)}
      data-slot="blockquote"
      {...props}
    />
  );
}

export interface LinkProps extends useRender.ComponentProps<"a"> {}

export function Link({
  className,
  render,
  ...props
}: LinkProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    ),
    "data-slot": "link",
  };

  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(defaultProps, props),
    render,
  });
}
