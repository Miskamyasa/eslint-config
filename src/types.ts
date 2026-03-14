import type {Linter} from "eslint"

export type ConfigItem = Linter.Config

export type OptionsFormatters = {
  css?: boolean,
  html?: boolean,
  xml?: boolean,
  svg?: boolean,
  markdown?: boolean,
  graphql?: boolean,
  prettierOptions?: Record<string, unknown>,
}

export type OptionsConfig = {
  tsconfigRootDir?: string,
  ignores?: string[],
  yaml?: boolean,
  toml?: boolean,
  jsonc?: boolean,
  markdown?: boolean,
  formatters?: boolean | OptionsFormatters,
}
