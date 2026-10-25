import {defineConfig} from "tsdown"

// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  fixedExtension: false,
  dts: true,
  clean: true,
  shims: true,
  target: false,
})
