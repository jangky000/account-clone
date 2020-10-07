// import scss from "./main.scss";
import Login from "@layouts/main/login/login.js";

export default class Main {
  constructor() {
    this.login = new Login();
  }
  render() {
    const loginHtml = this.login.render();
    let html = `
        <div id="main" class="flexAuto">
            <div class="container">
                ${loginHtml}
            </div>
        </div>
    `;
    return html;
  }
}
