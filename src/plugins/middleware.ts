import store from "@/store";
import Helpers from "./helpers";

const publicRouter = "authLogin";

const helpers = new Helpers();

export const authMiddleware = (ctx: any) => {
  const vuex = sessionStorage.getItem("vuex");
  if (!vuex) {
    if (ctx.to.name === publicRouter) return ctx.next();
    return ctx.next("/auth/login");
  }
  const auth = JSON.parse(vuex);
  if (auth.auth.token === null) {
    if (ctx.to.name === publicRouter) return ctx.next();
    return ctx.next("/auth/login");
  }
  if (helpers.datePassed(auth.auth.loginDate, 24, "hour")) {
    return ctx.next("/auth/login");
  }
  if (ctx.to.name === publicRouter) return ctx.next("/");
  return ctx.next();
};
