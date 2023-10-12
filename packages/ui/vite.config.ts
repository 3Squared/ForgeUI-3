import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import istanbulPlugin from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
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
}))
