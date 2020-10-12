import scss from "./header.scss";

import { layout } from "@elements/elements.js";

class HeaderView {
  render() {
    let headerHTML = `
      <div id="header">
        <h1 class="headTitle fontH1 height100 flexRow flexCenterCenter">
          가계부
        </h1>
        <div class="payMethodManage">
          <a href="#" class="fontWhite">결제수단관리</a>
        </div>
      </div>
    `;
    layout.insertAdjacentHTML("beforeend", headerHTML);
  }
}

const headerView = new HeaderView();
export default headerView;
