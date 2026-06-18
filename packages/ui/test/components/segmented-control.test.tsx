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

// Base UI primitives are stubbed so the wrapper components can be invoked as
// plain functions and the resulting element props inspected.
mock.module("@base-ui/react/toggle-group", () => ({
  ToggleGroup: (props: Record<string, unknown>) => ({
    type: "toggle-group",
    props,
  }),
}));
mock.module("@base-ui/react/toggle", () => ({
  Toggle: (props: Record<string, unknown>) => ({ type: "toggle", props }),
}));
mock.module("@base-ui/react/radio-group", () => ({
  RadioGroup: (props: Record<string, unknown>) => ({
    type: "radio-group",
    props,
  }),
}));
mock.module("@base-ui/react/radio", () => ({
  Radio: {
    Root: (props: Record<string, unknown>) => ({ type: "radio-root", props }),
  },
}));

const {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlNav,
  SegmentedControlNavItem,
  SegmentedControlRadioGroup,
  SegmentedControlRadioItem,
} = await import("../../src/components/segmented-control");

function lastUseRenderCall() {
  const lastCall = useRenderCalls[useRenderCalls.length - 1];
  if (!lastCall) {
    throw new Error("useRender was not called");
  }
  return lastCall;
}

describe("SegmentedControl (toggle group)", () => {
  test("renders a toggle group with track styles", () => {
    const element = SegmentedControl({}) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-slot"]).toBe("segmented-control");
    expect(element.props.className as string).toContain("rounded-lg");
  });

  test("item renders a toggle with item data-slot", () => {
    const element = SegmentedControlItem({}) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-slot"]).toBe("segmented-control-item");
  });
});

describe("SegmentedControlNav (link variant)", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("renders a nav element", () => {
    const element = SegmentedControlNav({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("nav");
    expect(element.props["data-slot"]).toBe("segmented-control-nav");
  });

  test("nav item renders through useRender as an anchor", () => {
    SegmentedControlNavItem({});

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("a");
    expect(call.props["data-slot"]).toBe("segmented-control-nav-item");
  });
});

describe("SegmentedControlRadioGroup (radio variant)", () => {
  test("renders a radio group", () => {
    const element = SegmentedControlRadioGroup({}) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-slot"]).toBe("segmented-control-radio-group");
  });

  test("radio item renders a radio root", () => {
    const element = SegmentedControlRadioItem({}) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-slot"]).toBe("segmented-control-radio-item");
  });
});
