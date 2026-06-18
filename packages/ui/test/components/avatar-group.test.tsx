import { beforeEach, describe, expect, mock, test } from "bun:test";

const cnCalls: unknown[][] = [];

function cnMock(...inputs: unknown[]) {
  cnCalls.push(inputs);
  return inputs.filter(Boolean).join(" ");
}

mock.module("@tinji/ui/lib/utils", () => ({
  cn: cnMock,
}));

// Avatar / AvatarFallback render via the base-ui avatar primitive. Stub them so
// AvatarGroupOverflow can be invoked as a plain function and inspected.
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

const { AvatarGroup, AvatarGroupOverflow } = await import(
  "../../src/components/avatar-group"
);

describe("AvatarGroup", () => {
  beforeEach(() => {
    cnCalls.length = 0;
  });

  test("renders a div with base attributes", () => {
    const element = AvatarGroup({}) as unknown as {
      type: string;
      props: Record<string, unknown>;
    };

    expect(element.type).toBe("div");
    expect(element.props["data-slot"]).toBe("avatar-group");
  });

  test("applies layout styles", () => {
    const element = AvatarGroup({}) as unknown as {
      props: Record<string, unknown>;
    };

    const className = element.props.className as string;
    expect(className).toContain("flex");
    expect(className).toContain("items-center");
    expect(className).toContain("gap-2");
  });

  test("merges custom className", () => {
    const element = AvatarGroup({ className: "custom-group" }) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props.className as string).toContain("custom-group");
  });

  test("passes through additional props", () => {
    const element = AvatarGroup({
      "aria-label": "Team members",
    }) as unknown as { props: Record<string, unknown> };

    expect(element.props["aria-label"]).toBe("Team members");
  });
});

describe("AvatarGroupOverflow", () => {
  beforeEach(() => {
    cnCalls.length = 0;
  });

  test("renders an Avatar with overflow data-slot", () => {
    const element = AvatarGroupOverflow({ children: "+3" }) as unknown as {
      props: Record<string, unknown>;
    };

    expect(element.props["data-slot"]).toBe("avatar-group-overflow");
  });

  test("renders overflow content inside a fallback", () => {
    const element = AvatarGroupOverflow({ children: "+5" }) as unknown as {
      props: { children: { props: Record<string, unknown> } };
    };

    const fallback = element.props.children;
    expect(fallback.props.children).toBe("+5");
  });
});
