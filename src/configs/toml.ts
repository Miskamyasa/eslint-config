import type {Linter} from "eslint"
import tomlPlugin from "eslint-plugin-toml"
import * as tomlParser from "toml-eslint-parser"

import {GLOB_TOML} from "../globs"

export function toml(): Linter.Config[] {
  return [
    {
      name: "miskamyasa/toml/setup",
      plugins: {
        toml: tomlPlugin as unknown as Record<string, unknown>,
      },
    },
    {
      name: "miskamyasa/toml/rules",
      files: [GLOB_TOML],
      languageOptions: {
        parser: tomlParser,
      },
      rules: {
        "toml/comma-style": "error",
        "toml/keys-order": "error",
        "toml/no-space-dots": "error",
        "toml/no-unreadable-number-separator": "error",
        "toml/precision-of-fractional-seconds": "error",
        "toml/precision-of-integer": "error",
        "toml/tables-order": "error",
        "toml/array-bracket-newline": "error",
        "toml/array-bracket-spacing": "error",
        "toml/array-element-newline": "error",
        "toml/indent": ["error", 2],
        "toml/inline-table-curly-spacing": "error",
        "toml/key-spacing": "error",
        "toml/padding-line-between-pairs": "error",
        "toml/padding-line-between-tables": "error",
        "toml/quoted-keys": "error",
        "toml/spaced-comment": "error",
        "toml/table-bracket-spacing": "error",
      },
    },
  ]
}
