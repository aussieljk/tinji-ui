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

const { Badge, badgeVariants } = await import("../../src/components/badge");

function lastUseRenderCall() {
  const lastCall = useRenderCalls[useRenderCalls.length - 1];
  if (!lastCall) {
    throw new Error("useRender was not called");
  }
  return lastCall;
}

describe("Badge", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("defaults to a span with the badge data-slot", () => {
    Badge({ children: "New" });

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("span");
    expect(call.props["data-slot"]).toBe("badge");
  });

  test("applies the default variant styles", () => {
    Badge({});

    expect(lastUseRenderCall().props.className as string).toContain(
      "bg-primary",
    );
  });

  test("applies the destructive variant styles", () => {
    Badge({ variant: "destructive" });

    expect(lastUseRenderCall().props.className as string).toContain(
      "bg-destructive",
    );
  });

  test("applies the large size styles", () => {
    Badge({ size: "lg" });

    expect(lastUseRenderCall().props.className as string).toContain("h-6.5");
  });
});

describe("badgeVariants", () => {
  test("returns variant-specific classes", () => {
    expect(badgeVariants({ variant: "success" })).toContain("bg-success/8");
    expect(badgeVariants({ variant: "outline" })).toContain("border-input");
  });

  test("returns size-specific classes", () => {
    expect(badgeVariants({ size: "sm" })).toContain("h-5");
  });
});
