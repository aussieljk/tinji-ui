"use client";

import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { Separator } from "@/registry/default/ui/separator";
import { Switch } from "@/registry/default/ui/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";
import { Textarea } from "@/registry/default/ui/textarea";

const notificationPrefs = [
  {
    defaultChecked: true,
    description: "Receive emails about your account activity.",
    id: "notify-account",
    label: "Account activity",
  },
  {
    defaultChecked: true,
    description: "Get notified when someone mentions you.",
    id: "notify-mentions",
    label: "Mentions",
  },
  {
    defaultChecked: false,
    description: "Product updates, news, and announcements.",
    id: "notify-marketing",
    label: "Marketing emails",
  },
];

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="font-semibold text-2xl tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences.
        </p>
      </div>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTab value="profile">Profile</TabsTab>
          <TabsTab value="account">Account</TabsTab>
          <TabsTab value="notifications">Notifications</TabsTab>
        </TabsList>

        <TabsPanel className="mt-4" value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                This information will be displayed publicly.
              </CardDescription>
            </CardHeader>
            <CardPanel className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16 text-base">
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <Button type="button" variant="outline">
                  Change avatar
                </Button>
              </div>
              <Field name="name">
                <FieldLabel>Name</FieldLabel>
                <Input defaultValue="Olivia Martin" type="text" />
              </Field>
              <Field name="bio">
                <FieldLabel>Bio</FieldLabel>
                <Textarea
                  defaultValue="Product designer based in Melbourne."
                  rows={3}
                />
                <FieldDescription>
                  Brief description for your profile.
                </FieldDescription>
              </Field>
            </CardPanel>
            <CardFooter className="justify-end gap-2">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsPanel>

        <TabsPanel className="mt-4" value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Update your account details and security.
              </CardDescription>
            </CardHeader>
            <CardPanel className="flex flex-col gap-6">
              <Field name="email">
                <FieldLabel>Email</FieldLabel>
                <Input defaultValue="olivia@acme.com" type="email" />
              </Field>
              <Field name="username">
                <FieldLabel>Username</FieldLabel>
                <Input defaultValue="oliviam" type="text" />
                <FieldDescription>
                  Your unique handle on the platform.
                </FieldDescription>
              </Field>
              <Separator />
              <Label className="items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span>Two-factor authentication</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Add an extra layer of security to your account.
                  </span>
                </div>
                <Switch defaultChecked />
              </Label>
            </CardPanel>
            <CardFooter className="justify-end gap-2">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsPanel>

        <TabsPanel className="mt-4" value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardPanel className="flex flex-col gap-4">
              {notificationPrefs.map((pref, index) => (
                <div key={pref.id}>
                  {index > 0 ? <Separator className="mb-4" /> : null}
                  <Label className="items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span>{pref.label}</span>
                      <span className="font-normal text-muted-foreground text-xs">
                        {pref.description}
                      </span>
                    </div>
                    <Switch defaultChecked={pref.defaultChecked} />
                  </Label>
                </div>
              ))}
            </CardPanel>
            <CardFooter className="justify-end">
              <Button type="submit">Save preferences</Button>
            </CardFooter>
          </Card>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
