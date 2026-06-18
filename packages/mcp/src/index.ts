#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  findIndexItem,
  getItem,
  installCommand,
  isParticle,
  itemSource,
  listComponents,
  listParticles,
} from "./registry.js";

const server = new McpServer({
  name: "@tinji/mcp",
  version: "0.1.0",
});

// The SDK's registerTool generic infers the handler args from the zod input
// shape, which trips TS2589 ("excessively deep") on some zod/SDK combos. This
// thin wrapper keeps the exact runtime behavior without the pathological
// type instantiation; zod still validates inputs at runtime.
const registerTool = server.registerTool.bind(server) as (
  name: string,
  config: {
    title?: string;
    description?: string;
    inputSchema?: Record<string, z.ZodTypeAny>;
  },
  // biome-ignore lint/suspicious/noExplicitAny: handler args are validated at runtime by the zod inputSchema
  handler: (args: any) => unknown,
) => void;

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

function errorResult(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return {
    isError: true as const,
    content: [{ type: "text" as const, text: `Error: ${message}` }],
  };
}

registerTool(
  "list_components",
  {
    title: "List tinji components",
    description:
      "List all tinji ui components (Base UI primitives) with names and descriptions.",
    inputSchema: {},
  },
  async () => {
    try {
      const components = await listComponents();
      const lines = components.map((c) =>
        c.description ? `- ${c.name}: ${c.description}` : `- ${c.name}`,
      );
      return textResult(
        `${components.length} tinji components:\n\n${lines.join("\n")}`,
      );
    } catch (error) {
      return errorResult(error);
    }
  },
);

registerTool(
  "list_particles",
  {
    title: "List tinji particles",
    description:
      "List all tinji particles (copy-paste-ready example blocks built on tinji primitives) with names and descriptions.",
    inputSchema: {},
  },
  async () => {
    try {
      const particles = await listParticles();
      const lines = particles.map((p) =>
        p.description ? `- ${p.name}: ${p.description}` : `- ${p.name}`,
      );
      return textResult(
        `${particles.length} tinji particles:\n\n${lines.join("\n")}`,
      );
    } catch (error) {
      return errorResult(error);
    }
  },
);

registerTool(
  "search_components",
  {
    title: "Search tinji components and particles",
    description:
      "Search tinji components and particles by name, description, or category. Returns matching items with their type and install command.",
    inputSchema: {
      query: z
        .string()
        .min(1)
        .describe("Search text, e.g. 'dialog' or 'loading button'"),
    },
  },
  async ({ query }: { query: string }) => {
    try {
      const [components, particles] = await Promise.all([
        listComponents(),
        listParticles(),
      ]);
      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      const matches = [...components, ...particles].filter((item) => {
        const haystack = [
          item.name,
          item.description ?? "",
          ...(item.categories ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return terms.every((term) => haystack.includes(term));
      });

      if (matches.length === 0) {
        return textResult(`No components or particles match "${query}".`);
      }

      const lines = matches.map((item) => {
        const kind = isParticle(item) ? "particle" : "component";
        const desc = item.description ? ` — ${item.description}` : "";
        return `- ${item.name} (${kind})${desc}\n  install: ${installCommand(item.name)}`;
      });
      return textResult(
        `${matches.length} result(s) for "${query}":\n\n${lines.join("\n")}`,
      );
    } catch (error) {
      return errorResult(error);
    }
  },
);

registerTool(
  "get_component",
  {
    title: "Get a tinji component",
    description:
      "Fetch a tinji component by name. Returns its source code, description, dependencies, and the shadcn install command.",
    inputSchema: {
      name: z
        .string()
        .min(1)
        .describe("Component name, e.g. 'button' or 'dialog' (no 'p-' prefix)"),
    },
  },
  async ({ name }: { name: string }) => {
    try {
      const item = await getItem(name);
      const source = itemSource(item);
      const deps = item.dependencies?.length
        ? item.dependencies.join(", ")
        : "none";
      const registryDeps = item.registryDependencies?.length
        ? item.registryDependencies.join(", ")
        : "none";
      const parts = [
        `# ${item.name}`,
        item.description ? `\n${item.description}` : "",
        `\nInstall:\n${installCommand(item.name)}`,
        `\nnpm dependencies: ${deps}`,
        `registry dependencies: ${registryDeps}`,
        `\nSource:\n\n\`\`\`tsx\n${source}\n\`\`\``,
      ];
      return textResult(parts.filter(Boolean).join("\n"));
    } catch (error) {
      return errorResult(error);
    }
  },
);

registerTool(
  "get_particle",
  {
    title: "Get a tinji particle",
    description:
      "Fetch a tinji particle (example block) by name. Returns its source code, description, and the shadcn install command.",
    inputSchema: {
      name: z
        .string()
        .min(1)
        .describe("Particle name, e.g. 'p-button-1' or 'p-dialog-2'"),
    },
  },
  async ({ name }: { name: string }) => {
    try {
      const item = await getItem(name);
      const source = itemSource(item);
      const registryDeps = item.registryDependencies?.length
        ? item.registryDependencies.join(", ")
        : "none";
      const parts = [
        `# ${item.name}`,
        item.description ? `\n${item.description}` : "",
        item.categories?.length
          ? `\ncategories: ${item.categories.join(", ")}`
          : "",
        `\nInstall:\n${installCommand(item.name)}`,
        `\nregistry dependencies: ${registryDeps}`,
        `\nSource:\n\n\`\`\`tsx\n${source}\n\`\`\``,
      ];
      return textResult(parts.filter(Boolean).join("\n"));
    } catch (error) {
      return errorResult(error);
    }
  },
);

registerTool(
  "get_install_command",
  {
    title: "Get install command",
    description:
      "Return the shadcn CLI install command for a tinji component or particle by name.",
    inputSchema: {
      name: z
        .string()
        .min(1)
        .describe("Component or particle name, e.g. 'button' or 'p-button-1'"),
    },
  },
  async ({ name }: { name: string }) => {
    try {
      // Verify the item exists in the index for a clearer error than a 404.
      const indexItem = await findIndexItem(name);
      if (!indexItem) {
        return textResult(
          `No registry item named "${name}" was found. Use list_components / list_particles or search_components to find valid names.\n\nIf you are sure it exists, the command would be:\n${installCommand(name)}`,
        );
      }
      return textResult(installCommand(name));
    } catch (error) {
      return errorResult(error);
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdout is reserved for the MCP protocol; log to stderr.
  console.error("@tinji/mcp server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error starting @tinji/mcp:", error);
  process.exit(1);
});
