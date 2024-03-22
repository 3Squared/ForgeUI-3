import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "unplugin-vue-markdown/vite";
import VueRouter from "unplugin-vue-router/vite";
import linkifyit from "linkify-it";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: ["src/pages"]
    }),
    Markdown({
      wrapperClasses(id, code) {
        return "changelog";
      }
    }),
    vue({
      include: [/\.vue$/, /\.md$/]
    })
  ]
});
