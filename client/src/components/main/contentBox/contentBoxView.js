import scss from "./contentBox.scss";
import globalNavView from "./globalNav/globalNavView.js";
import accountLogView from "./accountLog/accountLogView.js";

import { $ } from "@utils/tools.js";

class ContentBoxView {
  render() {
    let contentBoxHTML = `
    <div class="content_box width60">
    </div>
    `;
    $("#main .container").insertAdjacentHTML("beforeend", contentBoxHTML);
    globalNavView.render();
    accountLogView.render();
  }
  addEvent() {}
}

const contentBoxView = new ContentBoxView();
export default contentBoxView;
