import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbulPlugin from "vite-plugin-istanbul";
import Components from 'unplugin-vue-components/vite'
import { join, resolve } from "path";
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import {visualizer} from "rollup-plugin-visualizer";
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return ({
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
        '@vueuse/components',
        'cypress-real-events',
        'cypress/vue',
        '@primevue/core/api',
        'primevue/badge',
        'primevue/button',
        'primevue/calendar',
        'primevue/card',
        'primevue/checkbox',
        'primevue/chips',
        'primevue/column',
        'primevue/config',
        'primevue/datatable',
        'primevue/divider',
        'primevue/dialog',
        'primevue/dialogservice',
        'primevue/dropdown',
        'primevue/fieldset',
        'primevue/image',
        'primevue/inputmask',
        'primevue/inputnumber',
        'primevue/inputswitch',
        'primevue/inputtext',
        'primevue/menubar',
        'primevue/message',
        'primevue/multiselect',
        'primevue/progressbar',
        'primevue/panel',
        'primevue/progressspinner',
        'primevue/overlaypanel',
        'primevue/selectbutton',
        'primevue/steps',
        'primevue/tabpanel',
        'primevue/tab',
        'primevue/tabs',
        'primevue/tabpanels',
        'primevue/tablist',
        'primevue/textarea',
        'primevue/toast',
        'primevue/toastservice',
        'primevue/tooltip',
        'primevue/ts-helpers',
        'primevue/usetoast',
        'vue-drawing-canvas',
        'sass',
        'vee-validate',
        'vue',
        'yup'
      ]
    },
    plugins: [
      vue({
        script: {
          propsDestructure: true
        }
      }),
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
      }),
      dts(),
      visualizer()
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
          "vee-validate"
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
        include: ["src/helpers/**"],
        exclude: ["**/*.cy.ts", "scripts", "**/*.test.ts", "src/components", "src/passthroughs", "src/styles/**"],
        reportsDirectory: "./coverage/vitest",
        reporter: ["cobertura", "html", "json"],
        provider: "v8"
      }
    }
  });
})
