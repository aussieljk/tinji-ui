import type { RegistryCategory } from "@/registry/registry-categories";
import { particles } from "@/registry/registry-particles";

export type Particle = (typeof particles)[number];

export const particleCount = particles.length;

// Category names use spaces (e.g. "alert dialog"); slugify for URLs.
export function categorySlug(category: string) {
  return category.replace(/\s+/g, "-");
}

// Group particles by their first declared category (the canonical grouping),
// sorted alphabetically.
export function groupByCategory(): [string, Particle[]][] {
  const groups = new Map<string, Particle[]>();

  for (const item of particles) {
    const category =
      (item.categories?.[0] as RegistryCategory | undefined) ?? "uncategorized";
    const bucket = groups.get(category) ?? [];
    bucket.push(item);
    groups.set(category, bucket);
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export function getCategoryBySlug(slug: string) {
  return groupByCategory().find(
    ([category]) => categorySlug(category) === slug,
  );
}
