"use client";

import { cn } from "@tinji/ui/lib/utils";
import * as React from "react";

export type StackedHorizontalBarChartDatum = {
  label: string;
  value: number;
  color?: string;
};

const defaultColors = [
  "bg-primary",
  "bg-info",
  "bg-success",
  "bg-warning",
  "bg-destructive",
];

const StackedHorizontalBarChartContext = React.createContext<{
  data: StackedHorizontalBarChartDatum[];
  total: number;
} | null>(null);

function useStackedHorizontalBarChart() {
  const context = React.useContext(StackedHorizontalBarChartContext);
  if (!context) {
    throw new Error(
      "StackedHorizontalBarChart compound components must be used within a StackedHorizontalBarChart.",
    );
  }
  return context;
}

export type StackedHorizontalBarChartProps = Omit<
  React.ComponentProps<"div">,
  "children"
> & {
  data?: StackedHorizontalBarChartDatum[];
  children?: React.ReactNode;
};

export function StackedHorizontalBarChart({
  className,
  data = [],
  children,
  "aria-label": ariaLabel,
  ...props
}: StackedHorizontalBarChartProps): React.ReactElement {
  const total = data.reduce((sum, datum) => sum + Math.max(0, datum.value), 0);

  return (
    <StackedHorizontalBarChartContext.Provider value={{ data, total }}>
      <div
        className={cn("flex w-full flex-col gap-3", className)}
        data-slot="stacked-horizontal-bar-chart"
        {...props}
      >
        {children ?? (
          <>
            <StackedHorizontalBarChartTrack aria-label={ariaLabel}>
              {data.map((datum, index) => (
                <StackedHorizontalBarChartSegment
                  className={
                    datum.color
                      ? undefined
                      : defaultColors[index % defaultColors.length]
                  }
                  color={datum.color}
                  key={datum.label}
                  label={datum.label}
                  value={datum.value}
                />
              ))}
            </StackedHorizontalBarChartTrack>
            <StackedHorizontalBarChartLegend>
              {data.map((datum, index) => (
                <StackedHorizontalBarChartLegendItem
                  color={datum.color}
                  indicatorClassName={
                    datum.color
                      ? undefined
                      : defaultColors[index % defaultColors.length]
                  }
                  key={datum.label}
                  label={datum.label}
                  value={datum.value}
                />
              ))}
            </StackedHorizontalBarChartLegend>
          </>
        )}
      </div>
    </StackedHorizontalBarChartContext.Provider>
  );
}

export function StackedHorizontalBarChartTrack({
  className,
  children,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      aria-label={ariaLabel ?? "Stacked bar chart"}
      className={cn(
        "flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full bg-input",
        className,
      )}
      data-slot="stacked-horizontal-bar-chart-track"
      role="img"
      {...props}
    >
      {children}
    </div>
  );
}

export type StackedHorizontalBarChartSegmentProps =
  React.ComponentProps<"div"> & {
    value: number;
    label?: string;
    color?: string;
  };

export function StackedHorizontalBarChartSegment({
  className,
  style,
  value,
  label,
  color,
  ...props
}: StackedHorizontalBarChartSegmentProps): React.ReactElement {
  const context = React.useContext(StackedHorizontalBarChartContext);
  const total = context?.total;
  const percent =
    total && total > 0 ? (Math.max(0, value) / total) * 100 : value;

  return (
    <div
      aria-label={
        label !== undefined
          ? `${label}: ${Math.round(percent)}%`
          : `${Math.round(percent)}%`
      }
      className={cn(
        "h-full min-w-0.5 first:rounded-s-full last:rounded-e-full",
        !color && "bg-muted",
        className,
      )}
      data-slot="stacked-horizontal-bar-chart-segment"
      style={{
        width: `${percent}%`,
        ...(color ? { backgroundColor: color } : undefined),
        ...style,
      }}
      {...props}
    />
  );
}

export function StackedHorizontalBarChartLegend({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}
      data-slot="stacked-horizontal-bar-chart-legend"
      {...props}
    />
  );
}

export type StackedHorizontalBarChartLegendItemProps =
  React.ComponentProps<"div"> & {
    label: string;
    value?: number;
    color?: string;
    indicatorClassName?: string;
  };

export function StackedHorizontalBarChartLegendItem({
  className,
  label,
  value,
  color,
  indicatorClassName,
  ...props
}: StackedHorizontalBarChartLegendItemProps): React.ReactElement {
  return (
    <div
      className={cn("flex items-center gap-2 text-sm", className)}
      data-slot="stacked-horizontal-bar-chart-legend-item"
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2.5 shrink-0 rounded-full bg-muted",
          indicatorClassName,
        )}
        style={color ? { backgroundColor: color } : undefined}
      />
      <span className="text-muted-foreground">{label}</span>
      {value !== undefined ? (
        <span className="font-medium text-foreground tabular-nums">
          {value}
        </span>
      ) : null}
    </div>
  );
}

export { useStackedHorizontalBarChart };
