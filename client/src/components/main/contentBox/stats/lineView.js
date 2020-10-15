import scss from "./bar.scss";
import { $ } from "@utils/tools.js";
import statusModel from "./statsModel.js";

class LineView {
  constructor() {}
  render() {
    const html = `
      <div class="line_box">
        <svg class="lineChart" width="600" height="600">
        </svg>
      </div>
    `;
    $("#selected_content").insertAdjacentHTML("beforeend", html);
  }

  update(data) {
    if (data.message === "jwt expired") {
      location.reload();
      return;
    }
  }
}

const lineView = new LineView();
statusModel.subscribe(lineView);
export default lineView;
