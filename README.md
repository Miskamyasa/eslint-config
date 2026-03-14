# @miskamyasa/eslint-config

Opinionated ESLint config for React + TypeScript projects.

## What's included

- ESLint recommended rules
- TypeScript strict type checking (`typescript-eslint` recommended + strictTypeChecked + stylisticTypeChecked)
- React rules (`@eslint-react/eslint-plugin` recommended-typescript + `react-hooks`)
- Import ordering and validation (`eslint-plugin-import-x` + `eslint-plugin-unused-imports`)
- Stylistic formatting (`@stylistic/eslint-plugin` with double quotes, no semicolons, 2-space indent, stroustrup brace style)
- CommonJS overrides for `.js`/`.cjs` files

## Requirements

- Node.js >= 22
- ESLint >= 9
- TypeScript >= 5

## Install

```sh
pnpm add -D @miskamyasa/eslint-config eslint typescript
```

## Usage

Create `eslint.config.ts` in your project root:

```ts
import createConfig from "@miskamyasa/eslint-config"

export default createConfig({
  tsconfigRootDir: import.meta.dirname,
})
```

> ESLint 10 requires `jiti` for TypeScript config files: `pnpm add -D jiti`

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `tsconfigRootDir` | `string` | `process.cwd()` | Root directory for TypeScript project service |
| `ignores` | `string[]` | `[]` | Additional glob patterns to ignore |

## Overrides

Pass additional ESLint config objects after the options to override or extend rules:

```ts
import createConfig from "@miskamyasa/eslint-config"

export default createConfig(
  {tsconfigRootDir: import.meta.dirname},
  {
    rules: {
      "no-console": "off",
    },
  },
)
```

## Named exports

Individual config functions are available for advanced composition:

```ts
import {typescript, stylistic, imports, react, javascript} from "@miskamyasa/eslint-config"
```

## Key style decisions

- Double quotes
- No semicolons
- 2-space indentation
- Stroustrup brace style
- No curly spacing (`{a}` not `{ a }`)
- Max line length: 120 (warning)
- Unix line endings
- Default exports disallowed (`import-x/no-default-export`)
- Imports sorted alphabetically with React first
- Unused imports auto-removed

## License

MIT
