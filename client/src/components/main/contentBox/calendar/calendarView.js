import scss from "./calendar.scss";
import { $ } from "@utils/tools.js";
import { drawCalendar } from "@utils/calendar.js";
import calendarModel from "./calendarModel.js";
class CalendarView {
  render() {
    const html = `
      <div class="calendar_box">
      </div>
    `;
    $("#selected_content").innerHTML = html;
  }

  update(data) {
    if (data.message === "jwt expired") {
      location.reload();
      return;
    }
    drawCalendar(".calendar_box", data.year, data.month);
    const income = data.income;
    Object.keys(income).forEach((key) => {
      $(`#day${key.slice(-2)}`).insertAdjacentHTML(
        "beforeend",
        `<div class="income">+${income[key].total_money}</div>`
      );
    });
    const expense = data.expense;
    Object.keys(expense).forEach((key) => {
      $(`#day${key.slice(-2)}`).insertAdjacentHTML(
        "beforeend",
        `<div class="expense">${expense[key].total_money}</div>`
      );
    });
  }
}

const calendarView = new CalendarView();
calendarModel.subscribe(calendarView);
export default calendarView;
