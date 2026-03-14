import type {Linter} from "eslint"
import {createTypeScriptImportResolver} from "eslint-import-resolver-typescript"
import {flatConfigs as importConfigs} from "eslint-plugin-import-x"
import unusedImports from "eslint-plugin-unused-imports"

import {GLOB_SRC} from "../globs"

function createImportsConfig(): Linter.Config[] {
  return [
    // Plugin setup (global - registers import-x and unused-imports plugins)
    {
      name: "miskamyasa/imports/setup",
      plugins: {
        ...importConfigs.recommended.plugins,
        "unused-imports": unusedImports,
      },
    },

    // Recommended rules - scoped to source files
    {
      name: "miskamyasa/imports/recommended-rules",
      files: GLOB_SRC,
      rules: importConfigs.recommended.rules,
    },

    // React settings - scoped to source files
    {
      name: "miskamyasa/imports/react",
      files: GLOB_SRC,
      settings: importConfigs.react.settings,
      languageOptions: importConfigs.react.languageOptions,
    },

    // TypeScript resolver
    {
      name: "miskamyasa/imports/typescript",
      files: GLOB_SRC,
      settings: {
        "import-x/resolver-next": [
          createTypeScriptImportResolver(),
        ],
      },
    },

    // Custom rules - scoped to source files
    {
      name: "miskamyasa/imports/rules",
      files: GLOB_SRC,
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
