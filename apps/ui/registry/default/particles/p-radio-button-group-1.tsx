import {
  RadioButtonGroup,
  RadioButtonGroupItem,
} from "@/registry/default/ui/radio-button-group";

export default function Particle() {
  return (
    <RadioButtonGroup
      aria-label="Select a plan"
      className="w-full max-w-xs"
      defaultValue="pro"
    >
      <RadioButtonGroupItem value="starter">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Starter</span>
          <span className="text-muted-foreground text-xs">
            For individuals getting started.
          </span>
        </div>
      </RadioButtonGroupItem>
      <RadioButtonGroupItem value="pro">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Pro</span>
          <span className="text-muted-foreground text-xs">
            For growing teams and businesses.
          </span>
        </div>
      </RadioButtonGroupItem>
      <RadioButtonGroupItem value="enterprise">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Enterprise</span>
          <span className="text-muted-foreground text-xs">
            Advanced controls and support.
          </span>
        </div>
      </RadioButtonGroupItem>
    </RadioButtonGroup>
  );
}
