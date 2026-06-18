"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@tinji/ui/lib/utils";
import type React from "react";

export interface CreditCardProps extends useRender.ComponentProps<"div"> {
  number?: string;
  name?: string;
  expiry?: string;
  brand?: React.ReactNode;
}

export function CreditCard({
  className,
  number,
  name,
  expiry,
  brand,
  children,
  render,
  ...props
}: CreditCardProps): React.ReactElement {
  const composed =
    children ??
    (number || name || expiry || brand ? (
      <>
        <div className="flex items-start justify-between">
          <CreditCardChip />
          {brand ? <CreditCardBrand>{brand}</CreditCardBrand> : null}
        </div>
        {number ? <CreditCardNumber>{number}</CreditCardNumber> : null}
        <div className="flex items-end justify-between gap-4">
          {name ? <CreditCardName>{name}</CreditCardName> : null}
          {expiry ? <CreditCardExpiry>{expiry}</CreditCardExpiry> : null}
        </div>
      </>
    ) : null);

  const defaultProps = {
    className: cn(
      "relative flex aspect-[1.586] w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-5 text-primary-foreground shadow-lg before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/0 before:to-white/15",
      className,
    ),
    "data-slot": "credit-card",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, { ...props, children: composed }),
    render,
  });
}

export function CreditCardChip({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "h-7 w-10 rounded-md bg-gradient-to-br from-amber-200/90 to-amber-400/80 ring-1 ring-white/30 ring-inset",
      className,
    ),
    "data-slot": "credit-card-chip",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CreditCardBrand({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "font-semibold text-lg uppercase italic tracking-wide",
      className,
    ),
    "data-slot": "credit-card-brand",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CreditCardNumber({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "font-medium text-lg tabular-nums tracking-[0.2em] sm:text-xl",
      className,
    ),
    "data-slot": "credit-card-number",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CreditCardName({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "min-w-0 truncate font-medium text-sm uppercase tracking-wide",
      className,
    ),
    "data-slot": "credit-card-name",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function CreditCardExpiry({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "shrink-0 text-right font-medium text-sm tabular-nums",
      className,
    ),
    "data-slot": "credit-card-expiry",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
