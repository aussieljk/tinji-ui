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

mock.module("@tinji/ui/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
}));

const { FilterChip, FilterChipRemove, filterChipVariants } = await import(
  "../../src/components/filter-chip"
);

function lastUseRenderCall() {
  const lastCall = useRenderCalls[useRenderCalls.length - 1];
  if (!lastCall) {
    throw new Error("useRender was not called");
  }
  return lastCall;
}

describe("FilterChip", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("defaults to a button with data-slot and type button", () => {
    FilterChip({});

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("button");
    expect(call.props["data-slot"]).toBe("filter-chip");
    expect(call.props.type).toBe("button");
  });

  test("omits the default type when a custom render is provided", () => {
    const render = () => null;
    FilterChip({ render });

    const call = lastUseRenderCall();
    expect(call.props.type).toBeUndefined();
  });

  test("is not pressed by default", () => {
    FilterChip({});

    const call = lastUseRenderCall();
    expect(call.props["aria-pressed"]).toBeUndefined();
    expect(call.props["data-selected"]).toBeUndefined();
  });

  test("reflects the selected state via aria-pressed and data-selected", () => {
    FilterChip({ selected: true });

    const call = lastUseRenderCall();
    expect(call.props["aria-pressed"]).toBe(true);
    expect(call.props["data-selected"]).toBe("");
  });

  test("applies the small size variant", () => {
    FilterChip({ size: "sm" });

    const call = lastUseRenderCall();
    expect(call.props.className as string).toContain("h-7");
  });
});

describe("FilterChipRemove", () => {
  test("renders a button with a default aria-label", () => {
    const element = FilterChipRemove({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("button");
    expect(element.props["data-slot"]).toBe("filter-chip-remove");
    expect(element.props.type).toBe("button");
    expect(element.props["aria-label"]).toBe("Remove filter");
  });

  test("allows overriding the aria-label", () => {
    const element = FilterChipRemove({
      "aria-label": "Clear status filter",
    }) as unknown as { props: Record<string, unknown> };

    expect(element.props["aria-label"]).toBe("Clear status filter");
  });
});

describe("filterChipVariants", () => {
  test("returns size-specific classes", () => {
    expect(filterChipVariants({ size: "sm" })).toContain("h-7");
    expect(filterChipVariants({ size: "default" })).toContain("h-8");
  });
});
