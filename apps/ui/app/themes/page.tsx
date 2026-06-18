"use client";

import { CheckIcon, CopyIcon, RotateCcwIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Slider, SliderValue } from "@/registry/default/ui/slider";
import { Tabs, TabsList, TabsTab } from "@/registry/default/ui/tabs";
import { ColorControl } from "@/components/theme-generator/color-control";
import { generateCss } from "@/components/theme-generator/css-output";
import { Preview } from "@/components/theme-generator/preview";
import {
  defaultThemeState,
  type ThemeMode,
  type ThemeState,
  TOKEN_META,
  type TokenKey,
} from "@/components/theme-generator/tokens";

export default function ThemesPage(): React.ReactElement {
  const [theme, setTheme] = useState<ThemeState>(defaultThemeState);
  const [editMode, setEditMode] = useState<ThemeMode>("light");
  const [copied, setCopied] = useState(false);

  const setToken = useCallback(
    (mode: ThemeMode, key: TokenKey, value: string) => {
      setTheme((prev) => ({
        ...prev,
        [mode]: { ...prev[mode], [key]: value },
      }));
    },
    [],
  );

  const setRadius = useCallback((radius: number) => {
    setTheme((prev) => ({ ...prev, radius }));
  }, []);

  const css = useMemo(() => generateCss(theme), [theme]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }, [css]);

  const activeTokens = theme[editMode];

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-heading font-semibold text-3xl">Theme Generator</h1>
        <p className="text-muted-foreground">
          Tune the radius and semantic tokens, preview live, then copy the CSS
          into your <code className="font-mono text-sm">globals.css</code>.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3 rounded-xl border p-4">
            <Field>
              <div className="flex w-full items-center justify-between">
                <FieldLabel>Base radius</FieldLabel>
                <span className="font-mono text-muted-foreground text-sm">
                  {theme.radius.toFixed(3)}rem
                </span>
              </div>
              <Slider
                aria-label="Base radius"
                max={2}
                min={0}
                onValueChange={(value) =>
                  setRadius(Array.isArray(value) ? value[0] : value)
                }
                step={0.025}
                value={theme.radius}
              >
                <SliderValue />
              </Slider>
            </Field>
          </section>

          <section className="flex flex-col gap-4 rounded-xl border p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm">Colors</span>
              <Tabs
                onValueChange={(value) => setEditMode(value as ThemeMode)}
                value={editMode}
              >
                <TabsList>
                  <TabsTab value="light">Light</TabsTab>
                  <TabsTab value="dark">Dark</TabsTab>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TOKEN_META.map((meta) => (
                <ColorControl
                  key={meta.key}
                  meta={meta}
                  onChange={(value) => setToken(editMode, meta.key, value)}
                  value={activeTokens[meta.key]}
                />
              ))}
            </div>

            <Button
              className="self-start"
              onClick={() => setTheme(defaultThemeState())}
              size="sm"
              variant="outline"
            >
              <RotateCcwIcon aria-hidden="true" />
              Reset to defaults
            </Button>
          </section>

          {/* CSS output */}
          <section className="flex flex-col gap-3 rounded-xl border p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm">globals.css</span>
              <Button onClick={handleCopy} size="sm">
                {copied ? (
                  <CheckIcon aria-hidden="true" />
                ) : (
                  <CopyIcon aria-hidden="true" />
                )}
                {copied ? "Copied" : "Copy CSS"}
              </Button>
            </div>
            <pre className="max-h-80 overflow-auto rounded-lg border bg-muted p-3 font-mono text-muted-foreground text-xs">
              <code>{css}</code>
            </pre>
          </section>
        </div>

        {/* Preview */}
        <div className="grid gap-6 xl:grid-cols-2">
          <Preview mode="light" radius={theme.radius} tokens={theme.light} />
          <Preview mode="dark" radius={theme.radius} tokens={theme.dark} />
        </div>
      </div>
    </div>
  );
}
