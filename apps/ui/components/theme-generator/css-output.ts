import type { ThemeState, ThemeTokens, TokenKey } from "./tokens";

const TOKEN_ORDER: readonly TokenKey[] = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "primary",
  "primary-foreground",
  "accent",
  "accent-foreground",
  "muted",
  "muted-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "ring",
];

function tokenLines(tokens: ThemeTokens, indent: string): string {
  return TOKEN_ORDER.map((key) => `${indent}--${key}: ${tokens[key]};`).join(
    "\n",
  );
}

// Build the CSS variables to drop on a wrapper element for live preview.
// Includes --radius and the derived --radius-* scale so components that read
// those (buttons, cards, inputs) update too.
export function previewVars(
  tokens: ThemeTokens,
  radius: number,
): React.CSSProperties {
  const vars: Record<string, string> = {
    "--radius": `${radius}rem`,
    "--radius-sm": `calc(${radius}rem - 4px)`,
    "--radius-md": `calc(${radius}rem - 2px)`,
    "--radius-lg": `${radius}rem`,
    "--radius-xl": `calc(${radius}rem + 4px)`,
    "--radius-2xl": `calc(${radius}rem + 8px)`,
  };
  for (const key of TOKEN_ORDER) {
    vars[`--${key}`] = tokens[key];
  }
  return vars as React.CSSProperties;
}

// Produce the paste-ready globals.css block.
export function generateCss(state: ThemeState): string {
  return `:root {
  --radius: ${state.radius}rem;
${tokenLines(state.light, "  ")}
}

.dark {
${tokenLines(state.dark, "  ")}
}`;
}
