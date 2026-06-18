"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export type DatePickerProps = {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  formatStr?: string;
  disabled?: boolean;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnSelect?: boolean;
};

export function DatePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  formatStr = "PPP",
  disabled,
  className,
  open: openProp,
  defaultOpen,
  onOpenChange,
  closeOnSelect = true,
}: DatePickerProps): React.ReactElement {
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(
    defaultValue,
  );
  const value = valueProp ?? uncontrolled;

  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false,
  );
  const open = openProp ?? uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const handleSelect = (next: Date | undefined) => {
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
    if (closeOnSelect && next) setOpen(false);
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button
            className={cn("w-full justify-start font-normal", className)}
            disabled={disabled}
            variant="outline"
          />
        }
      >
        <CalendarIcon aria-hidden="true" />
        {value ? (
          format(value, formatStr)
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverPopup align="start">
        <Calendar
          defaultMonth={value}
          mode="single"
          onSelect={handleSelect}
          selected={value}
        />
      </PopoverPopup>
    </Popover>
  );
}
