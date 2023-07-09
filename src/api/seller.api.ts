import Axios from "axios";

export class SellerApi {
  get() {
    return Axios.get("/api/seller");
  }
  getDetail(id: any) {
    return Axios.get("/api/seller/" + id);
  }
}
