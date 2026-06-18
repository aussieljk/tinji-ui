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

const { WidgetStack, WidgetStackItem } = await import(
  "../../src/components/widget-stack"
);

function lastUseRenderCall() {
  const lastCall = useRenderCalls[useRenderCalls.length - 1];
  if (!lastCall) {
    throw new Error("useRender was not called");
  }
  return lastCall;
}

describe("WidgetStack", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("sets base attributes and defaults the tag to div", () => {
    WidgetStack({});

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("div");
    expect(call.props["data-slot"]).toBe("widget-stack");
  });

  test("applies stacking grid styles", () => {
    WidgetStack({});

    const call = lastUseRenderCall();
    expect(call.props.className as string).toContain("grid");
  });

  test("merges custom className", () => {
    WidgetStack({ className: "custom-stack" });

    const call = lastUseRenderCall();
    expect(call.props.className as string).toContain("custom-stack");
  });
});

describe("WidgetStackItem", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("sets base attributes", () => {
    WidgetStackItem({});

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("div");
    expect(call.props["data-slot"]).toBe("widget-stack-item");
  });

  test("defaults depth 0 to no offset and full opacity", () => {
    WidgetStackItem({});

    const call = lastUseRenderCall();
    const style = call.props.style as React.CSSProperties;
    expect(style.transform).toBe("translateY(0px) scale(1)");
    expect(style.opacity).toBe(1);
    expect(style.zIndex).toBe(100);
  });

  test("offsets and dims deeper items", () => {
    WidgetStackItem({ depth: 2 });

    const call = lastUseRenderCall();
    const style = call.props.style as React.CSSProperties;
    expect(style.transform).toBe("translateY(24px) scale(0.9)");
    expect(style.opacity).toBeLessThan(1);
    expect(style.zIndex).toBe(98);
  });

  test("clamps opacity to a minimum for very deep items", () => {
    WidgetStackItem({ depth: 10 });

    const call = lastUseRenderCall();
    const style = call.props.style as React.CSSProperties;
    expect(style.opacity).toBe(0.4);
  });

  test("merges custom style", () => {
    WidgetStackItem({ style: { color: "red" } });

    const call = lastUseRenderCall();
    const style = call.props.style as React.CSSProperties;
    expect(style.color).toBe("red");
  });
});
