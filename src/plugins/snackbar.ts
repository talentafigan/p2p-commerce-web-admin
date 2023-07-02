import Vue from "vue";
import CommonSnackbar from "@/components/common/snackbar.vue";

class Snackbar {
  open(props: { text: string; duration?: number; position?: string }) {
    const tmp = Vue.extend({
      name: "CommonSnackbar",
      render: function (createElement) {
        return createElement(CommonSnackbar, {
          props: props,
        });
      },
    });
    const vm = new tmp().$mount();
    const appElement = document.getElementById("app") as HTMLElement;
    appElement.appendChild(vm.$el);
  }
}

export default Snackbar;