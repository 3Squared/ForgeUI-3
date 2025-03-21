import {config} from "eslint-config-custom/vue"

export default [
  ...config,
  {
    "rules": {
      "@typescript-eslint/no-explicit-any": "warn",
      "vue/require-prop-types": "warn",
      "vue/valid-v-for": "warn",
      "no-prototype-builtins": "warn"
    }
  }
];
