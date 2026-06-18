// Token model for the Theme Generator.
//
// The library's source globals.css expresses defaults with Tailwind color
// variables, color-mix(), and --alpha(). Those are not directly editable by a
// native color picker, so here we ship concrete hex/rgba equivalents that match
// the default tinji light/dark themes closely enough to edit and preview.

export type ThemeMode = "light" | "dark";

export type TokenKey =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "primary"
  | "primary-foreground"
  | "accent"
  | "accent-foreground"
  | "muted"
  | "muted-foreground"
  | "destructive"
  | "destructive-foreground"
  | "border"
  | "ring";

export type ThemeTokens = Record<TokenKey, string>;

export interface ThemeState {
  radius: number; // in rem
  light: ThemeTokens;
  dark: ThemeTokens;
}

export interface TokenMeta {
  key: TokenKey;
  label: string;
  description: string;
}

// Ordered list used to render the controls. Grouped logically.
export const TOKEN_META: readonly TokenMeta[] = [
  { key: "background", label: "Background", description: "Page background" },
  { key: "foreground", label: "Foreground", description: "Default text" },
  { key: "card", label: "Card", description: "Card surface" },
  {
    key: "card-foreground",
    label: "Card foreground",
    description: "Card text",
  },
  { key: "primary", label: "Primary", description: "Primary actions" },
  {
    key: "primary-foreground",
    label: "Primary foreground",
    description: "Text on primary",
  },
  { key: "accent", label: "Accent", description: "Subtle hover/fill" },
  {
    key: "accent-foreground",
    label: "Accent foreground",
    description: "Text on accent",
  },
  { key: "muted", label: "Muted", description: "Muted surface" },
  {
    key: "muted-foreground",
    label: "Muted foreground",
    description: "Secondary text",
  },
  { key: "destructive", label: "Destructive", description: "Danger actions" },
  {
    key: "destructive-foreground",
    label: "Destructive foreground",
    description: "Danger text/outline",
  },
  { key: "border", label: "Border", description: "Borders & dividers" },
  { key: "ring", label: "Ring", description: "Focus ring" },
] as const;

export const DEFAULT_RADIUS = 0.625; // rem (matches --radius default)

// Light defaults (concrete equivalents of the source tokens).
export const DEFAULT_LIGHT: ThemeTokens = {
  background: "#ffffff",
  foreground: "#262626", // neutral-800
  card: "#ffffff",
  "card-foreground": "#262626",
  primary: "#262626", // neutral-800
  "primary-foreground": "#fafafa", // neutral-50
  accent: "rgba(0, 0, 0, 0.04)",
  "accent-foreground": "#262626",
  muted: "rgba(0, 0, 0, 0.04)",
  "muted-foreground": "#737373", // ~neutral-500
  destructive: "#ef4444", // red-500
  "destructive-foreground": "#b91c1c", // red-700
  border: "rgba(0, 0, 0, 0.08)",
  ring: "#a3a3a3", // neutral-400
};

// Dark defaults.
export const DEFAULT_DARK: ThemeTokens = {
  background: "#0a0a0a", // ~neutral-950 mixed white 4%
  foreground: "#f5f5f5", // neutral-100
  card: "#0f0f0f",
  "card-foreground": "#f5f5f5",
  primary: "#f5f5f5", // neutral-100
  "primary-foreground": "#262626", // neutral-800
  accent: "rgba(255, 255, 255, 0.04)",
  "accent-foreground": "#f5f5f5",
  muted: "rgba(255, 255, 255, 0.04)",
  "muted-foreground": "#8a8a8a",
  destructive: "#f05252", // red-500 mixed white
  "destructive-foreground": "#f87171", // red-400
  border: "rgba(255, 255, 255, 0.06)",
  ring: "#737373", // neutral-500
};

export function defaultThemeState(): ThemeState {
  return {
    radius: DEFAULT_RADIUS,
    light: { ...DEFAULT_LIGHT },
    dark: { ...DEFAULT_DARK },
  };
}

// A color value is "solid" (hex) if it can be fed to <input type="color">.
// rgba()/color-mix values cannot, so the picker is disabled for those while the
// text input still allows free-form editing.
export function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value.trim());
}
