"use client";

import { useId } from "react";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { isHexColor, type TokenMeta } from "./tokens";

interface ColorControlProps {
  meta: TokenMeta;
  value: string;
  onChange: (value: string) => void;
}

export function ColorControl({
  meta,
  value,
  onChange,
}: ColorControlProps): React.ReactElement {
  const id = useId();
  const hex = isHexColor(value);

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm" htmlFor={`${id}-text`}>
        {meta.label}
      </Label>
      <div className="flex items-center gap-2">
        <span className="relative inline-flex size-8 shrink-0 overflow-hidden rounded-md border">
          <span
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: value }}
          />
          <input
            aria-label={`${meta.label} color picker`}
            className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
            disabled={!hex}
            id={`${id}-picker`}
            onChange={(e) => onChange(e.target.value)}
            type="color"
            value={hex ? value : "#000000"}
          />
        </span>
        <Input
          aria-label={`${meta.label} value`}
          className="font-mono text-xs"
          id={`${id}-text`}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          type="text"
          value={value}
        />
      </div>
      <p className="text-muted-foreground text-xs">{meta.description}</p>
    </div>
  );
}
