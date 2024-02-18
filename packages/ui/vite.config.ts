import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbulPlugin from "vite-plugin-istanbul";
import Components from 'unplugin-vue-components/vite'
import { join, resolve } from "path";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";

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
      'sass',
      'primevue/inputtext',
      'primevue/card',
      'primevue/chips',
      'primevue/badge',
      'primevue/usetoast',
      'primevue/ts-helpers',
      'primevue/dropdown',
      'primevue/inputmask',
      'primevue/overlaypanel',
      'primevue/textarea',
      'primevue/inputnumber',
      'primevue/progressbar',
      'primevue/selectbutton',
      'primevue/divider',
      'primevue/steps',
      'primevue/menubar',
      'primevue/tabview',
      'primevue/tabpanel',
      'primevue/toast',
      'primevue/calendar',
      'primevue/api',
      'primevue/column',
      '@vee-validate/zod',
      '@vueuse/components',
      'zod',
      'vue-multiselect'
    ]
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    }),
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
      external: [
        "primevue",
        "vue"
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
