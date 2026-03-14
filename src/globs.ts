export const GLOB_JS = "**/*.js"
export const GLOB_CJS = "**/*.cjs"
export const GLOB_TS = "**/*.ts"
export const GLOB_TSX = "**/*.tsx"

export const GLOB_SRC = [
  GLOB_JS,
  GLOB_CJS,
  GLOB_TS,
  GLOB_TSX,
]

export const GLOB_EXCLUDE = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb",
]
