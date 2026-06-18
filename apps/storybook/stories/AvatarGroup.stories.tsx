import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@tinji/ui/components/avatar";
import {
  AvatarGroup,
  AvatarGroupOverflow,
} from "@tinji/ui/components/avatar-group";

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const stackClassName =
  "-space-x-2 *:ring-2 *:ring-background hover:*:translate-y-0";

export const Default: Story = {
  render: () => (
    <AvatarGroup className={stackClassName}>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

export const WithOverflow: Story = {
  render: () => (
    <AvatarGroup className={stackClassName}>
      <Avatar>
        <AvatarImage
          alt="user"
          src="https://avatars.githubusercontent.com/u/124599?v=4"
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
      <AvatarGroupOverflow>+4</AvatarGroupOverflow>
    </AvatarGroup>
  ),
};
