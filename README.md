# @miskamyasa/eslint-config

Opinionated ESLint config for React + TypeScript projects.

## What's included

### JS/TS

- ESLint recommended rules
- TypeScript strict type checking (`typescript-eslint` recommended + strictTypeChecked + stylisticTypeChecked)
- React rules (`@eslint-react/eslint-plugin` recommended-typescript + `react-hooks`)
- Import ordering and validation (`eslint-plugin-import-x` + `eslint-plugin-unused-imports`)
- Stylistic formatting (`@stylistic/eslint-plugin` with double quotes, no semicolons, 2-space indent, stroustrup brace style)
- CommonJS overrides for `.js`/`.cjs` files

### Data files (enabled by default)

- JSON/JSONC/JSON5 linting (`eslint-plugin-jsonc`)
- YAML linting (`eslint-plugin-yml`)
- TOML linting (`eslint-plugin-toml`)
- Markdown linting (`@eslint/markdown` with GFM support)

### Formatters (opt-in)

- CSS/SCSS/Less formatting via Prettier
- HTML formatting via Prettier
- Markdown formatting via Prettier
- GraphQL formatting via Prettier
- XML/SVG formatting via Prettier (requires `@prettier/plugin-xml`)

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
| `jsonc` | `boolean` | `true` | Enable JSON/JSONC/JSON5 linting |
| `yaml` | `boolean` | `true` | Enable YAML linting |
| `toml` | `boolean` | `true` | Enable TOML linting |
| `markdown` | `boolean` | `true` | Enable Markdown linting |
| `formatters` | `boolean \| OptionsFormatters` | `false` | Enable Prettier formatting for CSS, HTML, etc. |

### Formatters options

When `formatters` is set to `true`, CSS, HTML, Markdown, and GraphQL formatting are enabled. XML/SVG are disabled by default because they require `@prettier/plugin-xml` to be installed separately.

For fine-grained control, pass an `OptionsFormatters` object:

```ts
export default createConfig({
  tsconfigRootDir: import.meta.dirname,
  formatters: {
    css: true,
    html: true,
    markdown: true,
    graphql: true,
    xml: true,     // requires: pnpm add -D @prettier/plugin-xml
    svg: true,     // requires: pnpm add -D @prettier/plugin-xml
    prettierOptions: {
      // override default Prettier options
    },
  },
})
```

### Disabling configs

```ts
export default createConfig({
  tsconfigRootDir: import.meta.dirname,
  yaml: false,
  toml: false,
})
```

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
import {
  typescript,
  stylistic,
  imports,
  react,
  javascript,
  jsonc,
  yaml,
  toml,
  markdown,
  formatters,
} from "@miskamyasa/eslint-config"
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
