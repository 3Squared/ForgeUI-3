import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "unplugin-vue-markdown/vite";
import VueRouter from "unplugin-vue-router/vite";
import Components from 'unplugin-vue-components/vite'
import { ForgeResolver } from "@3squared/forge-ui-3";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: ["src/pages"]
    }),
    Components({
      resolvers: [ForgeResolver()]
    }),
    Markdown({
      wrapperClasses(id, code) {
        return "changelog";
      }
    }),
    vue({
        include: [/\.vue$/, /\.md$/]
      })
  ],
});
 