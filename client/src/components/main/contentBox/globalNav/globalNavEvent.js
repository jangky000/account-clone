// Views
import accountLogView from "../accountLog/accountLogView.js";
import calendarView from "../calendar/calendarView.js";
import pieView from "../stats/pieView.js";
import barView from "../stats/barView.js";
import lineView from "../stats/lineView.js";

// models
import globalNavModel from "./globalNavModel.js";
import accountLogModel from "../accountLog/accountLogModel.js";
import statsModel from "../stats/statsModel.js";
import calendarModel from "../calendar/calendarModel.js";

import { $, $All } from "@utils/tools.js";

class GlobalNavEvent {
  addEvent() {
    $(".global_month").addEventListener(
      "click",
      this.changeMonthHandler.bind(this)
    );
    $(".global_menu").addEventListener(
      "click",
      this.changeMenuHandler.bind(this)
    );
  }

  changeMonthHandler(e) {
    const arrowEl = e.target.closest("a");
    if (!arrowEl) return;
    if (arrowEl.classList.contains("monthLeftArrow")) {
      globalNavModel.prevMonth();
      this.updateMonthData();
    } else if (arrowEl.classList.contains("monthRightArrow")) {
      globalNavModel.nextMonth();
      this.updateMonthData();
    }
  }

  updateMonthData() {
    const classList = $(".global_MenuSelected").classList;
    if (classList.contains("accountLog")) {
      accountLogModel.getAccountLog(globalNavModel.year, globalNavModel.month);
    } else if (classList.contains("calendar")) {
      calendarModel.getCalendarIE();
    } else if (classList.contains("stats")) {
      statsModel.getCateExpense();
    }
  }

  changeMenuHandler(e) {
    const gbMenu = e.currentTarget;
    const subMenuList = $All(".global_subMenu", gbMenu);
    const currMenu = e.target;
    if (!currMenu.classList.contains("global_subMenu")) return;
    if (!currMenu.classList.contains("global_MenuSelected")) {
      subMenuList.forEach((subMenu) => {
        if (subMenu.classList.contains("global_MenuSelected")) {
          subMenu.classList.toggle("global_MenuSelected");
          // 해당 이벤트 삭제
          // html 삭제
        }
      });
      currMenu.classList.toggle("global_MenuSelected");
      // 해당 뷰 페이지 띄우기, 모델로부터 데이터 가져오기
      this.viewRender(currMenu);
    }
  }
  viewRender(currMenu) {
    const classList = currMenu.classList;
    if (classList.contains("accountLog")) {
      accountLogView.render(); // 기초 html 생성
      accountLogModel.getAccountSelectName();
      accountLogModel.getAccountLog(globalNavModel.year, globalNavModel.month); // model + view 업데이트
    } else if (classList.contains("calendar")) {
      calendarView.render();
      calendarModel.getCalendarIE();
    } else if (classList.contains("stats")) {
      pieView.render();
      statsModel.getCateExpense();
      barView.render();
    }
  }
}

const globalNavEvent = new GlobalNavEvent();
export default globalNavEvent;
