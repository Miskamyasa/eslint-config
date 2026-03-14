import eslint from "@eslint/js"
import type {Linter} from "eslint"

import {
  formatters,
  imports,
  javascript,
  jsonc,
  markdown,
  react,
  stylistic,
  toml,
  typescript,
  yaml,
} from "./configs/index"
import {GLOB_EXCLUDE, GLOB_SRC} from "./globs"
import type {OptionsConfig} from "./types"

/**
 * Construct an array of ESLint flat config items.
 *
 * @param options - The options for generating the ESLint configurations.
 * @param userConfigs - Additional user configurations to be appended.
 * @returns The composed ESLint configurations.
 *
 * @example
 * ```js
 * // eslint.config.js
 * import createConfig from "@miskamyasa/eslint-config"
 *
 * export default createConfig({
 *   tsconfigRootDir: import.meta.dirname,
 * })
 * ```
 */
export function createConfig(
  options: OptionsConfig = {},
  ...userConfigs: Linter.Config[]
): Linter.Config[] {
  const {
    tsconfigRootDir = process.cwd(),
    ignores = [],
    jsonc: enableJsonc = true,
    yaml: enableYaml = true,
    toml: enableToml = true,
    markdown: enableMarkdown = true,
    formatters: enableFormatters = false,
  } = options

  return [
    // Global ignores
    {
      name: "miskamyasa/ignores",
      ignores: [
        ...GLOB_EXCLUDE,
        ...ignores,
      ],
    },

    // ESLint recommended rules (scoped to source files -
    // core rules use JS-specific sourceCode APIs incompatible with other languages)
    {
      name: "miskamyasa/eslint/recommended",
      files: GLOB_SRC,
      rules: eslint.configs.recommended.rules,
    },

    // TypeScript
    ...typescript({tsconfigRootDir}),

    // Imports
    ...imports(),

    // React
    ...react(),

    // Stylistic
    ...stylistic(),

    // JSONC/JSON
    ...(enableJsonc ? jsonc() : []),

    // YAML
    ...(enableYaml ? yaml() : []),

    // TOML
    ...(enableToml ? toml() : []),

    // Markdown
    ...(enableMarkdown ? markdown() : []),

    // Formatters (Prettier via ESLint for CSS, HTML, XML, etc.)
    ...(enableFormatters ? formatters(enableFormatters) : []),

    // JavaScript/CJS overrides (must come after TypeScript rules)
    ...javascript(),

    // User configs (appended last for maximum override power)
    ...userConfigs,
  ]
}
