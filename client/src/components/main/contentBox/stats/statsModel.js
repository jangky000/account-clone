import Observable from "@utils/observable.js";
import { fetchAPI } from "@utils/fetch.js";
import { removeToken } from "@utils/token.js";

class StatsModel extends Observable {
  constructor() {
    super();
  }

  async getCateExpense() {
    const result = await fetchAPI("GET", `/api/status/category/expense`);
    if (result.message === "jwt expired") {
      removeToken();
    }
    this.notify(result);
  }
}

const statsModel = new StatsModel();
export default statsModel;
