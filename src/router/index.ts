import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Module from "@/router/module";
import { authMiddleware } from "@/plugins/middleware";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    name: "home",
    path: "/",
    component: Module.index,
  },
  {
    name: "authLogin",
    path: "/auth/login",
    component: Module.authLogin,
  },
  {
    name: "accountProfile",
    path: "/account/profile",
    component: Module.accountProfile,
  },
  {
    name: "consultation",
    path: "/consultation",
    component: Module.consultation,
  },
  {
    name: "consultationDetail",
    path: "/consultation/:id",
    component: Module.consultationDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  authMiddleware({ to, from, next });
});

export default router;
