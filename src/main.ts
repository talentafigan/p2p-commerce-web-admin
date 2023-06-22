import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueJSToggleButton from "./plugins/vue-js-pluggin-button";
import store from "./store";
import ComponentModule from "@/components/module";
import ApexCharts from "vue-apexcharts";
import Helpers from "@/plugins/helpers";

import "@/assets/styles/scss/index.scss";
import "@/assets/styles/css/index.css";

Vue.config.productionTip = false;

ComponentModule();
VueJSToggleButton();

Vue.component("apex-chart", ApexCharts);

Vue.prototype.$helpers = new Helpers();

export const app = new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
