// This port owns its application mappings. Inputs come only from the pinned local palette.


const ghostty = {
files: (f) => [{
    path: `${f.slug}`,
    content: `${f.ansi.normal.map((c, i) => `palette = ${i}=${c}`).join("\n")}
${f.ansi.bright.map((c, i) => `palette = ${i + 8}=${c}`).join("\n")}
background = ${f.r("bg")}
foreground = ${f.r("fg")}
cursor-color = ${f.r("cursor")}
cursor-text = ${f.r("bg")}
selection-background = ${f.r("selection")}
selection-foreground = ${f.r("fg")}
split-divider-color = ${f.r("border")}
`,
  }]
};

export function generate(flavors) {
  return [...flavors.flatMap(f => ghostty.files(f)), ...(ghostty.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
