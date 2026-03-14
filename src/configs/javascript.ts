import type {Linter} from "eslint"

import {GLOB_CJS} from "../globs"

export function javascript(): Linter.Config[] {
  return [
    {
      name: "miskamyasa/javascript/overrides",
      files: ["**/*.js", GLOB_CJS],
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
