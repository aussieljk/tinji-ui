import type { Meta, StoryObj } from "@storybook/react";
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlRadioGroup,
  SegmentedControlRadioItem,
} from "@tinji/ui/components/segmented-control";
import { useState } from "react";

const meta = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function ToggleControl() {
    const [value, setValue] = useState<string[]>(["monthly"]);
    return (
      <SegmentedControl
        aria-label="Billing period"
        className="w-full"
        onValueChange={setValue}
        value={value}
      >
        <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
        <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
        <SegmentedControlItem value="lifetime">Lifetime</SegmentedControlItem>
      </SegmentedControl>
    );
  },
};

export const RadioGroup: Story = {
  render: () => (
    <SegmentedControlRadioGroup
      aria-label="Theme"
      className="w-full"
      defaultValue="system"
    >
      <SegmentedControlRadioItem value="light">Light</SegmentedControlRadioItem>
      <SegmentedControlRadioItem value="dark">Dark</SegmentedControlRadioItem>
      <SegmentedControlRadioItem value="system">
        System
      </SegmentedControlRadioItem>
    </SegmentedControlRadioGroup>
  ),
};
