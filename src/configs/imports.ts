import type {Linter} from "eslint"
import {createTypeScriptImportResolver} from "eslint-import-resolver-typescript"
import {flatConfigs as imports} from "eslint-plugin-import-x"
import unusedImports from "eslint-plugin-unused-imports"

function createImportsConfig(): Linter.Config[] {
  return [
    {
      ...imports.recommended,
      name: "miskamyasa/imports/recommended",
    },
    {
      ...imports.react,
      name: "miskamyasa/imports/react",
    },
    {
      name: "miskamyasa/imports/typescript",
      settings: {
        "import-x/resolver-next": [
          createTypeScriptImportResolver(),
        ],
      },
    },
    {
      name: "miskamyasa/imports/rules",
      plugins: {
        "unused-imports": unusedImports,
      },
      rules: {
        "import-x/namespace": "off",
        "import-x/newline-after-import": [
          "error",
          {count: 1},
        ],
        "import-x/named": "off",
        "import-x/no-cycle": [
          "error",
          {ignoreExternal: true, maxDepth: 10},
        ],
        "import-x/no-duplicates": "error",
        "import-x/no-useless-path-segments": "error",
        "import-x/no-anonymous-default-export": "error",
        "import-x/no-default-export": "error",
        "import-x/order": [
          "error",
          {
            alphabetize: {caseInsensitive: true, order: "asc"},
            groups: ["builtin", "external", "internal", "parent", "sibling"],
            "newlines-between": "always",
            pathGroups: [{group: "external", pattern: "react+(|-native)", position: "before"}],
            pathGroupsExcludedImportTypes: ["react", "react-native"],
          },
        ],
        "import-x/no-absolute-path": "error",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "error",
          {vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_"},
        ],
      },
    },
  ]
}

export {createImportsConfig as imports}
