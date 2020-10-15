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
    let result = await fetchAPI(
      "GET",
      `/api/status/category/expense/${year}/${month}`
    );
    if (result.message === "jwt expired") {
      removeToken();
    }
    if (result.success) {
      result = this.addPercent(result);
    }
    this.notify(result);
  }

  addPercent(result) {
    const cateStatus = result.cateStatus;
    const tot_sum = Object.keys(cateStatus).reduce((acc, key) => {
      acc += cateStatus[key].total_money;
      return acc;
    }, 0);

    const new_cateStatus = Object.keys(cateStatus).reduce((arr, key) => {
      const total_money = cateStatus[key].total_money;
      const percent = Math.round((total_money / tot_sum) * 100);
      arr.push({
        ...cateStatus[key],
        percent: percent,
      });
      return arr;
    }, []);

    new_cateStatus.sort((a, b) => {
      return b.percent - a.percent;
    });

    result.cateStatus = new_cateStatus;
    return result;
  }
}

const statsModel = new StatsModel();
export default statsModel;
