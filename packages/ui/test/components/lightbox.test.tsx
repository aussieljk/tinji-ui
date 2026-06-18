import { describe, expect, mock, test } from "bun:test";

mock.module("@tinji/ui/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
}));

// Stub icons so they render as inert markers.
mock.module("lucide-react", () => ({
  ChevronLeftIcon: () => ({ type: "chevron-left", props: {} }),
  ChevronRightIcon: () => ({ type: "chevron-right", props: {} }),
  XIcon: () => ({ type: "x-icon", props: {} }),
}));

mock.module("@tinji/ui/components/button", () => ({
  Button: (props: Record<string, unknown>) => ({ type: "button", props }),
}));

// Dialog re-exports. Primitive parts are stubbed as inspectable elements.
const DialogPrimitive = {
  Popup: (props: Record<string, unknown>) => ({ type: "dialog-popup", props }),
  Close: (props: Record<string, unknown>) => ({ type: "dialog-close", props }),
  Portal: (props: Record<string, unknown>) => ({
    type: "dialog-portal",
    props,
  }),
};

mock.module("@tinji/ui/components/dialog", () => ({
  Dialog: (props: Record<string, unknown>) => ({ type: "dialog", props }),
  DialogTrigger: (props: Record<string, unknown>) => ({
    type: "dialog-trigger",
    props,
  }),
  DialogClose: (props: Record<string, unknown>) => ({
    type: "dialog-close",
    props,
  }),
  DialogBackdrop: (props: Record<string, unknown>) => ({
    type: "dialog-backdrop",
    props,
  }),
  DialogPortal: (props: Record<string, unknown>) => ({
    type: "dialog-portal",
    props,
  }),
  DialogPrimitive,
}));

const {
  Lightbox,
  LightboxTrigger,
  LightboxClose,
  LightboxPopup,
  LightboxImage,
  LightboxPrevious,
  LightboxNext,
} = await import("../../src/components/lightbox");

type Element = { type: unknown; props: Record<string, unknown> };

describe("Lightbox re-exports", () => {
  test("aliases Dialog primitives", () => {
    expect(Lightbox).toBeDefined();
    expect(LightboxTrigger).toBeDefined();
    expect(LightboxClose).toBeDefined();
  });
});

describe("LightboxImage", () => {
  test("renders an img with the provided alt text", () => {
    const element = LightboxImage({
      src: "/photo.jpg",
      alt: "A sunset",
    }) as unknown as Element;

    expect(element.type).toBe("img");
    expect(element.props.alt).toBe("A sunset");
    expect(element.props.src).toBe("/photo.jpg");
    expect(element.props["data-slot"]).toBe("lightbox-image");
  });

  test("applies object-contain styling", () => {
    const element = LightboxImage({ alt: "" }) as unknown as Element;

    expect(element.props.className as string).toContain("object-contain");
  });
});

describe("LightboxPopup", () => {
  test("renders a portal whose children include a backdrop and popup", () => {
    const element = LightboxPopup({ children: "content" }) as unknown as {
      props: { children: unknown[] };
    };

    // DialogPortal children = [DialogBackdrop, DialogPrimitive.Popup]
    expect(Array.isArray(element.props.children)).toBe(true);
    expect(element.props.children).toHaveLength(2);
  });

  test("popup carries the lightbox-popup data-slot", () => {
    const element = LightboxPopup({ children: "content" }) as unknown as {
      props: { children: Element[] };
    };

    const popupEl = element.props.children[1] as Element;
    expect(popupEl.props["data-slot"]).toBe("lightbox-popup");
  });

  test("includes a close button by default", () => {
    const element = LightboxPopup({ children: "content" }) as unknown as {
      props: { children: Element[] };
    };

    const popupEl = element.props.children[1] as Element;
    const popupChildren = popupEl.props.children as unknown[];
    // children = [provided content, close button element]
    expect(popupChildren[1]).toBeTruthy();
  });

  test("omits the close button when showCloseButton is false", () => {
    const element = LightboxPopup({
      children: "content",
      showCloseButton: false,
    }) as unknown as { props: { children: Element[] } };

    const popupEl = element.props.children[1] as Element;
    const popupChildren = popupEl.props.children as unknown[];
    // children = [provided content, false]
    expect(popupChildren[1]).toBe(false);
  });
});

describe("LightboxPrevious / LightboxNext", () => {
  test("Previous renders an accessible ghost icon button", () => {
    const element = LightboxPrevious({}) as unknown as Element;

    expect(element.props["aria-label"]).toBe("Previous");
    expect(element.props["data-slot"]).toBe("lightbox-previous");
    expect(element.props.variant).toBe("ghost");
  });

  test("Next renders an accessible ghost icon button", () => {
    const element = LightboxNext({}) as unknown as Element;

    expect(element.props["aria-label"]).toBe("Next");
    expect(element.props["data-slot"]).toBe("lightbox-next");
  });
});
