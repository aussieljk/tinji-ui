"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type React from "react";
import { createContext, useContext, useRef } from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button, type ButtonProps } from "@/registry/default/ui/button";

const ScrollGalleryContext: React.Context<{
  viewportRef: React.RefObject<HTMLDivElement | null>;
}> = createContext<{
  viewportRef: React.RefObject<HTMLDivElement | null>;
}>({
  viewportRef: { current: null },
});

export function ScrollGallery({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const defaultProps = {
    className: cn("relative flex flex-col gap-2", className),
    "data-slot": "scroll-gallery",
  };

  const element = useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });

  return (
    <ScrollGalleryContext.Provider value={{ viewportRef }}>
      {element}
    </ScrollGalleryContext.Provider>
  );
}

export function ScrollGalleryViewport({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const { viewportRef } = useContext(ScrollGalleryContext);

  const defaultProps = {
    className: cn(
      "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      className,
    ),
    "data-slot": "scroll-gallery-viewport",
    ref: viewportRef,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function ScrollGalleryItem({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn("shrink-0 snap-start", className),
    "data-slot": "scroll-gallery-item",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

function scrollViewport(
  viewport: HTMLDivElement | null,
  direction: 1 | -1,
): void {
  if (!viewport) {
    return;
  }
  viewport.scrollBy({
    behavior: "smooth",
    left: direction * Math.round(viewport.clientWidth * 0.8),
  });
}

export function ScrollGalleryPrevious({
  className,
  onClick,
  size = "icon",
  variant = "outline",
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const { viewportRef } = useContext(ScrollGalleryContext);

  return (
    <Button
      aria-label="Previous"
      className={cn("rounded-full", className)}
      data-slot="scroll-gallery-previous"
      onClick={(event) => {
        onClick?.(event);
        scrollViewport(viewportRef.current, -1);
      }}
      size={size}
      variant={variant}
      {...props}
    >
      {children ?? <ChevronLeftIcon aria-hidden="true" />}
    </Button>
  );
}

export function ScrollGalleryNext({
  className,
  onClick,
  size = "icon",
  variant = "outline",
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const { viewportRef } = useContext(ScrollGalleryContext);

  return (
    <Button
      aria-label="Next"
      className={cn("rounded-full", className)}
      data-slot="scroll-gallery-next"
      onClick={(event) => {
        onClick?.(event);
        scrollViewport(viewportRef.current, 1);
      }}
      size={size}
      variant={variant}
      {...props}
    >
      {children ?? <ChevronRightIcon aria-hidden="true" />}
    </Button>
  );
}
