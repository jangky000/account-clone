import Observable from "@utils/observable.js";
import { fetchAPI } from "@utils/fetch.js";
import { getToken } from "@utils/token.js";

class AccountLogModel extends Observable {
  constructor() {
    super();
  }

  async getAccountLog(year, month) {
    // 관련 정보 요청
    const result = await fetchAPI("GET", `/api/account/${year}/${month}`);
    this.notify(result);
  }
}

const accountLogModel = new AccountLogModel();
export default accountLogModel;
