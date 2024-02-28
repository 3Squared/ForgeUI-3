import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbulPlugin from "vite-plugin-istanbul";
import Components from 'unplugin-vue-components/vite'
import { join, resolve } from "path";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import { visualizer } from "rollup-plugin-visualizer";

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
  optimizeDeps: {
    include: [
      '@azure/storage-blob',
      '@cypress/code-coverage/support',
      '@iconify/vue',
      '@vee-validate/zod',
      '@vueuse/components',
      'cypress-real-events',
      'cypress/vue',
      'primevue/api',
      'primevue/badge',
      'primevue/calendar',
      'primevue/card',
      'primevue/chips',
      'primevue/column',
      'primevue/divider',
      'primevue/dropdown',
      'primevue/inputmask',
      'primevue/inputnumber',
      'primevue/inputtext',
      'primevue/menubar',
      'primevue/progressbar',
      'primevue/overlaypanel',
      'primevue/selectbutton',
      'primevue/steps',
      'primevue/tabpanel',
      'primevue/tabview',
      'primevue/textarea',
      'primevue/toast',
      'primevue/ts-helpers',
      'primevue/usetoast',
      'sass',
      'vee-validate',
      'vue-multiselect',
      'vue', 
      'zod'
    ]
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    }),
    visualizer(),
    istanbulPlugin({
      include: "src/*",
      exclude: ["node_modules", "test/"],
      extension: [".js", ".cjs", ".mjs", ".ts", ".tsx", ".jsx", ".vue"],
      cypress: mode === "test",
      forceBuildInstrument: mode === "test"
    })
  ],
  build: {
    lib: {
      entry: "./index.ts",
      name: "Forge.UI3",
      formats: ["es"]
    },
    rollupOptions: {
      plugins: [
        visualizer()
      ],
      external: [
        "@azure/storage-blob",
        "@azure/abort-controller",
        "@vueuse/components",
        '@iconify/vue',
        "bootstrap",
        "flatpickr",
        /^primevue\/*/,
        "vue",
        "vue-multiselect",
        "vee-validate",
        "zod"
      ],
      output: {
        dir: "dist/esm",
        format: "esm",
        /* exports: 'named',

        preserveModules: true,
        preserveModulesRoot: 'src',*/
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue"
        }
      }
    }
  },
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
