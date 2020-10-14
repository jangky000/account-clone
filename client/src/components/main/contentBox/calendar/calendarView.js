import scss from "./calendar.scss";
import { $ } from "@utils/tools.js";
import { drawCalendar } from "@utils/calendar.js";

class CalendarView {
  render() {
    const html = `
      <div class="calendar_box">
      </div>
    `;
    $("#selected_content").innerHTML = html;
    drawCalendar(".calendar_box", 2020, 10);
  }
}

const calendarView = new CalendarView();
export default calendarView;
