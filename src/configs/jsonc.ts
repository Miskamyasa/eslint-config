import type {Linter} from "eslint"
import jsoncPlugin from "eslint-plugin-jsonc"
import * as jsoncParser from "jsonc-eslint-parser"

import {GLOB_JSON, GLOB_JSON5, GLOB_JSONC} from "../globs"

const JSON_FILES = [GLOB_JSON, GLOB_JSONC, GLOB_JSON5]

export function jsonc(): Linter.Config[] {
  // Preset structure: [0] plugin setup, [1] parser+overrides (has files), [2] rules (no files)
  const preset = jsoncPlugin.configs["flat/recommended-with-jsonc"]

  return [
    // Plugin setup (global - registers the jsonc plugin)
    {
      name: "miskamyasa/jsonc/setup",
      plugins: preset[0].plugins,
    },

    // Parser and basic overrides from preset (already scoped to JSON files)
    {
      ...preset[1],
      name: "miskamyasa/jsonc/parser-overrides",
    },

    // Recommended rules - scoped to JSON files
    {
      name: "miskamyasa/jsonc/recommended-rules",
      files: JSON_FILES,
      rules: preset[2].rules,
    },

    // Stylistic rules
    {
      name: "miskamyasa/jsonc/stylistic-rules",
      files: JSON_FILES,
      languageOptions: {
        parser: jsoncParser,
      },
      rules: {
        "jsonc/indent": ["error", 2],
        "jsonc/key-spacing": "error",
        "jsonc/array-bracket-spacing": ["error", "never"],
        "jsonc/sort-keys": "off",
      },
    },

    // JSON-specific rules (strict JSON doesn't allow trailing commas)
    {
      name: "miskamyasa/jsonc/json-rules",
      files: [GLOB_JSON],
      languageOptions: {
        parser: jsoncParser,
      },
      rules: {
        "jsonc/comma-dangle": ["error", "never"],
      },
    },
  ]
}
