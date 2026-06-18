import { beforeEach, describe, expect, mock, test } from "bun:test";

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

const {
  Heading,
  Text,
  Strong,
  Em,
  Code,
  Quote,
  Blockquote,
  Link,
  headingVariants,
  textVariants,
} = await import("../../src/components/typography");

function lastUseRenderCall() {
  const lastCall = useRenderCalls[useRenderCalls.length - 1];
  if (!lastCall) {
    throw new Error("useRender was not called");
  }
  return lastCall;
}

describe("Heading", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("defaults to an h2 tag", () => {
    Heading({ children: "Title" });

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("h2");
    expect(call.props["data-slot"]).toBe("heading");
  });

  test("maps level to the matching heading tag", () => {
    Heading({ level: 1 });
    expect(lastUseRenderCall().defaultTagName).toBe("h1");

    Heading({ level: 6 });
    expect(lastUseRenderCall().defaultTagName).toBe("h6");
  });

  test("applies the default xl size class", () => {
    Heading({});

    expect(lastUseRenderCall().props.className as string).toContain("text-3xl");
  });

  test("applies a custom size class", () => {
    Heading({ size: "2xl" });

    expect(lastUseRenderCall().props.className as string).toContain("text-4xl");
  });
});

describe("Text", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("defaults to a p tag with data-slot", () => {
    Text({ children: "Body" });

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("p");
    expect(call.props["data-slot"]).toBe("text");
  });

  test("applies default and muted color classes", () => {
    Text({});
    expect(lastUseRenderCall().props.className as string).toContain(
      "text-foreground",
    );

    Text({ color: "muted" });
    expect(lastUseRenderCall().props.className as string).toContain(
      "text-muted-foreground",
    );
  });
});

describe("Link", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("defaults to an anchor tag with focus styles", () => {
    Link({ children: "Read more" });

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("a");
    expect(call.props["data-slot"]).toBe("link");
    expect(call.props.className as string).toContain("focus-visible:ring-2");
  });
});

describe("inline typography elements", () => {
  test.each([
    [Strong, "strong", "strong"],
    [Em, "em", "em"],
    [Code, "code", "code"],
    [Quote, "q", "quote"],
    [Blockquote, "blockquote", "blockquote"],
  ])("%p renders its native tag and data-slot", (Component, tag, slot) => {
    const element = (Component as (props: Record<string, unknown>) => unknown)(
      {},
    ) as { type: string; props: Record<string, unknown> };

    expect(element.type).toBe(tag);
    expect(element.props["data-slot"]).toBe(slot);
  });
});

describe("typography variants", () => {
  test("headingVariants honors size", () => {
    expect(headingVariants({ size: "sm" })).toContain("text-lg");
  });

  test("textVariants honors size and color", () => {
    const result = textVariants({ size: "xs", color: "muted" });
    expect(result).toContain("text-xs");
    expect(result).toContain("text-muted-foreground");
  });
});
