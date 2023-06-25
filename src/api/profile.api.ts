import Axios from "axios";

export class ProfileApi {
  me(accessToken?: string) {
    return Axios.get("/api/profile/me", {
      headers: {
        "x-token-id": accessToken,
      },
    });
  }
}
