"use client";

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPortal,
  DialogPrimitive,
  DialogTrigger,
} from "@/registry/default/ui/dialog";

export const Lightbox: typeof Dialog = Dialog;

export const LightboxTrigger: typeof DialogTrigger = DialogTrigger;

export function LightboxPopup({
  className,
  children,
  showCloseButton = true,
  closeProps,
  portalProps,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  closeProps?: DialogPrimitive.Close.Props;
  portalProps?: DialogPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <DialogPortal {...portalProps}>
      <DialogBackdrop className="bg-black/90 backdrop-blur-none" />
      <DialogPrimitive.Popup
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4 text-white outline-none transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 sm:p-12",
          className,
        )}
        data-slot="lightbox-popup"
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute end-3 top-3 text-white hover:bg-white/10 hover:text-white data-pressed:bg-white/10"
            render={<Button size="icon" variant="ghost" />}
            {...closeProps}
          >
            <XIcon />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

export function LightboxImage({
  className,
  alt,
  ...props
}: React.ComponentProps<"img">): React.ReactElement {
  return (
    <img
      alt={alt}
      className={cn(
        "max-h-full max-w-full select-none object-contain",
        className,
      )}
      data-slot="lightbox-image"
      {...props}
    />
  );
}

export const LightboxClose: typeof DialogClose = DialogClose;

export function LightboxPrevious({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>): React.ReactElement {
  return (
    <Button
      aria-label="Previous"
      className={cn(
        "absolute start-3 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 hover:text-white data-pressed:bg-white/10",
        className,
      )}
      data-slot="lightbox-previous"
      size="icon-lg"
      variant="ghost"
      {...props}
    >
      {children ?? <ChevronLeftIcon aria-hidden="true" />}
    </Button>
  );
}

export function LightboxNext({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button>): React.ReactElement {
  return (
    <Button
      aria-label="Next"
      className={cn(
        "absolute end-3 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 hover:text-white data-pressed:bg-white/10",
        className,
      )}
      data-slot="lightbox-next"
      size="icon-lg"
      variant="ghost"
      {...props}
    >
      {children ?? <ChevronRightIcon aria-hidden="true" />}
    </Button>
  );
}
