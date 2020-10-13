import { $, $All } from "@utils/tools.js";

class GlobalNavEvent {
  addEvent() {
    $(".global_month").addEventListener("click", this.changeMonthHandler);
    $(".global_menu").addEventListener("click", this.changeMenuHandler);
  }

  changeMonthHandler(e) {
    const gbMonth = e.currentTarget;
    const monthTextEl = $("h2", gbMonth);
    const arrowEl = e.target.closest("a");
    const month = 10; // model에서 가져오기
    if (arrowEl.classList.contains("monthLeftArrow")) {
      console.log("month - 1");
      monthTextEl.innerText = `${month - 1}월`; // view 업데이트
    } else if (arrowEl.classList.contains("monthRightArrow")) {
      console.log("month + 1");
      monthTextEl.innerText = `${month + 1}월`; // view 업데이트
    }
  }

  changeMenuHandler(e) {
    const gbMenu = e.currentTarget;
    const subMenuList = $All(".global_subMenu", gbMenu);
    const currMenu = e.target;
    if (!currMenu.classList.contains("global_MenuSelected")) {
      subMenuList.forEach((subMenu) => {
        if (subMenu.classList.contains("global_MenuSelected")) {
          subMenu.classList.toggle("global_MenuSelected");
        }
      });
      currMenu.classList.toggle("global_MenuSelected");
      // 해당 뷰 페이지 띄우기, 모델로부터 데이터 가져오기
    }
  }
}

const globalNavEvent = new GlobalNavEvent();
export default globalNavEvent;
