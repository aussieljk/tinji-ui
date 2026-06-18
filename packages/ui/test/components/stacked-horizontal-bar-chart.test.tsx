import { beforeEach, describe, expect, mock, test } from "bun:test";
import * as actualReact from "react";

mock.module("@tinji/ui/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
}));

// Provide a controllable context value so the hook-consuming subcomponents
// (Segment, useStackedHorizontalBarChart) can be invoked as plain functions.
let contextValue: { data: unknown[]; total: number } | null = {
  data: [],
  total: 100,
};

mock.module("react", () => ({
  ...actualReact,
  default: actualReact,
  useContext: () => contextValue,
}));

const {
  StackedHorizontalBarChart,
  StackedHorizontalBarChartTrack,
  StackedHorizontalBarChartSegment,
  StackedHorizontalBarChartLegend,
  StackedHorizontalBarChartLegendItem,
  useStackedHorizontalBarChart,
} = await import("../../src/components/stacked-horizontal-bar-chart");

describe("StackedHorizontalBarChart", () => {
  beforeEach(() => {
    contextValue = { data: [], total: 100 };
  });

  test("computes the total from non-negative values", () => {
    const element = StackedHorizontalBarChart({
      data: [
        { label: "A", value: 30 },
        { label: "B", value: 20 },
        { label: "C", value: -5 },
      ],
    }) as unknown as { props: { value: { total: number } } };

    expect(element.props.value.total).toBe(50);
  });

  test("provides the chart context value", () => {
    const element = StackedHorizontalBarChart({
      data: [{ label: "A", value: 10 }],
    }) as unknown as { props: { value: { data: unknown[]; total: number } } };

    expect(element.props.value.data).toHaveLength(1);
    expect(element.props.value.total).toBe(10);
  });
});

describe("StackedHorizontalBarChartTrack", () => {
  test("exposes an img role with a default label", () => {
    const element = StackedHorizontalBarChartTrack({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("div");
    expect(element.props.role).toBe("img");
    expect(element.props["aria-label"]).toBe("Stacked bar chart");
    expect(element.props["data-slot"]).toBe(
      "stacked-horizontal-bar-chart-track",
    );
  });

  test("allows overriding the aria-label", () => {
    const element = StackedHorizontalBarChartTrack({
      "aria-label": "Budget breakdown",
    }) as unknown as { props: Record<string, unknown> };

    expect(element.props["aria-label"]).toBe("Budget breakdown");
  });
});

describe("StackedHorizontalBarChartSegment", () => {
  beforeEach(() => {
    contextValue = { data: [], total: 100 };
  });

  test("derives width percentage from the context total", () => {
    const element = StackedHorizontalBarChartSegment({
      value: 25,
      label: "Rent",
    }) as unknown as { props: { style: { width: string } } };

    expect(element.props.style.width).toBe("25%");
  });

  test("describes itself with a percentage aria-label", () => {
    const element = StackedHorizontalBarChartSegment({
      value: 40,
      label: "Food",
    }) as unknown as { props: Record<string, unknown> };

    expect(element.props["aria-label"]).toBe("Food: 40%");
  });

  test("applies an inline background color when provided", () => {
    const element = StackedHorizontalBarChartSegment({
      value: 10,
      color: "#ff0000",
    }) as unknown as { props: { style: { backgroundColor?: string } } };

    expect(element.props.style.backgroundColor).toBe("#ff0000");
  });
});

describe("StackedHorizontalBarChartLegend", () => {
  test("renders a legend container", () => {
    const element = StackedHorizontalBarChartLegend({}) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-slot"]).toBe(
      "stacked-horizontal-bar-chart-legend",
    );
  });

  test("legend item renders label and value", () => {
    const element = StackedHorizontalBarChartLegendItem({
      label: "Savings",
      value: 12,
    }) as unknown as { props: { children: unknown[] } };

    expect(element.props["data-slot" as keyof typeof element.props]).toBe(
      "stacked-horizontal-bar-chart-legend-item",
    );
    expect(Array.isArray(element.props.children)).toBe(true);
  });
});

describe("useStackedHorizontalBarChart", () => {
  test("returns the context when present", () => {
    contextValue = { data: [{ label: "A", value: 1 }], total: 1 };
    expect(useStackedHorizontalBarChart().total).toBe(1);
  });

  test("throws when used outside a provider", () => {
    contextValue = null;
    expect(() => useStackedHorizontalBarChart()).toThrow(
      /must be used within a StackedHorizontalBarChart/,
    );
  });
});
