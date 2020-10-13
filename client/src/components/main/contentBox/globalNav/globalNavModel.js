import Observable from "@utils/observable.js";
import { fetchAPI } from "@utils/fetch.js";
import { getToken } from "@utils/token.js";

class GlobalNavModel extends Observable {
  constructor(year, month) {
    super();
    this.year = year;
    this.month = month;
  }

  currMonth() {
    this.notify({ year: this.year, month: this.month });
  }

  prevMonth() {
    const monthFirst = new Date(this.year, this.month - 2, 1);
    this.year = monthFirst.getFullYear();
    this.month = monthFirst.getMonth() + 1;
    this.notify({ year: this.year, month: this.month });
  }

  nextMonth() {
    const monthFirst = new Date(this.year, this.month, 1);
    this.year = monthFirst.getFullYear();
    this.month = monthFirst.getMonth() + 1;
    this.notify({ year: this.year, month: this.month });
  }
}

const initDate = new Date();
const globalNavModel = new GlobalNavModel(
  initDate.getFullYear(),
  initDate.getMonth() + 1
);

export default globalNavModel;
