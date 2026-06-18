import { describe, expect, mock, test } from "bun:test";

mock.module("@tinji/ui/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
}));

// Base UI Tabs primitives stubbed as inspectable elements.
const TabsPrimitive = {
  Root: (props: Record<string, unknown>) => ({ type: "tabs-root", props }),
  List: (props: Record<string, unknown>) => ({ type: "tabs-list", props }),
  Tab: (props: Record<string, unknown>) => ({ type: "tabs-tab", props }),
  Panel: (props: Record<string, unknown>) => ({ type: "tabs-panel", props }),
  Indicator: (props: Record<string, unknown>) => ({
    type: "tabs-indicator",
    props,
  }),
};

mock.module("@base-ui/react/tabs", () => ({
  Tabs: TabsPrimitive,
}));

const { Tabs, TabsList, TabsTab, TabsPanel, TabsTrigger, TabsContent } =
  await import("../../src/components/tabs");

type Element = { type: unknown; props: Record<string, unknown> };

describe("Tabs", () => {
  test("renders the tabs root with data-slot", () => {
    const element = Tabs({}) as unknown as Element;

    expect(element.props["data-slot"]).toBe("tabs");
  });
});

describe("TabsList", () => {
  test("renders a list with an indicator child", () => {
    const element = TabsList({}) as unknown as {
      props: { children: unknown[]; "data-slot": string };
    };

    expect(element.props["data-slot"]).toBe("tabs-list");
    expect(Array.isArray(element.props.children)).toBe(true);
  });

  test("default variant applies the muted track background", () => {
    const element = TabsList({}) as unknown as Element;

    expect(element.props.className as string).toContain("bg-muted");
  });

  test("underline variant omits the muted track background", () => {
    const element = TabsList({ variant: "underline" }) as unknown as Element;

    expect(element.props.className as string).not.toContain("bg-muted");
  });
});

describe("TabsTab", () => {
  test("renders a tab with data-slot", () => {
    const element = TabsTab({}) as unknown as Element;

    expect(element.props["data-slot"]).toBe("tabs-tab");
  });

  test("TabsTrigger is an alias for TabsTab", () => {
    expect(TabsTrigger).toBe(TabsTab);
  });
});

describe("TabsPanel", () => {
  test("renders a panel with the tabs-content data-slot", () => {
    const element = TabsPanel({}) as unknown as Element;

    expect(element.props["data-slot"]).toBe("tabs-content");
  });

  test("TabsContent is an alias for TabsPanel", () => {
    expect(TabsContent).toBe(TabsPanel);
  });
});
