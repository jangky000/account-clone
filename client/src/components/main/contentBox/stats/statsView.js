import scss from "./stats.scss";

import { $ } from "@utils/tools.js";

class StatusView {
  render() {
    $("#selected_content").innerHTML = "통계";
  }
}

const statusView = new StatusView();
export default statusView;
