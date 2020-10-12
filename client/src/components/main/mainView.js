// import scss from "./main.scss";
import loginView from "./login/loginView.js";
import loginEvent from "./login/loginEvent.js";

import accountLogView from "./accountLog/accountLogView.js";

import { layout } from "@elements/elements.js";
import { getToken } from "@utils/token.js";

class MainView {
  render() {
    let mainHTML = `
        <div id="main" class="flexAuto">
            <div class="container">
            </div>
        </div>
    `;
    layout.insertAdjacentHTML("beforeend", mainHTML);

    if (!getToken()) {
      loginView.render();
    } else {
      accountLogView.render();
    }
  }

  addEvent() {
    if (!getToken()) {
      loginEvent.addEvent();
    } else {
      accountLogView.addEvent();
    }
  }
}

const mainView = new MainView();
export default mainView;
