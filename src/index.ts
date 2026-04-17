export * from "./configs/index"
export * from "./factory"
export * from "./globs"
export * from "./types"
export {createTypeScriptImportResolver} from "eslint-import-resolver-typescript"

// eslint-disable-next-line import-x/no-default-export
export {createConfig as default} from "./factory"
