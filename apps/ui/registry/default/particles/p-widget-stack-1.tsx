import {
  WidgetStack,
  WidgetStackItem,
} from "@/registry/default/ui/widget-stack";

export default function Particle() {
  return (
    <WidgetStack className="pb-8">
      <WidgetStackItem depth={0}>
        <p className="font-semibold text-sm">Today</p>
        <p className="text-muted-foreground text-sm">3 meetings, 2 tasks due</p>
      </WidgetStackItem>
      <WidgetStackItem depth={1}>
        <p className="font-semibold text-sm">Weather</p>
      </WidgetStackItem>
      <WidgetStackItem depth={2}>
        <p className="font-semibold text-sm">Activity</p>
      </WidgetStackItem>
    </WidgetStack>
  );
}
