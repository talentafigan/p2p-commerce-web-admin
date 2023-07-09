import Axios from "axios";

export class AnalyticApi {
  getAnalyticAdmin() {
    return Axios.get("/analytics/admin");
  }
}
