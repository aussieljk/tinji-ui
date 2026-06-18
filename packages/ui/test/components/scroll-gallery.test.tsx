import { beforeEach, describe, expect, mock, test } from "bun:test";
import * as actualReact from "react";

type UseRenderConfig = {
  defaultTagName: string;
  render?: (...args: unknown[]) => unknown;
  props: Record<string, unknown>;
};

const useRenderCalls: UseRenderConfig[] = [];

function useRenderMock(config: UseRenderConfig) {
  useRenderCalls.push(config);
  return null;
}

function mergePropsMock(
  defaults: Record<string, unknown>,
  overrides: Record<string, unknown> = {},
) {
  return { ...defaults, ...overrides };
}

mock.module("@base-ui/react/use-render", () => ({
  useRender: useRenderMock,
}));

mock.module("@base-ui/react/merge-props", () => ({
  mergeProps: mergePropsMock,
}));

mock.module("@tinji/ui/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
}));

const scrollBy = mock(() => {});
const viewport = { current: { clientWidth: 500, scrollBy } };

mock.module("react", () => ({
  ...actualReact,
  default: actualReact,
  useRef: () => viewport,
  useContext: () => ({ viewportRef: viewport }),
}));

// Stub the Button so the Previous/Next controls can be inspected.
mock.module("@tinji/ui/components/button", () => ({
  Button: (props: Record<string, unknown>) => ({ type: "button", props }),
}));

const {
  ScrollGallery,
  ScrollGalleryViewport,
  ScrollGalleryItem,
  ScrollGalleryPrevious,
  ScrollGalleryNext,
} = await import("../../src/components/scroll-gallery");

function lastUseRenderCall() {
  const lastCall = useRenderCalls[useRenderCalls.length - 1];
  if (!lastCall) {
    throw new Error("useRender was not called");
  }
  return lastCall;
}

describe("ScrollGallery", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
    scrollBy.mockClear();
  });

  test("renders a wrapping container via useRender", () => {
    ScrollGallery({});

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("div");
    expect(call.props["data-slot"]).toBe("scroll-gallery");
  });

  test("viewport applies horizontal scroll styles", () => {
    ScrollGalleryViewport({});

    const call = lastUseRenderCall();
    expect(call.props["data-slot"]).toBe("scroll-gallery-viewport");
    expect(call.props.className as string).toContain("overflow-x-auto");
    expect(call.props.className as string).toContain("snap-x");
  });

  test("item applies snap styles", () => {
    ScrollGalleryItem({});

    const call = lastUseRenderCall();
    expect(call.props["data-slot"]).toBe("scroll-gallery-item");
    expect(call.props.className as string).toContain("snap-start");
  });
});

describe("ScrollGallery controls", () => {
  beforeEach(() => {
    scrollBy.mockClear();
  });

  test("Previous renders an accessible button", () => {
    const element = ScrollGalleryPrevious({}) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["aria-label"]).toBe("Previous");
    expect(element.props["data-slot"]).toBe("scroll-gallery-previous");
  });

  test("Next renders an accessible button", () => {
    const element = ScrollGalleryNext({}) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["aria-label"]).toBe("Next");
    expect(element.props["data-slot"]).toBe("scroll-gallery-next");
  });

  test("Previous scrolls the viewport backwards on click", () => {
    const element = ScrollGalleryPrevious({}) as unknown as {
      props: { onClick: (event: unknown) => void };
    };

    element.props.onClick({});
    expect(scrollBy).toHaveBeenCalledTimes(1);
    const arg = scrollBy.mock.calls[0]?.[0] as { left: number };
    expect(arg.left).toBeLessThan(0);
  });

  test("Next scrolls the viewport forwards on click", () => {
    const element = ScrollGalleryNext({}) as unknown as {
      props: { onClick: (event: unknown) => void };
    };

    element.props.onClick({});
    expect(scrollBy).toHaveBeenCalledTimes(1);
    const arg = scrollBy.mock.calls[0]?.[0] as { left: number };
    expect(arg.left).toBeGreaterThan(0);
  });

  test("forwards a user-supplied onClick handler", () => {
    const onClick = mock(() => {});
    const element = ScrollGalleryNext({ onClick }) as unknown as {
      props: { onClick: (event: unknown) => void };
    };

    element.props.onClick({});
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
