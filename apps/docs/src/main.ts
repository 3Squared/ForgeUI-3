import { createApp } from 'vue'
import './main.scss'
import App from "./App.vue"
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import { Bootstrap_PT } from "@3squared/forge-ui-3";
// @ts-ignore
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import Tooltip from "primevue/tooltip"; 

const router = createRouter({
  history: createWebHashHistory(),
})

createApp(App).use(router)
  .use(PrimeVue, { unstyled: true, pt: Bootstrap_PT })
  .use(ToastService)
  .use(DialogService)
  .directive('tooltip', Tooltip)
  .mount('#app')
