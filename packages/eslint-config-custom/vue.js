import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';


/*
 * This is a custom ESLint configuration for use with
 * internal that utilize VueJS.
 *
 */

export const config = typescriptEslint.config(
    { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs['flat/recommended'],
        ],
        files: ['**/*.{ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                parser: typescriptEslint.parser,
            },
        },
        rules: {
             //"prettier/prettier": [
             //   "error",
             //   {
             //       "tabWidth": 2,
             //       "useTabs": false,
             //       "printWidth": 160,
             //       "singleQuote": false,
             //       "trailingComma": "none",
             //       "bracketSpacing": true,
             //       "bracketSemiLine": false,
             //       "arrowParens": "always",
             //       "endOfLine": "auto",
             //       htmlWhitespaceSensitivity: "ignore"
             //   }
            //],
            "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
            "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
            "no-undef": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "vue/require-prop-types": "error",
            "vue/this-in-template": ["error", "never"],
            "vue/max-attributes-per-line": "off",
            "vue/require-v-for-key": "off",
            "vue/no-v-model-argument": "off",
            "@typescript-eslint/ban-ts-comment": "warn",
            "no-useless-escape": "off",
            "vue/html-closing-bracket-newline": [
                "error",
                {
                    singleline: "never",
                    multiline: "always"
                }
            ],
            "vue/multi-word-component-names": "off",
            "vue/no-mutating-props": "off",
            //turned off to pass build
            "@typescript-eslint/no-empty-function": "warn",
            "@typescript-eslint/no-namespace": "warn",
            "@typescript-eslint/no-var-requires": "warn"
        },
    },
    eslintConfigPrettier
);