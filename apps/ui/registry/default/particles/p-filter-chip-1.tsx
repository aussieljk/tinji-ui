"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import {
  FilterChip,
  FilterChipRemove,
} from "@/registry/default/ui/filter-chip";

export default function Particle() {
  const [selected, setSelected] = useState(true);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterChip
        onClick={() => setSelected((value) => !value)}
        selected={selected}
      >
        {selected ? <CheckIcon aria-hidden="true" /> : null}
        Active
        {selected ? (
          <FilterChipRemove
            aria-label="Clear active filter"
            onClick={(event) => {
              event.stopPropagation();
              setSelected(false);
            }}
          />
        ) : null}
      </FilterChip>
    </div>
  );
}
