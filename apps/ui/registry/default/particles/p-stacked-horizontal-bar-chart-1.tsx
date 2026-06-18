import { StackedHorizontalBarChart } from "@/registry/default/ui/stacked-horizontal-bar-chart";

const data = [
  { label: "Direct", value: 4200 },
  { label: "Referral", value: 3100 },
  { label: "Organic", value: 2400 },
  { label: "Social", value: 1500 },
  { label: "Email", value: 800 },
];

export default function Particle() {
  return (
    <StackedHorizontalBarChart
      aria-label="Traffic sources"
      className="max-w-md"
      data={data}
    />
  );
}
