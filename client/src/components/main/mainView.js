// import scss from "./main.scss";
import LoginView from "./login/loginView.js";
import LoginEvent from "./login/loginEvent.js";

export default class MainView {
  constructor() {
    this.loginView = new LoginView();
    this.loginEvent = new LoginEvent(this.loginView);
  }
  render() {
    const loginHtml = this.loginView.render();
    let html = `
        <div id="main" class="flexAuto">
            <div class="container">
                ${loginHtml}
            </div>
        </div>
    `;
    return html;
  }
  addEvent() {
    this.loginEvent.addEvent();
  }
}
