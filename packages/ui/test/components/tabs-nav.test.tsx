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

const { TabsNav, TabsNavList, TabsNavLink } = await import(
  "../../src/components/tabs-nav"
);

function lastUseRenderCall() {
  const lastCall = useRenderCalls[useRenderCalls.length - 1];
  if (!lastCall) {
    throw new Error("useRender was not called");
  }
  return lastCall;
}

describe("TabsNav", () => {
  test("renders a nav element with data-slot", () => {
    const element = TabsNav({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("nav");
    expect(element.props["data-slot"]).toBe("tabs-nav");
  });

  test("merges custom className", () => {
    const element = TabsNav({ className: "custom-nav" }) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props.className as string).toContain("custom-nav");
  });
});

describe("TabsNavList", () => {
  test("renders a div with list data-slot", () => {
    const element = TabsNavList({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("div");
    expect(element.props["data-slot"]).toBe("tabs-nav-list");
  });
});

describe("TabsNavLink", () => {
  beforeEach(() => {
    useRenderCalls.length = 0;
  });

  test("renders an anchor via useRender", () => {
    TabsNavLink({});

    const call = lastUseRenderCall();
    expect(call.defaultTagName).toBe("a");
    expect(call.props["data-slot"]).toBe("tabs-nav-link");
  });

  test("is inactive by default (no aria-current)", () => {
    TabsNavLink({});

    const call = lastUseRenderCall();
    expect(call.props["aria-current"]).toBeUndefined();
    expect(call.props["data-active"]).toBeUndefined();
  });

  test("marks the active link with aria-current=page", () => {
    TabsNavLink({ active: true });

    const call = lastUseRenderCall();
    expect(call.props["aria-current"]).toBe("page");
    expect(call.props["data-active"]).toBe("");
  });
});
