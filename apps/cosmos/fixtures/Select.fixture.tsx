import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tinji/ui/components/select";

function FruitSelect({ size }: { size?: "sm" | "default" | "lg" }) {
  return (
    <Select defaultValue="apple">
      <SelectTrigger size={size} className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default {
  Default: (
    <div className="p-6">
      <FruitSelect />
    </div>
  ),
  Sizes: (
    <div className="flex flex-col items-start gap-4 p-6">
      <FruitSelect size="sm" />
      <FruitSelect size="default" />
      <FruitSelect size="lg" />
    </div>
  ),
  Placeholder: (
    <div className="p-6">
      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">Option one</SelectItem>
          <SelectItem value="two">Option two</SelectItem>
          <SelectItem value="three">Option three</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
