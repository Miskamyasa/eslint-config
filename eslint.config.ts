import type {Linter} from "eslint"

import createConfig from "./src/index"

const config: Linter.Config[] = createConfig({
  tsconfigRootDir: import.meta.dirname,
})

// eslint-disable-next-line import-x/no-default-export
export default config
