"use client";

import { Button } from "@tinji/ui/components/button";
import { Calendar } from "@tinji/ui/components/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@tinji/ui/components/popover";
import { cn } from "@tinji/ui/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";

export type DateRangePickerProps = {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  formatStr?: string;
  disabled?: boolean;
  className?: string;
  numberOfMonths?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function DateRangePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  formatStr = "LLL dd, y",
  disabled,
  className,
  numberOfMonths = 2,
  open: openProp,
  defaultOpen,
  onOpenChange,
}: DateRangePickerProps): React.ReactElement {
  const [uncontrolled, setUncontrolled] = React.useState<DateRange | undefined>(
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

  const handleSelect = (next: DateRange | undefined) => {
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
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
        {value?.from ? (
          value.to ? (
            <>
              {format(value.from, formatStr)} - {format(value.to, formatStr)}
            </>
          ) : (
            format(value.from, formatStr)
          )
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverPopup align="start">
        <Calendar
          defaultMonth={value?.from}
          mode="range"
          numberOfMonths={numberOfMonths}
          onSelect={handleSelect}
          selected={value}
        />
      </PopoverPopup>
    </Popover>
  );
}
