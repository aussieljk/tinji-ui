import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@tinji/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@tinji/ui/components/card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Project settings</CardTitle>
        <CardDescription>
          Manage how your project is configured and shared.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Cards group related content and actions into a single surface.
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>You are on the Pro plan.</CardDescription>
        <CardAction>
          <Button size="sm" variant="ghost">
            Manage
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Next invoice on the 1st of next month.
      </CardContent>
    </Card>
  ),
};
