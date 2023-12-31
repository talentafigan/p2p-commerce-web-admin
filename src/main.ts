import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueJSToggleButton from "./plugins/vue-js-pluggin-button";
import store from "./store";
import ComponentModule from "@/components/module";
import ApexCharts from "vue-apexcharts";
import PluginAxios from "@/plugins/axios"
import Helpers from "@/plugins/helpers";
import Snackbar from "@/plugins/snackbar";

import "@/assets/styles/scss/index.scss";
import "@/assets/styles/css/index.css";

Vue.config.productionTip = false;

ComponentModule();
VueJSToggleButton();
PluginAxios();

Vue.component("apex-chart", ApexCharts);

Vue.prototype.$helpers = new Helpers();
Vue.prototype.$snackbar = new Snackbar();

export const app = new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
