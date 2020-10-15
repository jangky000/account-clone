import scss from "./header.scss";

import { layout } from "@elements/elements.js";
import { $ } from "@utils/tools.js";
import { getToken, removeToken } from "@utils/token.js";
import { fetchAPI } from "@utils/fetch.js";

class HeaderView {
  render() {
    let headMenu = "";
    if (getToken()) {
      headMenu = `
        <div class="headMenu">
          <a class="payMethodManage fontWhite">결제수단관리</a>
          <a class="logout fontWhite">로그아웃</a>
        </div>
      `;
    }

    const headerHTML = `
      <div id="header">
        <h1 class="headTitle fontH1 height100 flexRow flexCenterCenter">
          가계부
        </h1>
        ${headMenu}
      </div>
    `;
    layout.insertAdjacentHTML("beforeend", headerHTML);

    this.addEvent();
  }

  addEvent() {
    const headMenu = $(".headMenu");
    if (!headMenu) return;

    headMenu.addEventListener("click", this.headMenuHandler);
  }

  async headMenuHandler(e) {
    const target = e.target;
    if (target.classList.contains("logout")) {
      try {
        const result = await fetchAPI("GET", "/api/auth/logout");
        console.log(result);
        if (result.success) removeToken();
      } finally {
        location.reload();
      }
    }
  }
}

const headerView = new HeaderView();
export default headerView;
