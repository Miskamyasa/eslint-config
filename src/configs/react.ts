import reactPlugin from "@eslint-react/eslint-plugin"
import type {Linter} from "eslint"
import reactHooksPlugin from "eslint-plugin-react-hooks"

export function react(): Linter.Config[] {
  return [
    {
      ...reactPlugin.configs["recommended-typescript"],
      name: "miskamyasa/react/recommended-typescript",
    },
    {
      name: "miskamyasa/react/rules",
      plugins: {
        "react-hooks": reactHooksPlugin as unknown as Record<string, unknown>,
      },
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
      },
    },
  ]
}
