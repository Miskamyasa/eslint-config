import type {Linter} from "eslint"

export type ConfigItem = Linter.Config

export type OptionsConfig = {
  tsconfigRootDir?: string,
  ignores?: string[],
}
