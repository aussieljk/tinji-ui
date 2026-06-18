import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@tinji/ui/components/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="activity">Activity</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="overview" className="py-4 text-sm">
        Overview of your account at a glance.
      </TabsPanel>
      <TabsPanel value="activity" className="py-4 text-sm">
        Recent activity across your projects.
      </TabsPanel>
      <TabsPanel value="settings" className="py-4 text-sm">
        Configure preferences and integrations.
      </TabsPanel>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList variant="underline">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="activity">Activity</TabsTab>
        <TabsTab value="settings">Settings</TabsTab>
      </TabsList>
      <TabsPanel value="overview" className="py-4 text-sm">
        Overview tab content.
      </TabsPanel>
      <TabsPanel value="activity" className="py-4 text-sm">
        Activity tab content.
      </TabsPanel>
      <TabsPanel value="settings" className="py-4 text-sm">
        Settings tab content.
      </TabsPanel>
    </Tabs>
  ),
};
