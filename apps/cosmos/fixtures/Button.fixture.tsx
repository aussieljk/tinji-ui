import { Button } from "@tinji/ui/components/button";
import { PlusIcon } from "lucide-react";

export default {
  Variants: (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="destructive-outline">Destructive outline</Button>
    </div>
  ),
  Sizes: (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra large</Button>
    </div>
  ),
  States: (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button>
        <PlusIcon />
        With icon
      </Button>
    </div>
  ),
};
