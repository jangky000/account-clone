import Observable from "@utils/observable.js";
import { fetchAPI } from "@utils/fetch.js";
import { removeToken } from "@utils/token.js";
import globalNavModel from "../globalNav/globalNavModel.js";

class CalendarModel extends Observable {
  constructor() {
    super();
  }

  async getCalendarIE() {
    const year = globalNavModel.year;
    const month = globalNavModel.month;
    const expense = await fetchAPI(
      "GET",
      `/api/status/date/expense/${year}/${month}`
    );
    if (expense.message === "jwt expired") {
      removeToken();
      this.notify(expense);
      return;
    }
    const income = await fetchAPI(
      "GET",
      `/api/status/date/income/${year}/${month}`
    );
    if (income.message === "jwt expired") {
      removeToken();
      this.notify(income);
      return;
    }
    const result = {
      expense: expense.dateStatus,
      income: income.dateStatus,
      year: year,
      month: month,
    };
    this.notify(result);
  }
}

const calendarModel = new CalendarModel();
export default calendarModel;
