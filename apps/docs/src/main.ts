import { createApp } from "vue";
import "./main.scss";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
import { Bootstrap_PT } from "@3squared/forge-ui-3";
import Tooltip from "primevue/tooltip";
import { createRouter, createWebHashHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

createApp(App)
  .use(router)
  .use(PrimeVue, { theme: "none", unstyled: true, pt: Bootstrap_PT })
  .use(ToastService)
  .use(DialogService)
  .directive("tooltip", Tooltip)
  .mount("#app");
