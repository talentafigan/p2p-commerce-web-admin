export default {
  index: require("@/views/index.vue").default,
  authLogin: require("@/views/auth/login.vue").default,
  accountProfile: require("@/views/account/profile.vue").default,
  consultation: require("@/views/consultation/index.vue").default,
  consultationDetail: require("@/views/consultation/_id.vue").default,
  transaction: require("@/views/transactions/index.vue").default,
  seller: require("@/views/sellers/index.vue").default,
  client: require("@/views/clients/index.vue").default,
};
