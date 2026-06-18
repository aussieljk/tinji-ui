import { Switch } from "@tinji/ui/components/switch";

export default {
  States: (
    <div className="flex items-center gap-6 p-6">
      <Switch aria-label="Off" />
      <Switch defaultChecked aria-label="On" />
      <Switch disabled aria-label="Disabled off" />
      <Switch disabled defaultChecked aria-label="Disabled on" />
    </div>
  ),
  WithLabels: (
    <div className="flex flex-col gap-4 p-6">
      <label className="flex items-center gap-3 text-sm">
        <Switch />
        Enable notifications
      </label>
      <label className="flex items-center gap-3 text-sm">
        <Switch defaultChecked />
        Marketing emails
      </label>
    </div>
  ),
};
