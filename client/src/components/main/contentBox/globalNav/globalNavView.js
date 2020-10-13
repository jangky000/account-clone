import scss from "./globalNav.scss";
import { $ } from "@utils/tools.js";

import globalNavModel from "./globalNavModel.js";

class GlobalNavView {
  constructor() {
    this.currDate = new Date();
  }
  render() {
    let html = `
        <div class="global_nav flexColumn flexCenterCenter">
            <div class="global_month">
                <a class="monthLeftArrow" href="#">◁</a>
                <h2 class="fontH2 inBlock">00월</h2>
                <a class="monthRightArrow" href="#">▷</a>
            </div>
            <div class="global_menu width100 flexRow bordRad30">
                <div class="accountLog global_subMenu flexAuto global_MenuSelected">내역</div>
                <div class="calendar global_subMenu flexAuto">달력</div>
                <div class="stats global_subMenu flexAuto">통계</div>
            </div>
        </div>
      `;
    $("#gb_nav").insertAdjacentHTML("beforeend", html);
  }

  update(data) {
    let text =
      this.currDate.getFullYear() !== data.year ? `${data.year}년 ` : "";
    $(".global_month h2").innerText = text + `${data.month}월`;
  }
}

const globalNavView = new GlobalNavView();
globalNavModel.subscribe(globalNavView);

export default globalNavView;
