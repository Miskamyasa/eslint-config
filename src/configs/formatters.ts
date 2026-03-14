import type {Linter} from "eslint"
import formatPlugin from "eslint-plugin-format"

import {
  GLOB_CSS,
  GLOB_GRAPHQL,
  GLOB_HTML,
  GLOB_LESS,
  GLOB_MARKDOWN,
  GLOB_POSTCSS,
  GLOB_SCSS,
  GLOB_SVG,
  GLOB_XML,
} from "../globs"
import type {OptionsFormatters} from "../types"

const parserPlain = {
  meta: {
    name: "parser-plain",
  },
  parseForESLint: (code: string) => ({
    ast: {
      body: [],
      comments: [],
      loc: {end: code.length, start: 0},
      range: [0, code.length] as const,
      tokens: [],
      type: "Program" as const,
    },
    scopeManager: null,
    services: {isPlain: true},
    visitorKeys: {
      Program: [],
    },
  }),
}

const defaultPrettierOptions = {
  endOfLine: "auto",
  printWidth: 120,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
}

export function formatters(options: OptionsFormatters | true = {}): Linter.Config[] {
  const resolvedOptions = options === true
    ? {
      css: true,
      graphql: true,
      html: true,
      markdown: true,
      // XML/SVG require @prettier/plugin-xml to be installed separately
      svg: false,
      xml: false,
    }
    : options

  const prettierOptions = {
    ...defaultPrettierOptions,
    ...(resolvedOptions.prettierOptions ?? {}),
  }

  const configs: Linter.Config[] = [
    {
      name: "miskamyasa/formatters/setup",
      plugins: {
        format: formatPlugin,
      },
    },
  ]

  if (resolvedOptions.css) {
    configs.push(
      {
        name: "miskamyasa/formatters/css",
        files: [GLOB_CSS, GLOB_POSTCSS],
        languageOptions: {parser: parserPlain as Linter.Parser},
        rules: {
          "format/prettier": ["error", {...prettierOptions, parser: "css"}],
        },
      },
      {
        name: "miskamyasa/formatters/scss",
        files: [GLOB_SCSS],
        languageOptions: {parser: parserPlain as Linter.Parser},
        rules: {
          "format/prettier": ["error", {...prettierOptions, parser: "scss"}],
        },
      },
      {
        name: "miskamyasa/formatters/less",
        files: [GLOB_LESS],
        languageOptions: {parser: parserPlain as Linter.Parser},
        rules: {
          "format/prettier": ["error", {...prettierOptions, parser: "less"}],
        },
      },
    )
  }

  if (resolvedOptions.html) {
    configs.push({
      name: "miskamyasa/formatters/html",
      files: [GLOB_HTML],
      languageOptions: {parser: parserPlain as Linter.Parser},
      rules: {
        "format/prettier": ["error", {...prettierOptions, parser: "html"}],
      },
    })
  }

  if (resolvedOptions.xml) {
    configs.push({
      name: "miskamyasa/formatters/xml",
      files: [GLOB_XML],
      languageOptions: {parser: parserPlain as Linter.Parser},
      rules: {
        "format/prettier": ["error", {...prettierOptions, parser: "xml", plugins: ["@prettier/plugin-xml"]}],
      },
    })
  }

  if (resolvedOptions.svg) {
    configs.push({
      name: "miskamyasa/formatters/svg",
      files: [GLOB_SVG],
      languageOptions: {parser: parserPlain as Linter.Parser},
      rules: {
        "format/prettier": ["error", {...prettierOptions, parser: "xml", plugins: ["@prettier/plugin-xml"]}],
      },
    })
  }

  if (resolvedOptions.markdown) {
    configs.push({
      name: "miskamyasa/formatters/markdown",
      files: [GLOB_MARKDOWN],
      languageOptions: {parser: parserPlain as Linter.Parser},
      rules: {
        "format/prettier": ["error", {...prettierOptions, embeddedLanguageFormatting: "off", parser: "markdown"}],
      },
    })
  }

  if (resolvedOptions.graphql) {
    configs.push({
      name: "miskamyasa/formatters/graphql",
      files: [GLOB_GRAPHQL],
      languageOptions: {parser: parserPlain as Linter.Parser},
      rules: {
        "format/prettier": ["error", {...prettierOptions, parser: "graphql"}],
      },
    })
  }

  return configs
}
