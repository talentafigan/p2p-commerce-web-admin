import store from "@/store";
const IStore = store as any;

const publicRouter = "authLogin";

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
  if (ctx.to.name === publicRouter) return ctx.next("/");
  return ctx.next();
};
