import scss from "./globalNav.scss";

import { $ } from "@utils/tools.js";

class GlobalNavView {
  render() {
    let html = `
        <div class="global_nav flexColumn flexCenterCenter">
            <div class="global_month">
                <a class="monthLeftArrow" href="#">◁</a>
                <h2 class="fontH2 inBlock">10월</h2>
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
}

const globalNavView = new GlobalNavView();
export default globalNavView;
