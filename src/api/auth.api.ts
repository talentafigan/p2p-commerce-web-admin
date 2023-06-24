import Axios from "axios";

export class AuthApi {
  logout() {
    return Axios.post("/api/logout");
  }
  login(data: { key: string; password: string }) {
    return Axios.post("/api/login", {
      ...data,
      userTypeId: "1",
    });
  }
}
