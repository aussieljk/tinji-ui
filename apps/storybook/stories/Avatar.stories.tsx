import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@tinji/ui/components/avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        alt="@tinji"
        src="https://avatars.githubusercontent.com/u/124599?v=4"
      />
      <AvatarFallback>TJ</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>LK</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar className="size-6">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-12 text-sm">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};
