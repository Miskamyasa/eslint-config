import stylisticPlugin from "@stylistic/eslint-plugin"
import type {Linter} from "eslint"

export function stylistic(): Linter.Config[] {
  const stylistic = stylisticPlugin

  return [
    {
      ...(stylistic.configs["disable-legacy"]),
      name: "miskamyasa/stylistic/disable-legacy",
    },
    {
      name: "miskamyasa/stylistic/rules",
      plugins: {
        "@stylistic": stylistic,
      },
      rules: {
        "@stylistic/block-spacing": ["error", "never"],
        "@stylistic/comma-dangle": ["error", "always-multiline"],
        "@stylistic/indent": ["error", 2],
        "@stylistic/jsx-closing-bracket-location": [
          "error",
          {"nonEmpty": "after-props", "selfClosing": "after-props"},
        ],
        "@stylistic/jsx-curly-spacing": [
          "error",
          {
            "attributes": {
              "allowMultiline": false,
            },
            "children": true,
            "when": "never",
          },
        ],
        "@stylistic/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
        "@stylistic/jsx-indent-props": ["error", 2],
        "@stylistic/jsx-max-props-per-line": ["error", {"maximum": 1}],
        "@stylistic/jsx-sort-props": [
          "error",
          {
            "callbacksLast": true,
            "ignoreCase": true,
            "noSortAlphabetically": false,
            "reservedFirst": true,
            "shorthandFirst": true,
            "shorthandLast": false,
          },
        ],
        "@stylistic/jsx-tag-spacing": [
          "error",
          {
            "afterOpening": "never",
            "beforeClosing": "allow",
            "beforeSelfClosing": "allow",
            "closingSlash": "never",
          },
        ],
        "@stylistic/jsx-wrap-multilines": [
          "error",
          {
            "arrow": "parens",
            "assignment": "parens",
            "condition": "ignore",
            "declaration": "parens",
            "logical": "ignore",
            "prop": "ignore",
            "return": "parens",
          },
        ],
        "@stylistic/key-spacing": ["error",
          {
            "afterColon": true,
            "mode": "strict",
          },
        ],
        "@stylistic/keyword-spacing": ["error",
          {
            "after": true,
            "before": true,
          },
        ],
        "@stylistic/linebreak-style": ["error",
          "unix",
        ],
        "@stylistic/max-len": ["warn",
          {
            "code": 120,
          },
        ],
        "@stylistic/no-multiple-empty-lines": ["error",
          {
            "max": 1,
            "maxEOF": 0,
            "maxBOF": 0,
          },
        ],
        "no-multi-spaces": "error",
        "@stylistic/object-curly-newline": [
          "error",
          {
            "consistent": true,
            "multiline": true,
          },
        ],
        "@stylistic/object-curly-spacing": ["error", "never"],
        "@stylistic/object-property-newline": [
          "error",
          {"allowAllPropertiesOnSameLine": true},
        ],
        "@stylistic/operator-linebreak": [
          "error",
          "before",
          {"overrides": {"=": "after"}},
        ],
        "@stylistic/quotes": [
          "error",
          "double",
          {
            "avoidEscape": true,
          },
        ],
        "@stylistic/semi": ["error",
          "never",
        ],
        "@stylistic/space-before-blocks": ["error",
          "always",
        ],
        "@stylistic/space-infix-ops": "error",
        "@stylistic/switch-colon-spacing": [
          "error",
          {"after": true, "before": false},
        ],
        "@stylistic/type-annotation-spacing": "error",
        "@stylistic/member-delimiter-style": [
          "error",
          {
            "multilineDetection": "brackets",
            "multiline": {
              "delimiter": "comma",
              "requireLast": true,
            },
            "singleline": {
              "delimiter": "comma",
              "requireLast": false,
            },
            "overrides": {
              "interface": {
                "multiline": {
                  "delimiter": "none",
                },
                "singleline": {
                  "delimiter": "comma",
                },
              },
            },
          },
        ],
        "comma-spacing": ["error", {"before": false, "after": true}],
        "no-console": ["warn", {allow: ["warn", "error"]}],
        "brace-style": ["error", "stroustrup"],
        "no-use-before-define": "error",
      },
    },
  ]
}
