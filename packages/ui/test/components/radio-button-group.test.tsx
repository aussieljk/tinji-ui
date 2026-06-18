import { describe, expect, mock, test } from "bun:test";

mock.module("@tinji/ui/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
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

const { RadioButtonGroup, RadioButtonGroupItem } = await import(
  "../../src/components/radio-button-group"
);

describe("RadioButtonGroup", () => {
  test("renders a radio group with data-slot", () => {
    const element = RadioButtonGroup({}) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-slot"]).toBe("radio-button-group");
    expect(element.props.className as string).toContain("flex flex-col");
  });

  test("merges custom className", () => {
    const element = RadioButtonGroup({
      className: "custom-group",
    }) as unknown as { props: Record<string, unknown> };

    expect(element.props.className as string).toContain("custom-group");
  });

  test("passes through additional props", () => {
    const element = RadioButtonGroup({
      "aria-label": "Plan",
    }) as unknown as { props: Record<string, unknown> };

    expect(element.props["aria-label"]).toBe("Plan");
  });
});

describe("RadioButtonGroupItem", () => {
  test("renders a radio root with data-slot", () => {
    const element = RadioButtonGroupItem({}) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-slot"]).toBe("radio-button-group-item");
  });

  test("renders children inside the radio root", () => {
    const element = RadioButtonGroupItem({
      children: "Option label",
    }) as unknown as { props: Record<string, unknown> };

    expect(element.props.children).toBe("Option label");
  });

  test("applies interactive and focus styles", () => {
    const element = RadioButtonGroupItem({}) as unknown as {
      props: Record<string, unknown>;
    };

    const className = element.props.className as string;
    expect(className).toContain("cursor-pointer");
    expect(className).toContain("focus-visible:ring-2");
  });
});
