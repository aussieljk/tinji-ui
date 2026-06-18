import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@tinji/ui/components/input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "number"],
    },
  },
  args: {
    placeholder: "Enter text…",
    size: "default",
    type: "text",
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const Search: Story = {
  args: { type: "search", placeholder: "Search…" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Default" size="default" />
      <Input placeholder="Large" size="lg" />
    </div>
  ),
};
