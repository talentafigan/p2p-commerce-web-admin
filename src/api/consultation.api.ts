import Axios from "axios";

export class ConsultationApi {
  get() {
    return Axios.get("/api/consultation");
  }
  getDetail(id: any) {
    return Axios.get("/api/consultation/" + id);
  }
}
