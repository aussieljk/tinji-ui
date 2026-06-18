import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlRadioGroup,
  SegmentedControlRadioItem,
} from "@tinji/ui/components/segmented-control";

export default {
  // Toggle-group based: value is an array.
  ToggleGroup: (
    <div className="p-6">
      <SegmentedControl defaultValue={["weekly"]}>
        <SegmentedControlItem value="daily">Daily</SegmentedControlItem>
        <SegmentedControlItem value="weekly">Weekly</SegmentedControlItem>
        <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
      </SegmentedControl>
    </div>
  ),
  // Radio-group based: single string value.
  RadioGroup: (
    <div className="p-6">
      <SegmentedControlRadioGroup defaultValue="list">
        <SegmentedControlRadioItem value="list">List</SegmentedControlRadioItem>
        <SegmentedControlRadioItem value="grid">Grid</SegmentedControlRadioItem>
        <SegmentedControlRadioItem value="board">
          Board
        </SegmentedControlRadioItem>
      </SegmentedControlRadioGroup>
    </div>
  ),
};
