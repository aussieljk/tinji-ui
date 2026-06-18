"use client";

import { Badge } from "@/registry/default/ui/badge";
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
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Switch } from "@/registry/default/ui/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";
import { previewVars } from "./css-output";
import type { ThemeMode, ThemeTokens } from "./tokens";

const selectItems = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

interface PreviewProps {
  mode: ThemeMode;
  tokens: ThemeTokens;
  radius: number;
}

// Renders a representative slice of the library inside a wrapper that overrides
// the CSS variables, so the preview reflects the chosen tokens in real time.
// `mode === "dark"` adds the `.dark` class so any dark: variants resolve, while
// the inline vars supply the actual colors.
export function Preview({
  mode,
  tokens,
  radius,
}: PreviewProps): React.ReactElement {
  return (
    <div
      className={mode === "dark" ? "dark" : undefined}
      data-theme-preview={mode}
      style={previewVars(tokens, radius)}
    >
      <div className="flex flex-col gap-6 rounded-xl border bg-background p-6 text-foreground">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm capitalize">{mode} preview</span>
          <div className="flex gap-1.5">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project settings</CardTitle>
            <CardDescription>
              Tokens applied live to this card and its contents.
            </CardDescription>
          </CardHeader>
          <CardPanel className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Project name</FieldLabel>
              <Input placeholder="acme-app" type="text" />
              <FieldDescription>Shown in the dashboard.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Framework</FieldLabel>
              <Select
                aria-label="Select framework"
                defaultValue="next"
                items={selectItems}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  {selectItems.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
            </Field>

            <Label>
              <Switch defaultChecked />
              Enable notifications
            </Label>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTab value="overview">Overview</TabsTab>
                <TabsTab value="activity">Activity</TabsTab>
                <TabsTab value="usage">Usage</TabsTab>
              </TabsList>
              <TabsPanel
                className="pt-3 text-muted-foreground text-sm"
                value="overview"
              >
                Overview content.
              </TabsPanel>
              <TabsPanel
                className="pt-3 text-muted-foreground text-sm"
                value="activity"
              >
                Activity content.
              </TabsPanel>
              <TabsPanel
                className="pt-3 text-muted-foreground text-sm"
                value="usage"
              >
                Usage content.
              </TabsPanel>
            </Tabs>
          </CardPanel>
          <CardFooter className="justify-end gap-2 border-t">
            <Button variant="ghost">Cancel</Button>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
