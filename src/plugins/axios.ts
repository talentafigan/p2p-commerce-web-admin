import Axios from "axios";

const register = () => {
  setDefaultBaseUrl();
  setToken();
};

const setDefaultBaseUrl = () => {
  Axios.defaults.baseURL = process.env.VUE_APP_API_URL;
};

export const setToken = () => {
  const getVuexStorage = localStorage.getItem("vuex");
  if (!getVuexStorage) return;
  const vuex = JSON.parse(getVuexStorage);
  console.log(vuex)
  Axios.defaults.headers.common["x-token-id"] = vuex.auth.token;
};

export default register;