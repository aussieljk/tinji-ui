import {
  SegmentedControlNav,
  SegmentedControlNavItem,
} from "@/registry/default/ui/segmented-control";

export default function Particle() {
  return (
    <SegmentedControlNav
      aria-label="Account sections"
      className="w-full max-w-xs"
    >
      <SegmentedControlNavItem aria-current="page" href="#overview">
        Overview
      </SegmentedControlNavItem>
      <SegmentedControlNavItem href="#activity">
        Activity
      </SegmentedControlNavItem>
      <SegmentedControlNavItem href="#settings">
        Settings
      </SegmentedControlNavItem>
    </SegmentedControlNav>
  );
}
