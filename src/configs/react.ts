import reactPlugin from "@eslint-react/eslint-plugin"
import type {Linter} from "eslint"
import reactHooksPlugin from "eslint-plugin-react-hooks"

import {GLOB_SRC} from "../globs"

export function react(): Linter.Config[] {
  const preset = reactPlugin.configs["recommended-typescript"] as Linter.Config

  return [
    // Plugin setup (global - registers all react plugins)
    {
      name: "miskamyasa/react/setup",
      plugins: {
        ...preset.plugins,
        "react-hooks": reactHooksPlugin as unknown as Record<string, unknown>,
      },
      settings: preset.settings,
    },

    // React rules - scoped to source files only
    {
      name: "miskamyasa/react/rules",
      files: GLOB_SRC,
      rules: preset.rules,
    },

    // React hooks rules - scoped to source files only
    {
      name: "miskamyasa/react/hooks-rules",
      files: GLOB_SRC,
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
      },
    },
  ]
}
