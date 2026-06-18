#!/usr/bin/env node

/**
 * Generates the TINJI Particles SKILL.md file by reading the particle registry
 * from the same repository.
 *
 * Usage (from the tinji repo root):
 *   node apps/ui/scripts/generate-particle-index.cjs
 *
 * The script reads apps/ui/registry/registry-particles.ts, extracts all
 * particle names and descriptions, groups them by component type, and writes
 * the SKILL.md file to apps/ui/skills/tinji-particles/SKILL.md.
 */

const fs = require("node:fs");
const path = require("node:path");

const TINJI_PARTICLES_URL = "https://ui.tinji.dev/particles";
const TINJI_JSON_BASE_URL = "https://ui.tinji.dev/r";
const TINJI_REPO_PARTICLES_PATH = "apps/ui/registry/default/particles";

function main() {
  // Resolve tinji repo root relative to this script
  const scriptDir = __dirname;
  const repoRoot = path.resolve(scriptDir, "../../..");
  const registryFile = path.join(
    repoRoot,
    "apps/ui/registry/registry-particles.ts",
  );

  if (!fs.existsSync(registryFile)) {
    console.error(`Registry file not found: ${registryFile}`);
    process.exit(1);
  }

  const content = fs.readFileSync(registryFile, "utf8");

  // Extract name and description pairs
  const nameRegex = /name:\s*"(p-[^"]+)"/g;
  const descRegex = /description:\s*"([^"]+)"/g;

  const names = [];
  const descs = [];
  for (
    let m = nameRegex.exec(content);
    m !== null;
    m = nameRegex.exec(content)
  ) {
    names.push(m[1]);
  }
  for (
    let m = descRegex.exec(content);
    m !== null;
    m = descRegex.exec(content)
  ) {
    descs.push(m[1]);
  }

  if (names.length !== descs.length) {
    console.error(
      `Mismatch: ${names.length} names vs ${descs.length} descriptions`,
    );
    process.exit(1);
  }

  // Group by component type (e.g. p-input-group-23 -> input-group)
  const grouped = {};
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const desc = descs[i];
    const match = name.match(/^p-(.+)-(\d+)$/);
    const componentType = match ? match[1] : name.replace(/^p-/, "");

    if (!grouped[componentType]) grouped[componentType] = [];
    grouped[componentType].push({ name, desc });
  }

  const sortedTypes = Object.keys(grouped).sort();

  // Build SKILL.md content
  const lines = [];

  lines.push("---");
  lines.push("name: tinji-particles");
  lines.push(
    "description: Index of all Tinji UI particle examples. Use when implementing UI features to find copy-paste-ready component patterns built on tinji primitives. Each particle has a description and a JSON URL for easy installation.",
  );
  lines.push(
    "compatibility: Requires tinji UI components installed in the project.",
  );
  lines.push("license: MIT");
  lines.push("metadata:");
  lines.push("  author: aussieljk");
  lines.push("---");
  lines.push("");
  lines.push("# Tinji UI Particles Index");
  lines.push("");
  lines.push(
    `Particles are copy-paste-ready UI patterns built on [tinji](https://ui.tinji.dev) primitives. Browse them visually at <${TINJI_PARTICLES_URL}>.`,
  );
  lines.push("");
  lines.push("## How to use this skill");
  lines.push("");
  lines.push(
    `1. Describe the UI you need (e.g. "a form with validation", "a dialog with a form inside", "tabs with icons").`,
  );
  lines.push(
    "2. Search this index for matching particles by component type and description.",
  );
  lines.push(
    "3. Fetch the JSON URL to get the full source code of the particle.",
  );
  lines.push("4. Adapt the particle code to your needs.");
  lines.push("");
  lines.push("## JSON URL pattern");
  lines.push("");
  lines.push("Each particle has a JSON manifest at:");
  lines.push("```");
  lines.push(`${TINJI_JSON_BASE_URL}/<particle-name>.json`);
  lines.push("```");
  lines.push(`For example: \`${TINJI_JSON_BASE_URL}/p-accordion-1.json\``);
  lines.push("");
  lines.push("## Source code");
  lines.push("");
  lines.push(
    `Particle source files live in this repo at \`${TINJI_REPO_PARTICLES_PATH}/\`.`,
  );
  lines.push("");
  lines.push("## Updating this index");
  lines.push("");
  lines.push("Run the generator script from the tinji repo root:");
  lines.push("```bash");
  lines.push("node apps/ui/scripts/generate-particle-index.cjs");
  lines.push("```");
  lines.push("");
  lines.push(
    `Total: **${names.length} particles** across **${sortedTypes.length} component types**`,
  );
  lines.push("");

  // Table of contents
  lines.push("## Component types");
  lines.push("");
  for (const type of sortedTypes) {
    const count = grouped[type].length;
    lines.push(`- [${type}](#${type}) (${count})`);
  }
  lines.push("");

  // Particle listings by component type
  lines.push("---");
  lines.push("");

  for (const type of sortedTypes) {
    const particles = grouped[type];
    lines.push(`### ${type}`);
    lines.push("");
    for (const p of particles) {
      lines.push(`- ${p.desc} | [JSON](${TINJI_JSON_BASE_URL}/${p.name}.json)`);
    }
    lines.push("");
  }

  const skillContent = lines.join("\n");

  // Write to SKILL.md in the tinji-particles skill directory
  const skillFile = path.join(
    repoRoot,
    "apps/ui/skills/tinji-particles/SKILL.md",
  );
  fs.writeFileSync(skillFile, skillContent, "utf8");

  console.log(`Generated ${skillFile}`);
  console.log(
    `  ${names.length} particles across ${sortedTypes.length} component types`,
  );
}

main();
