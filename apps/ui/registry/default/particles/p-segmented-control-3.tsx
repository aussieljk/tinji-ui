import {
  SegmentedControlRadioGroup,
  SegmentedControlRadioItem,
} from "@/registry/default/ui/segmented-control";

export default function Particle() {
  return (
    <SegmentedControlRadioGroup
      aria-label="Theme"
      className="w-full max-w-xs"
      defaultValue="system"
    >
      <SegmentedControlRadioItem value="light">Light</SegmentedControlRadioItem>
      <SegmentedControlRadioItem value="dark">Dark</SegmentedControlRadioItem>
      <SegmentedControlRadioItem value="system">
        System
      </SegmentedControlRadioItem>
    </SegmentedControlRadioGroup>
  );
}
