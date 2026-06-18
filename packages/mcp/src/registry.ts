/**
 * Thin client over the public tinji registry served at `TINJI_REGISTRY_BASE`
 * (defaults to https://ui.tinji.dev/r).
 *
 * The registry exposes:
 *   - `<base>/registry.json`  -> index of all items ({ name, type, ... })
 *   - `<base>/<name>.json`    -> a single item, including file contents
 *
 * Components are `registry:ui` items; particles are `registry:block` items
 * whose names are prefixed with `p-`.
 */

export const DEFAULT_REGISTRY_BASE = "https://ui.tinji.dev/r";

export function getRegistryBase(): string {
  const base = process.env.TINJI_REGISTRY_BASE?.trim();
  return (base && base.length > 0 ? base : DEFAULT_REGISTRY_BASE).replace(
    /\/+$/,
    "",
  );
}

export type RegistryItemType =
  | "registry:ui"
  | "registry:block"
  | "registry:lib"
  | "registry:hook"
  | "registry:font"
  | "registry:style"
  | (string & {});

export type RegistryFile = {
  path: string;
  type?: string;
  content?: string;
  target?: string;
};

export type RegistryItem = {
  name: string;
  type?: RegistryItemType;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  categories?: string[];
  files?: RegistryFile[];
};

export type RegistryIndex = {
  homepage?: string;
  items: RegistryItem[];
};

/** Build the public install command for a given registry item name. */
export function installCommand(name: string): string {
  return `npx shadcn@latest add ${getRegistryBase()}/${name}.json`;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Request failed (${res.status} ${res.statusText}): ${url}`);
  }
  return (await res.json()) as T;
}

// Cache the index for the lifetime of the process; it is large and rarely
// changes within a single session.
let indexPromise: Promise<RegistryIndex> | undefined;

export function getIndex(): Promise<RegistryIndex> {
  if (!indexPromise) {
    indexPromise = fetchJson<RegistryIndex>(
      `${getRegistryBase()}/registry.json`,
    ).catch((error) => {
      // Reset so a later call can retry after a transient failure.
      indexPromise = undefined;
      throw error;
    });
  }
  return indexPromise;
}

export function isParticle(item: RegistryItem): boolean {
  return item.type === "registry:block" || item.name.startsWith("p-");
}

export function isComponent(item: RegistryItem): boolean {
  return item.type === "registry:ui";
}

/** All component (registry:ui) items from the index. */
export async function listComponents(): Promise<RegistryItem[]> {
  const { items } = await getIndex();
  return items.filter(isComponent);
}

/** All particle (registry:block) items from the index. */
export async function listParticles(): Promise<RegistryItem[]> {
  const { items } = await getIndex();
  return items.filter(isParticle);
}

/** Fetch a single item (with file contents) by name. */
export async function getItem(name: string): Promise<RegistryItem> {
  return fetchJson<RegistryItem>(`${getRegistryBase()}/${name}.json`);
}

/** Look up an item's index entry (no file contents) by name. */
export async function findIndexItem(
  name: string,
): Promise<RegistryItem | undefined> {
  const { items } = await getIndex();
  return items.find((item) => item.name === name);
}

/** Concatenate all file contents of an item into a single source string. */
export function itemSource(item: RegistryItem): string {
  const files = item.files ?? [];
  if (files.length === 0) return "";
  if (files.length === 1) return files[0]?.content ?? "";
  return files
    .map((file) => `// ${file.path}\n${file.content ?? ""}`)
    .join("\n\n");
}
