import { DateField } from "@/registry/default/ui/date-field";

export default function Particle() {
  return (
    <DateField
      aria-label="Date of birth"
      defaultValue={{ day: "12", month: "08", year: "1995" }}
    />
  );
}
