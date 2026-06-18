#!/usr/bin/env node
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Command } from "commander";
import pc from "picocolors";
import {
  getIndex,
  installUrl,
  isComponent,
  isParticle,
  type RegistryItem,
  THEMES_URL,
} from "./registry.js";

const VERSION = "0.1.0";

/** Run a command, inheriting stdio. Resolves with the exit code. */
function run(command: string, args: string[]): Promise<number> {
  return new Promise((resolvePromise) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("error", (error) => {
      console.error(pc.red(`Failed to run ${command}: ${error.message}`));
      resolvePromise(1);
    });
    child.on("close", (code) => resolvePromise(code ?? 0));
  });
}

const program = new Command();

program
  .name("tinji")
  .description("CLI for the tinji ui component registry")
  .version(VERSION, "-v, --version", "output the version number");

program
  .command("add")
  .description("add tinji ui components to your project")
  .argument(
    "<components...>",
    "component names (e.g. button dialog p-button-1)",
  )
  .action(async (components: string[]) => {
    let failures = 0;
    for (const name of components) {
      const url = installUrl(name);
      console.log(pc.cyan(`\n→ Adding ${pc.bold(name)}`));
      const code = await run("npx", ["shadcn@latest", "add", url]);
      if (code !== 0) {
        failures += 1;
        console.error(pc.red(`  Failed to add ${name} (exit ${code})`));
      }
    }
    if (failures > 0) process.exitCode = 1;
  });

program
  .command("init")
  .description("initialize shadcn in your project for tinji ui")
  .action(async () => {
    const code = await run("npx", ["shadcn@latest", "init"]);
    if (code !== 0) {
      process.exitCode = code;
      return;
    }
    console.log(pc.bold("\nNext steps for tinji ui:"));
    console.log(`  ${pc.cyan("tinji add button")}   add your first component`);
    console.log(
      `  ${pc.cyan("tinji list")}         browse available components`,
    );
    console.log(`  ${pc.cyan("tinji theme")}        open the theme generator`);
    console.log(
      `\nComponents install from ${pc.underline("https://ui.tinji.dev")}.`,
    );
  });

program
  .command("list")
  .description("list available components from the registry")
  .action(async () => {
    let index: Awaited<ReturnType<typeof getIndex>>;
    try {
      index = await getIndex();
    } catch (error) {
      console.error(
        pc.red(error instanceof Error ? error.message : String(error)),
      );
      process.exitCode = 1;
      return;
    }

    const items = index.items ?? [];
    const byName = (a: RegistryItem, b: RegistryItem) =>
      a.name.localeCompare(b.name);
    const components = items.filter(isComponent).sort(byName);
    const particles = items.filter(isParticle).sort(byName);

    const printGroup = (title: string, group: RegistryItem[]) => {
      console.log(pc.bold(`\n${title} (${group.length})`));
      for (const item of group) {
        const desc = item.description ? pc.dim(` — ${item.description}`) : "";
        console.log(`  ${pc.cyan(item.name)}${desc}`);
      }
    };

    if (components.length > 0) printGroup("Components", components);
    if (particles.length > 0) printGroup("Particles", particles);
    if (components.length === 0 && particles.length === 0) {
      console.log(pc.yellow("No components found in the registry."));
    }
    console.log(pc.dim(`\nInstall with: ${pc.reset("tinji add <name>")}`));
  });

program
  .command("theme")
  .description("open the tinji theme generator")
  .option("--print", "print the URL instead of opening it")
  .action(async (options: { print?: boolean }) => {
    if (options.print) {
      console.log(THEMES_URL);
      return;
    }
    const opener =
      process.platform === "darwin"
        ? "open"
        : process.platform === "win32"
          ? "start"
          : "xdg-open";
    console.log(pc.cyan(`Opening ${THEMES_URL}`));
    const code = await run(opener, [THEMES_URL]);
    if (code !== 0) {
      console.log(pc.yellow(`Could not open a browser. Visit: ${THEMES_URL}`));
    }
  });

program
  .command("doctor")
  .description("check your project setup for tinji ui")
  .action(() => {
    const cwd = process.cwd();
    let problems = 0;

    const ok = (msg: string) => console.log(`${pc.green("✓")} ${msg}`);
    const warn = (msg: string) => {
      problems += 1;
      console.log(`${pc.yellow("!")} ${msg}`);
    };

    console.log(pc.bold("tinji doctor\n"));

    // components.json
    if (existsSync(resolve(cwd, "components.json"))) {
      ok("components.json found");
    } else {
      warn(
        "components.json missing — run `tinji init` to set up shadcn config",
      );
    }

    // tailwind
    const hasTailwindConfig = [
      "tailwind.config.ts",
      "tailwind.config.js",
      "tailwind.config.cjs",
      "tailwind.config.mjs",
    ].some((f) => existsSync(resolve(cwd, f)));
    const pkg = readPackageJson(cwd);
    const hasTailwindDep = pkg ? hasDep(pkg, "tailwindcss") : false;
    if (hasTailwindConfig || hasTailwindDep) {
      ok(
        hasTailwindDep
          ? "tailwindcss installed"
          : "tailwind config found (v4 uses CSS config — that's fine)",
      );
    } else {
      warn("tailwindcss not detected — tinji ui requires Tailwind CSS");
    }

    // react version
    const reactVersion = pkg
      ? (pkg.dependencies?.react ?? pkg.devDependencies?.react)
      : undefined;
    if (reactVersion) {
      const major = Number.parseInt(reactVersion.replace(/[^\d]*/, ""), 10);
      if (Number.isFinite(major) && major >= 18) {
        ok(`react ${reactVersion}`);
      } else {
        warn(`react ${reactVersion} — tinji ui works best with React 18+`);
      }
    } else {
      warn("react not found in package.json dependencies");
    }

    console.log("");
    if (problems === 0) {
      console.log(pc.green("Everything looks good. Run `tinji add <name>`."));
    } else {
      console.log(
        pc.yellow(
          `${problems} issue(s) found. See guidance above, then re-run \`tinji doctor\`.`,
        ),
      );
      process.exitCode = 1;
    }
  });

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

function readPackageJson(cwd: string): PackageJson | undefined {
  const path = resolve(cwd, "package.json");
  if (!existsSync(path)) return undefined;
  try {
    return JSON.parse(readFileSync(path, "utf8")) as PackageJson;
  } catch {
    return undefined;
  }
}

function hasDep(pkg: PackageJson, name: string): boolean {
  return Boolean(pkg.dependencies?.[name] ?? pkg.devDependencies?.[name]);
}

program.parseAsync(process.argv).catch((error) => {
  console.error(pc.red(error instanceof Error ? error.message : String(error)));
  process.exitCode = 1;
});
