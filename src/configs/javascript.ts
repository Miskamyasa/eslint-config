import type {Linter} from "eslint"

import {GLOB_CJS, GLOB_JS} from "../globs"

export function javascript(): Linter.Config[] {
  return [
    {
      name: "miskamyasa/javascript/overrides",
      files: [GLOB_JS, GLOB_CJS],
      languageOptions: {
        globals: {
          require: "readonly",
          module: "readonly",
          __dirname: "readonly",
        },
      },
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ]
}
