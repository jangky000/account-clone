import Observable from "@utils/observable.js";
import { fetchAPI } from "@utils/fetch.js";
import { removeToken } from "@utils/token.js";
import globalNavModel from "../globalNav/globalNavModel.js";

class StatsModel extends Observable {
  constructor() {
    super();
  }

  async getCateExpense() {
    const year = globalNavModel.year;
    const month = globalNavModel.month;
    const result = await fetchAPI(
      "GET",
      `/api/status/category/expense/${year}/${month}`
    );
    if (result.message === "jwt expired") {
      removeToken();
    }
    // console.log(result);
    this.notify(result);
  }
}

const statsModel = new StatsModel();
export default statsModel;
