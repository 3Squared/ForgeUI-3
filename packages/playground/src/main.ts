import { createApp } from "vue";
import "prismjs";
import App from "./App.vue";
import { Bootstrap_PT } from "@3squared/forge-ui-3";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
import PrimeVue from "primevue/config";
import "./main.scss";

createApp(App).use(PrimeVue, { theme: 'none', unstyled: true, pt: Bootstrap_PT }).use(ToastService).use(DialogService).mount("#app");
