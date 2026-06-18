import { Input } from "@tinji/ui/components/input";

export default {
  Sizes: (
    <div className="flex max-w-xs flex-col gap-4 p-6">
      <Input size="sm" placeholder="Small" />
      <Input size="default" placeholder="Default" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
  States: (
    <div className="flex max-w-xs flex-col gap-4 p-6">
      <Input placeholder="Placeholder" />
      <Input defaultValue="With a value" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" aria-invalid />
    </div>
  ),
  Types: (
    <div className="flex max-w-xs flex-col gap-4 p-6">
      <Input type="email" placeholder="you@example.com" />
      <Input type="password" placeholder="Password" />
      <Input type="search" placeholder="Search…" />
    </div>
  ),
};
