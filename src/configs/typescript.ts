import type {Linter} from "eslint"
import {configs, parser} from "typescript-eslint"

import {GLOB_SRC} from "../globs"

export function typescript(options: {tsconfigRootDir: string}): Linter.Config[] {
  // Extract the unique rule sets from the presets.
  // Each preset array is [base, eslint-recommended, rules].
  // base = plugin + parser setup (global, no rules)
  // eslint-recommended = already scoped to TS files
  // rules = the actual rule config (needs scoping)
  const recommended = configs.recommended as Linter.Config[]
  const strictTypeChecked = configs.strictTypeChecked as Linter.Config[]
  const stylisticTypeChecked = configs.stylisticTypeChecked as Linter.Config[]

  return [
    // Plugin + parser setup (shared across all presets, only need it once)
    {
      name: "miskamyasa/typescript/setup",
      plugins: recommended[0].plugins,
      languageOptions: {
        parser,
      },
    },

    // ESLint-recommended overrides for TS files (already scoped by preset)
    {
      ...recommended[1],
      name: "miskamyasa/typescript/eslint-recommended",
    },

    // Recommended rules - scoped to source files
    {
      name: "miskamyasa/typescript/recommended-rules",
      files: GLOB_SRC,
      rules: recommended[2].rules,
    },

    // Strict type-checked rules - scoped to source files
    {
      name: "miskamyasa/typescript/strict-type-checked-rules",
      files: GLOB_SRC,
      rules: strictTypeChecked[2].rules,
    },

    // Stylistic type-checked rules - scoped to source files
    {
      name: "miskamyasa/typescript/stylistic-type-checked-rules",
      files: GLOB_SRC,
      rules: stylisticTypeChecked[2].rules,
    },

    // Parser options with type information
    {
      name: "miskamyasa/typescript/language-options",
      files: GLOB_SRC,
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: options.tsconfigRootDir,
        },
      },
    },

    // Project-specific rule overrides
    {
      name: "miskamyasa/typescript/rules",
      files: GLOB_SRC,
      rules: {
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/restrict-template-expressions": [
          "error",
          {
            allowNumber: true,
            allowBoolean: false,
            allowAny: false,
            allowNullish: false,
            allowRegExp: false,
          },
        ],
        "@typescript-eslint/no-misused-promises": [
          "error",
          {checksVoidReturn: {attributes: false}},
        ],
      },
    },
  ]
}
