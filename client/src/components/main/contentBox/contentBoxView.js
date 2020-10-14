import scss from "./contentBox.scss";
import globalNavView from "./globalNav/globalNavView.js";
import globalNavEvent from "./globalNav/globalNavEvent.js";

import accountLogView from "./accountLog/accountLogView.js";

// models
import globalNavModel from "./globalNav/globalNavModel.js";
import accountLogModel from "./accountLog/accountLogModel.js";

import { $ } from "@utils/tools.js";

class ContentBoxView {
  render() {
    let contentBoxHTML = `
    <div class="content_box width60">
      <div id="gb_nav"></div>
      <div id="selected_content"></div>
    </div>
    `;
    $("#main .container").insertAdjacentHTML("beforeend", contentBoxHTML);

    // 글로벌 내비 초기화
    globalNavView.render();
    globalNavModel.currMonth();

    // 내역 초기화
    accountLogView.render();
    accountLogModel.getAccountSelectName();
    accountLogModel.getAccountLog(globalNavModel.year, globalNavModel.month);
  }
  addEvent() {
    globalNavEvent.addEvent();
  }
}

const contentBoxView = new ContentBoxView();
export default contentBoxView;
