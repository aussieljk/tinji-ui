/**
 * Thin client over the public tinji registry served at `TINJI_REGISTRY_BASE`
 * (defaults to https://ui.tinji.dev/r).
 *
 *   - `<base>/registry.json`  -> index of all items ({ name, type, ... })
 *   - `<base>/<name>.json`    -> a single item, including file contents
 *
 * Components are `registry:ui` items; particles are `registry:block` items
 * whose names are prefixed with `p-`.
 */

export const DEFAULT_REGISTRY_BASE = "https://ui.tinji.dev/r";
export const THEMES_URL = "https://ui.tinji.dev/themes";

export function getRegistryBase(): string {
  const base = process.env.TINJI_REGISTRY_BASE?.trim();
  return (base && base.length > 0 ? base : DEFAULT_REGISTRY_BASE).replace(
    /\/+$/,
    "",
  );
}

export type RegistryItem = {
  name: string;
  type?: string;
  description?: string;
  categories?: string[];
};

export type RegistryIndex = {
  homepage?: string;
  items: RegistryItem[];
};

/** Public install command for a registry item name. */
export function installUrl(name: string): string {
  return `${getRegistryBase()}/${name}.json`;
}

export async function getIndex(): Promise<RegistryIndex> {
  const url = `${getRegistryBase()}/registry.json`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Request failed (${res.status} ${res.statusText}): ${url}`);
  }
  return (await res.json()) as RegistryIndex;
}

export function isParticle(item: RegistryItem): boolean {
  return item.type === "registry:block" || item.name.startsWith("p-");
}

export function isComponent(item: RegistryItem): boolean {
  return item.type === "registry:ui";
}
