# AGENTS.md

## Project overview

`@miskamyasa/eslint-config` is a reusable ESLint flat config package for React + TypeScript projects. It exports a factory function that composes opinionated ESLint rules from multiple plugins.

## Tech stack

- **Runtime:** Node.js >= 22
- **Language:** TypeScript (strict mode, ESNext target, Bundler module resolution)
- **Build:** tsup (ESM-only output with DTS generation)
- **Package manager:** pnpm (exact versions via `.npmrc`)
- **Linting:** Self-hosted (dogfoods its own config)

## Project structure
  
```
src/
  index.ts              # Package entry point, default export = createConfig factory function
  factory.ts            # createConfig() factory composing all config modules
  types.ts              # OptionsConfig and ConfigItem types
  globs.ts              # Glob pattern constants (GLOB_JS, GLOB_EXCLUDE, etc.)
  configs/
    index.ts            # Barrel export for all config modules
    typescript.ts       # typescript-eslint presets + custom rules
    stylistic.ts        # @stylistic rules + base formatting rules
    imports.ts          # import-x presets + unused-imports rules
    react.ts            # @eslint-react + react-hooks rules
    javascript.ts       # CommonJS overrides for .js/.cjs files
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

Each file in `src/configs/` exports a function returning `Linter.Config[]`:

```ts
import type {Linter} from "eslint"

export function moduleName(): Linter.Config[] {
  return [
    {
      name: "miskamyasa/<module>/<purpose>",
      // ... config
    },
  ]
}
```

- Every config object must have a `name` property prefixed with `"miskamyasa/"`.
- Preset configs from plugins are spread with a name override.
- Plugin type mismatches use `as unknown as Record<string, unknown>` (see `react.ts`).

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
2. Add the export to `src/configs/index.ts`
3. Call the function in `src/factory.ts` within the returned config array
4. Add the plugin to `dependencies` in `package.json` if it introduces a new plugin
5. Run `pnpm build && pnpm typecheck && pnpm lint` to verify

## Modifying rules

- All rules live in their respective `src/configs/*.ts` files
- The composition order in `src/factory.ts` matters: later configs override earlier ones
- Current order: ignores -> eslint recommended -> typescript -> imports -> react -> stylistic -> javascript overrides -> user configs
