"use client";

import { useState } from "react";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/registry/default/ui/segmented-control";

export default function Particle() {
  const [value, setValue] = useState<string[]>(["monthly"]);

  return (
    <SegmentedControl
      aria-label="Billing period"
      className="w-full max-w-xs"
      onValueChange={setValue}
      value={value}
    >
      <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
      <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
      <SegmentedControlItem value="lifetime">Lifetime</SegmentedControlItem>
    </SegmentedControl>
  );
}
