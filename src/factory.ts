import eslint from "@eslint/js"
import type {Linter} from "eslint"

import {imports, javascript, react, stylistic, typescript} from "./configs/index"
import {GLOB_EXCLUDE} from "./globs"
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

    // ESLint recommended
    {
      ...eslint.configs.recommended,
      name: "miskamyasa/eslint/recommended",
    },

    // TypeScript
    ...typescript({tsconfigRootDir}),

    // Imports
    ...imports(),

    // React
    ...react(),

    // Stylistic
    ...stylistic(),

    // JavaScript/CJS overrides (must come after TypeScript rules)
    ...javascript(),

    // User configs (appended last for maximum override power)
    ...userConfigs,
  ]
}
