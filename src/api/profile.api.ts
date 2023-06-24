import Axios from "axios";

export class ProfileApi {
  me() {
    return Axios.get("/api/profile/me");
  }
}
