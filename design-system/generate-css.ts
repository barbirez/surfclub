import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { tokens } from "./tokens";
import { tokenKeyToCssVar, sidebarKeyToCssVar } from "./utils";

const GLOBALS_CSS = resolve(__dirname, "../src/app/globals.css");
const START_MARKER = "/* DESIGN-TOKENS-START */";
const END_MARKER = "/* DESIGN-TOKENS-END */";

function generateRootBlock(): string {
  const lines: string[] = ["  /* Colors */"];
  for (const [key, value] of Object.entries(tokens.colors)) {
    lines.push(`  ${tokenKeyToCssVar(key)}: ${value};`);
  }

  lines.push("", "  /* Sidebar */");
  for (const [key, value] of Object.entries(tokens.sidebar)) {
    lines.push(`  ${sidebarKeyToCssVar(key)}: ${value};`);
  }

  lines.push("", "  /* Radius */");
  for (const [key, value] of Object.entries(tokens.radius)) {
    lines.push(`  --radius-${key}: ${value};`);
  }

  return `:root {\n${lines.join("\n")}\n}`;
}

function run() {
  const css = readFileSync(GLOBALS_CSS, "utf-8");
  const startIdx = css.indexOf(START_MARKER);
  const endIdx = css.indexOf(END_MARKER);
  const newBlock = `${START_MARKER}\n${generateRootBlock()}\n${END_MARKER}`;

  let newCss: string;
  if (startIdx !== -1 && endIdx !== -1) {
    newCss =
      css.slice(0, startIdx) + newBlock + css.slice(endIdx + END_MARKER.length);
  } else {
    newCss = css + "\n\n" + newBlock + "\n";
  }

  const isCheck = process.argv.includes("--check");
  if (isCheck) {
    if (css !== newCss) {
      console.error("Design tokens are out of sync. Run: npm run tokens");
      process.exit(1);
    }
    console.log("Design tokens are in sync ✓");
  } else {
    writeFileSync(GLOBALS_CSS, newCss);
    console.log("Design tokens written to globals.css ✓");
  }
}

run();
