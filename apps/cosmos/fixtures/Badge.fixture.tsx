import { Badge } from "@tinji/ui/components/badge";

export default {
  Variants: (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
  Sizes: (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};
