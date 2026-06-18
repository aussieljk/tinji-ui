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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardPanel,
  CardContent,
  CardFooter,
} = await import("../../src/components/card");

function lastUseRenderCall() {
  const lastCall = useRenderCalls[useRenderCalls.length - 1];
  if (!lastCall) {
    throw new Error("useRender was not called");
  }
  return lastCall;
}

describe("Card", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("renders a div with the card data-slot", () => {
    Card({});

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("div");
    expect(call.props["data-slot"]).toBe("card");
  });

  test("merges custom className", () => {
    Card({ className: "custom-card" });

    expect(lastUseRenderCall().props.className as string).toContain(
      "custom-card",
    );
  });
});

describe("Card subcomponents", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test.each([
    [CardHeader, "card-header"],
    [CardTitle, "card-title"],
    [CardDescription, "card-description"],
    [CardAction, "card-action"],
    [CardPanel, "card-panel"],
    [CardFooter, "card-footer"],
  ])("%p sets its data-slot", (Component, slot) => {
    (Component as (props: Record<string, unknown>) => unknown)({});

    expect(lastUseRenderCall().props["data-slot"]).toBe(slot);
  });

  test("CardContent is an alias for CardPanel", () => {
    expect(CardContent).toBe(CardPanel);
  });
});
