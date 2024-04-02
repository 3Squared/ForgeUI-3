import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import visualizer from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), visualizer(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"), // The components to include in the package
      name: "Forge-Playground-3", // The name of the package
      // the proper extensions will be added
      fileName: "forge-playground-3" // The filename
    },
    rollupOptions: {
      plugins: [visualizer()],
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "@iconify/vue", "prismjs", /^primevue\/*/, "markdown-it-prism", "@3squared/forge-ui-3"],
      output: {
        dir: "dist/esm",
        format: "esm",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
