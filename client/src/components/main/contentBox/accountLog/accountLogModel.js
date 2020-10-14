import Observable from "@utils/observable.js";
import { fetchAPI } from "@utils/fetch.js";
import { removeToken } from "@utils/token.js";

class AccountLogModel extends Observable {
  constructor() {
    super();
  }

  async getAccountSelectName() {
    const result = await fetchAPI("GET", `/api/account/select`);
    this.notify(result);
  }

  async getAccountLog(year, month) {
    const result = await fetchAPI("GET", `/api/account/${year}/${month}`);
    if (result.message === "jwt expired") {
      removeToken();
    }
    this.notify(result);
  }
}

const accountLogModel = new AccountLogModel();
export default accountLogModel;
