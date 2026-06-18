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
  CreditCard,
  CreditCardChip,
  CreditCardBrand,
  CreditCardNumber,
  CreditCardName,
  CreditCardExpiry,
} = await import("../../src/components/credit-card");

function lastUseRenderCall() {
  const lastCall = useRenderCalls[useRenderCalls.length - 1];
  if (!lastCall) {
    throw new Error("useRender was not called");
  }
  return lastCall;
}

describe("CreditCard", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("sets base attributes and defaults the tag to div", () => {
    CreditCard({});

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("div");
    expect(call.props["data-slot"]).toBe("credit-card");
  });

  test("applies card surface styles", () => {
    CreditCard({});

    const call = lastUseRenderCall();
    const className = call.props.className as string;
    expect(className).toContain("aspect-[1.586]");
    expect(className).toContain("rounded-2xl");
  });

  test("composes data props into children when provided", () => {
    CreditCard({
      number: "4242 4242 4242 4242",
      name: "Ada Lovelace",
      expiry: "12/30",
    });

    const call = lastUseRenderCall();
    expect(call.props.children).toBeTruthy();
  });

  test("renders nothing composed when no data is given", () => {
    CreditCard({});

    const call = lastUseRenderCall();
    expect(call.props.children).toBeNull();
  });

  test("prefers explicit children over composed content", () => {
    const children = "custom";
    CreditCard({ children, number: "4242" });

    const call = lastUseRenderCall();
    expect(call.props.children).toBe(children);
  });

  test("merges custom className", () => {
    CreditCard({ className: "custom-card" });

    const call = lastUseRenderCall();
    expect(call.props.className as string).toContain("custom-card");
  });
});

describe("CreditCard subcomponents", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test.each([
    [CreditCardChip, "credit-card-chip"],
    [CreditCardBrand, "credit-card-brand"],
    [CreditCardNumber, "credit-card-number"],
    [CreditCardName, "credit-card-name"],
    [CreditCardExpiry, "credit-card-expiry"],
  ])("%p sets its data-slot", (Component, slot) => {
    (Component as (props: Record<string, unknown>) => unknown)({});

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("div");
    expect(call.props["data-slot"]).toBe(slot);
  });
});
