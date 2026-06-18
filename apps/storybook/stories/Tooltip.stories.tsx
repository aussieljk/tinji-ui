import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@tinji/ui/components/button";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@tinji/ui/components/tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex items-center justify-center p-16">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
      <TooltipPopup>Add to library</TooltipPopup>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline">{side}</Button>} />
          <TooltipPopup side={side}>Tooltip on {side}</TooltipPopup>
        </Tooltip>
      ))}
    </div>
  ),
};
