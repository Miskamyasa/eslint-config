export const GLOB_JS = "**/*.?([cm])js"
export const GLOB_JSX = "**/*.jsx"
export const GLOB_CJS = "**/*.cjs"
export const GLOB_TS = "**/*.?([cm])ts"
export const GLOB_TSX = "**/*.tsx"

export const GLOB_SRC = [
  GLOB_JS,
  GLOB_JSX,
  GLOB_TS,
  GLOB_TSX,
]

export const GLOB_YAML = "**/*.y?(a)ml"
export const GLOB_TOML = "**/*.toml"
export const GLOB_JSON = "**/*.json"
export const GLOB_JSONC = "**/*.jsonc"
export const GLOB_JSON5 = "**/*.json5"
export const GLOB_MARKDOWN = "**/*.md"
export const GLOB_CSS = "**/*.css"
export const GLOB_POSTCSS = "**/*.{p,post}css"
export const GLOB_SCSS = "**/*.scss"
export const GLOB_LESS = "**/*.less"
export const GLOB_HTML = "**/*.htm?(l)"
export const GLOB_XML = "**/*.xml"
export const GLOB_SVG = "**/*.svg"
export const GLOB_GRAPHQL = "**/*.{g,graph}ql"

export const GLOB_EXCLUDE = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb",
]
