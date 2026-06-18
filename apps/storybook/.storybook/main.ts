import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  async viteFinal(viteConfig, { configType }) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(viteConfig, {
      // @tailwindcss/vite handles Tailwind v4 compilation for our styles.css.
      plugins: [react(), tailwindcss()],
      // Pre-bundle React so the workspace-linked @tinji/ui resolves a single copy.
      optimizeDeps: {
        include: ["react", "react-dom", "react/jsx-runtime"],
      },
      build:
        configType === "PRODUCTION"
          ? { chunkSizeWarningLimit: 2000 }
          : undefined,
    });
  },
};

export default config;
