import Axios from "axios";

export class TransactionApi {
  get() {
    return Axios.get("/api/transaction");
  }
  getDetail(id: any) {
    return Axios.get("/api/transaction/" + id);
  }
}
