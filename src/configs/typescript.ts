import type {Linter} from "eslint"
import {configs} from "typescript-eslint"

export function typescript(options: {tsconfigRootDir: string}): Linter.Config[] {
  return [
    ...configs.recommended,
    ...configs.strictTypeChecked,
    ...configs.stylisticTypeChecked,
    {
      name: "miskamyasa/typescript/language-options",
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: options.tsconfigRootDir,
        },
      },
    },
    {
      name: "miskamyasa/typescript/rules",
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
