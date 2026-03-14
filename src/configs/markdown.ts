import markdownPlugin from "@eslint/markdown"
import type {Linter} from "eslint"

import {GLOB_MARKDOWN} from "../globs"

export function markdown(): Linter.Config[] {
  return [
    {
      name: "miskamyasa/markdown/setup",
      plugins: {
        markdown: markdownPlugin as unknown as Record<string, unknown>,
      },
    },
    {
      name: "miskamyasa/markdown/parser",
      files: [GLOB_MARKDOWN],
      language: "markdown/gfm",
    },
    {
      name: "miskamyasa/markdown/rules",
      files: [GLOB_MARKDOWN],
      rules: {
        "markdown/fenced-code-language": "warn",
        "markdown/heading-increment": "error",
        "markdown/no-duplicate-headings": "off",
        "markdown/no-empty-links": "error",
        "markdown/no-html": "off",
        "markdown/no-invalid-label-refs": "off",
        "markdown/no-missing-label-refs": "off",
      },
    },
  ]
}
