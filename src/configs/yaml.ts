import type {Linter} from "eslint"
import yamlPlugin from "eslint-plugin-yml"
import * as yamlParser from "yaml-eslint-parser"

import {GLOB_YAML} from "../globs"

export function yaml(): Linter.Config[] {
  return [
    {
      name: "miskamyasa/yaml/setup",
      plugins: {
        yaml: yamlPlugin as unknown as Record<string, unknown>,
      },
    },
    {
      name: "miskamyasa/yaml/rules",
      files: [GLOB_YAML],
      languageOptions: {
        parser: yamlParser,
      },
      rules: {
        "yaml/block-mapping": "error",
        "yaml/block-sequence": "error",
        "yaml/no-empty-key": "error",
        "yaml/no-empty-sequence-entry": "error",
        "yaml/no-irregular-whitespace": "error",
        "yaml/plain-scalar": "error",
        "yaml/block-mapping-question-indicator-newline": "error",
        "yaml/block-sequence-hyphen-indicator-newline": "error",
        "yaml/flow-mapping-curly-newline": "error",
        "yaml/flow-mapping-curly-spacing": "error",
        "yaml/flow-sequence-bracket-newline": "error",
        "yaml/flow-sequence-bracket-spacing": "error",
        "yaml/indent": ["error", 2],
        "yaml/key-spacing": "error",
        "yaml/no-tab-indent": "error",
        "yaml/quotes": ["error", {"avoidEscape": true, "prefer": "double"}],
        "yaml/spaced-comment": "error",
      },
    },
  ]
}
