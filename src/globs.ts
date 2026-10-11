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

export const GLOB_JSON = "**/*.json"
export const GLOB_JSONC = "**/*.jsonc"
export const GLOB_JSON5 = "**/*.json5"

export const GLOB_EXCLUDE = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb",
]
