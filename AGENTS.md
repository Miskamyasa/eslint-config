# AGENTS.md

## Project overview

`@miskamyasa/eslint-config` is a reusable ESLint flat config package for React + TypeScript projects. It exports a factory function that composes opinionated ESLint rules from multiple plugins. Beyond JS/TS, it also lints JSON, YAML, TOML, and Markdown files out of the box, with optional Prettier-based formatting for CSS, HTML, and more.

## Tech stack

- **Runtime:** Node.js >= 22
- **Language:** TypeScript (strict mode, ESNext target, Bundler module resolution)
- **Build:** tsup (ESM-only output with DTS generation)
- **Package manager:** pnpm (exact versions via `.npmrc`)
- **Linting:** Self-hosted (dogfoods its own config)

## Project structure

```text
src/
  index.ts              # Package entry point, default export = createConfig factory function
  factory.ts            # createConfig() factory composing all config modules
  types.ts              # OptionsConfig, OptionsFormatters, and ConfigItem types
  globs.ts              # Glob pattern constants (GLOB_SRC, GLOB_YAML, GLOB_EXCLUDE, etc.)
  configs/
    index.ts            # Barrel export for all config modules
    typescript.ts       # typescript-eslint setup + strict/stylistic rules
    stylistic.ts        # @stylistic plugin setup + formatting rules
    imports.ts          # import-x + unused-imports plugin setup + rules
    react.ts            # @eslint-react + react-hooks plugin setup + rules
    javascript.ts       # CommonJS overrides for .js/.cjs files
    jsonc.ts            # eslint-plugin-jsonc setup + rules for JSON/JSONC/JSON5
    yaml.ts             # eslint-plugin-yml setup + rules for YAML
    toml.ts             # eslint-plugin-toml setup + rules for TOML
    markdown.ts         # @eslint/markdown setup + GFM rules for Markdown
    formatters.ts       # eslint-plugin-format (Prettier) for CSS, HTML, XML, etc.
eslint.config.ts        # Dogfoods the local source
tsup.config.ts          # Build configuration
tsconfig.json           # TypeScript configuration
```

## Code conventions

### Style (enforced by the config itself)

- Double quotes, no semicolons, 2-space indent
- Stroustrup brace style (`else`/`catch`/`finally` on new line)
- No curly spacing: `{foo}` not `{ foo }`
- `import type` for type-only imports (`verbatimModuleSyntax` is enabled)
- Imports sorted alphabetically, React imports first, newlines between groups
- Default exports disallowed (except `src/index.ts`, `eslint.config.ts`, `tsup.config.ts` which use `eslint-disable-next-line`)
- Max line length: 120 characters (warning)
- Unix line endings

### TypeScript

- `type` keyword preferred over `interface` (`consistent-type-definitions: ["error", "type"]`)
- Strict mode enabled in tsconfig
- `verbatimModuleSyntax: true` — always use `import type` for type-only imports
- Module resolution: `Bundler` — extensionless relative imports (no `.js` or `.ts` suffixes)

### Config module pattern

Each file in `src/configs/` exports a function returning `Linter.Config[]`. Every module follows a **setup + rules** decomposition:

1. **Setup config** (global, no `files`) — registers plugins only, no rules.
2. **Rules config** (scoped with `files`) — contains actual rules, scoped to the appropriate file globs.

```ts
import type {Linter} from "eslint"
import somePlugin from "eslint-plugin-example"

import {GLOB_SRC} from "../globs"

export function moduleName(): Linter.Config[] {
  return [
    // 1. Plugin setup (global)
    {
      name: "miskamyasa/<module>/setup",
      plugins: {
        example: somePlugin,
      },
    },
    // 2. Rules (scoped to source files)
    {
      name: "miskamyasa/<module>/rules",
      files: GLOB_SRC,
      rules: {
        "example/some-rule": "error",
      },
    },
  ]
}
```

Key conventions:
- Every config object must have a `name` property prefixed with `"miskamyasa/"`.
- Plugin presets are **decomposed**, not spread blindly — extract `plugins`, `rules`, `settings` separately and scope them with `files`.
- Plugin type mismatches use `as unknown as Record<string, unknown>` (see `react.ts`).
- Parsers that lack a default export use `import * as parser from "..."` (see `jsonc.ts`, `yaml.ts`, `toml.ts`).

### Dependencies

- ESLint plugins are **regular dependencies** (consumers don't install them separately).
- `eslint` and `typescript` are **peer dependencies**.
- `jiti` is a dev dependency for loading `eslint.config.ts`.
- All versions are pinned exact (`.npmrc: save-exact = true`).

## Commands

| Command | Description |
|---|---|
| `pnpm build` | Build with tsup to `dist/` |
| `pnpm lint` | Lint with ESLint (dogfooding) |
| `pnpm typecheck` | TypeScript type checking |

## Adding a new config module

1. Create `src/configs/<name>.ts` exporting a function returning `Linter.Config[]`
2. Follow the **setup + rules** decomposition pattern (global plugin setup, file-scoped rules)
3. Add the export to `src/configs/index.ts`
4. Call the function in `src/factory.ts` within the returned config array
5. If the config targets non-JS/TS files, add appropriate glob constants to `src/globs.ts`
6. If the config is optional, add a boolean option to `OptionsConfig` in `src/types.ts` and gate it in `src/factory.ts`
7. Add the plugin to `dependencies` in `package.json` if it introduces a new plugin
8. Run `pnpm build && pnpm typecheck && pnpm lint` to verify

## Modifying rules

- All rules live in their respective `src/configs/*.ts` files
- The composition order in `src/factory.ts` matters: later configs override earlier ones
- Current order: ignores -> eslint recommended -> typescript -> imports -> react -> stylistic -> jsonc -> yaml -> toml -> markdown -> formatters -> javascript overrides -> user configs
