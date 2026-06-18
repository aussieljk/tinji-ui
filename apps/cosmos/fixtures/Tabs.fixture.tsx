import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@tinji/ui/components/tabs";

export default {
  Default: (
    <div className="max-w-md p-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="pt-3 text-sm">
          Manage your account details here.
        </TabsContent>
        <TabsContent value="password" className="pt-3 text-sm">
          Change your password here.
        </TabsContent>
        <TabsContent value="team" className="pt-3 text-sm">
          Invite and manage team members.
        </TabsContent>
      </Tabs>
    </div>
  ),
  Underline: (
    <div className="max-w-md p-6">
      <Tabs defaultValue="overview">
        <TabsList variant="underline">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="pt-3 text-sm">
          Overview content.
        </TabsContent>
        <TabsContent value="activity" className="pt-3 text-sm">
          Activity content.
        </TabsContent>
        <TabsContent value="settings" className="pt-3 text-sm">
          Settings content.
        </TabsContent>
      </Tabs>
    </div>
  ),
};
