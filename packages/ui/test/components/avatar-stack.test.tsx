import { beforeEach, describe, expect, mock, test } from "bun:test";

const cnCalls: unknown[][] = [];

function cnMock(...inputs: unknown[]) {
  cnCalls.push(inputs);
  return inputs.filter(Boolean).join(" ");
}

mock.module("@tinji/ui/lib/utils", () => ({
  cn: cnMock,
}));

mock.module("@tinji/ui/components/avatar", () => ({
  Avatar: (props: Record<string, unknown>) => ({
    type: "avatar",
    props,
  }),
  AvatarFallback: (props: Record<string, unknown>) => ({
    type: "avatar-fallback",
    props,
  }),
}));

const { AvatarStack, AvatarStackOverflow } = await import(
  "../../src/components/avatar-stack"
);

describe("AvatarStack", () => {
  beforeEach(() => {
    cnCalls.length = 0;
  });

  test("renders a div with base attributes", () => {
    const element = AvatarStack({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("div");
    expect(element.props["data-slot"]).toBe("avatar-stack");
  });

  test("applies overlapping layout styles", () => {
    const element = AvatarStack({}) as unknown as {
      props: Record<string, unknown>;
    };

    const className = element.props.className as string;
    expect(className).toContain("flex");
    expect(className).toContain("-space-x-2");
    expect(className).toContain("ring-background");
  });

  test("merges custom className", () => {
    const element = AvatarStack({ className: "custom-stack" }) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props.className as string).toContain("custom-stack");
  });

  test("passes through additional props", () => {
    const element = AvatarStack({
      "aria-label": "Collaborators",
    }) as unknown as { props: Record<string, unknown> };

    expect(element.props["aria-label"]).toBe("Collaborators");
  });
});

describe("AvatarStackOverflow", () => {
  test("renders an Avatar with overflow data-slot", () => {
    const element = AvatarStackOverflow({ children: "+2" }) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-slot"]).toBe("avatar-stack-overflow");
  });

  test("renders overflow content inside a fallback", () => {
    const element = AvatarStackOverflow({ children: "+9" }) as unknown as {
      props: { children: { props: Record<string, unknown> } };
    };

    const fallback = element.props.children;
    expect(fallback.props.children).toBe("+9");
  });
});
