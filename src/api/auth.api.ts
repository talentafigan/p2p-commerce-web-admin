import Axios from "axios";

export class AuthApi {
  logout() {
    return Axios.post("/auth/logout");
  }
  login(data: { key: string; password: string }) {
    return Axios.post("/api/auth/login", {
      ...data,
      userTypeId: "1",
    });
  }
}
