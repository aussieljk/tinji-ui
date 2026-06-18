import { describe, expect, mock, test } from "bun:test";

mock.module("@tinji/ui/lib/utils", () => ({
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(" "),
}));

const {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
  dataListVariants,
} = await import("../../src/components/data-list");

describe("DataList", () => {
  test("renders a dl element with vertical orientation by default", () => {
    const element = DataList({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("dl");
    expect(element.props["data-slot"]).toBe("data-list");
    expect(element.props["data-orientation"]).toBe("vertical");
    expect(element.props.className as string).toContain("flex flex-col");
  });

  test("supports horizontal orientation", () => {
    const element = DataList({ orientation: "horizontal" }) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-orientation"]).toBe("horizontal");
    expect(element.props.className as string).toContain("grid");
  });

  test("merges custom className", () => {
    const element = DataList({ className: "custom-list" }) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props.className as string).toContain("custom-list");
  });
});

describe("DataList subcomponents", () => {
  test("DataListItem renders a div", () => {
    const element = DataListItem({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("div");
    expect(element.props["data-slot"]).toBe("data-list-item");
  });

  test("DataListLabel renders a dt element", () => {
    const element = DataListLabel({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("dt");
    expect(element.props["data-slot"]).toBe("data-list-label");
    expect(element.props.className as string).toContain(
      "text-muted-foreground",
    );
  });

  test("DataListValue renders a dd element", () => {
    const element = DataListValue({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("dd");
    expect(element.props["data-slot"]).toBe("data-list-value");
    expect(element.props.className as string).toContain("text-foreground");
  });
});

describe("dataListVariants", () => {
  test("returns orientation-specific classes", () => {
    expect(dataListVariants({ orientation: "vertical" })).toContain(
      "flex flex-col",
    );
    expect(dataListVariants({ orientation: "horizontal" })).toContain("grid");
  });
});
