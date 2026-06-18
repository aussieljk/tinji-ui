import { beforeEach, describe, expect, mock, test } from "bun:test";
import * as actualReact from "react";

mock.module("@tinji/ui/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
}));

// Stub the stateful hooks so DateField can be invoked as a plain function.
// useState records the latest setter so controlled-update behavior is testable.
let lastSetState: ((value: unknown) => void) | undefined;

mock.module("react", () => ({
  ...actualReact,
  default: actualReact,
  useState: (init: unknown) => {
    const value = typeof init === "function" ? (init as () => unknown)() : init;
    lastSetState = () => {};
    return [value, lastSetState];
  },
  useRef: (init: unknown) => ({ current: init ?? null }),
}));

const { DateField, DateFieldSegment } = await import(
  "../../src/components/date-field"
);

type Element = { type: unknown; props: Record<string, unknown> };

describe("DateField", () => {
  beforeEach(() => {
    lastSetState = undefined;
  });

  test("renders a labelled group", () => {
    const element = DateField({}) as unknown as Element;

    expect(element.type).toBe("div");
    expect(element.props.role).toBe("group");
    expect(element.props["aria-label"]).toBe("Date");
    expect(element.props["data-slot"]).toBe("date-field");
  });

  test("allows overriding the group aria-label", () => {
    const element = DateField({
      "aria-label": "Birth date",
    }) as unknown as Element;

    expect(element.props["aria-label"]).toBe("Birth date");
  });

  test("renders day, month, and year segments separated by slashes", () => {
    const element = DateField({}) as unknown as {
      props: { children: unknown[] };
    };

    // Three React fragments, one per segment.
    expect(element.props.children).toHaveLength(3);
  });

  test("merges custom className", () => {
    const element = DateField({
      className: "custom-date",
    }) as unknown as Element;

    expect(element.props.className as string).toContain("custom-date");
  });
});

describe("DateFieldSegment", () => {
  test.each([
    ["day", "Day", "dd", 2],
    ["month", "Month", "mm", 2],
    ["year", "Year", "yyyy", 4],
  ] as const)("%s segment exposes accessible config", (segment, label, placeholder, length) => {
    const element = DateFieldSegment({ segment }) as unknown as Element;

    expect(element.type).toBe("input");
    expect(element.props["aria-label"]).toBe(label);
    expect(element.props.placeholder).toBe(placeholder);
    expect(element.props.size).toBe(length);
    expect(element.props.inputMode).toBe("numeric");
    expect(element.props["data-slot"]).toBe("date-field-segment");
  });
});
