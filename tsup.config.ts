import {defineConfig} from "tsup"

// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  shims: true,
})
