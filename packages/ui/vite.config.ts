import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbulPlugin from "vite-plugin-istanbul";
import { join, resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src")
      },
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), "node_modules/$1")
      }
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  plugins: [
    vue(),
    istanbulPlugin({
      include: "src/*",
      exclude: ["node_modules", "test/"],
      extension: [".js", ".cjs", ".mjs", ".ts", ".tsx", ".jsx", ".vue"],
      cypress: mode == "test",
      forceBuildInstrument: mode == "test"
    })
  ],
  test: {
    alias: [{ find: /^vue$/, replacement: "vue/dist/vue.runtime.common.js" }],

    reporters: ["default", "junit"],
    outputFile: "test-results/vitest.xml",
    coverage: {
      all: true,
      include: ["src"],
      exclude: ["**/*.cy.ts", "scripts", "**/*.test.ts"],
      reportsDirectory: "./coverage/vitest",
      reporter: ["cobertura", "html", "json"],
      provider: "v8"
    }
  }
}))
