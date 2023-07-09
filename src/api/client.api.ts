import Axios from "axios";

export class ClientApi {
  get() {
    return Axios.get("/api/client");
  }
  getDetail(id: any) {
    return Axios.get("/api/client/" + id);
  }
}
