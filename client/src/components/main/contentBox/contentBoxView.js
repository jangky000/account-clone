import scss from "./contentBox.scss";
import globalNavView from "./globalNav/globalNavView.js";
import globalNavEvent from "./globalNav/globalNavEvent.js";

import accountLogView from "./accountLog/accountLogView.js";

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
    globalNavView.render();
    accountLogView.render();
  }
  addEvent() {
    globalNavEvent.addEvent();
  }
}

const contentBoxView = new ContentBoxView();
export default contentBoxView;
