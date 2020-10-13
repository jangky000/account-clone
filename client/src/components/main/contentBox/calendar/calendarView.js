import scss from "./calendar.scss";

import { $ } from "@utils/tools.js";

class CalendarView {
  render() {
    $("#selected_content").innerHTML = "달력";
  }
}

const calendarView = new CalendarView();
export default calendarView;
