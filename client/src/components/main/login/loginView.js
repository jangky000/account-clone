import scss from "./login.scss";

import { $ } from "@utils/tools.js";

class LoginView {
  render() {
    let loginHTML = `
      <div class="login_box flexColumn flexCenterCenter">
        <div class="login_title flexRow flexCenterCenter width100">
          <h2 class="loginTab flextAuto width100 fontH2 loginSelected"><a>로그인</a></h2>
          <h2 class="registerTab flextAuto width100 fontH2"><a>회원가입</a></h2>
        </div>
        <div class="login_content flexColumn flexCenterCenter width100">
          <input class="inputBasic" type="text" id="login_id" name="id" placeholder="아이디" required="" autofocus/>
          <input class="inputBasic" type="password" id="login_pw" name="pw" placeholder="패스워드" required=""/>
          <button class="btnBasic btn_login" type="button">
              로그인
          </button>
        </div>
      </div>
    `;
    $("#main .container").insertAdjacentHTML("beforeend", loginHTML);
  }

  // functions
  loginFormHtml() {
    return `
      <input class="inputBasic" type="text" id="login_id" name="id" placeholder="아이디" required="" autofocus/>
      <input class="inputBasic" type="password" id="login_pw" name="pw" placeholder="패스워드" required=""/>
      <button class="btnBasic btn_login" type="button">
          로그인
      </button>
    `;
  }

  registerFormHtml() {
    return `
      <input class="inputBasic" type="text" id="login_id" name="uid" placeholder="아이디" required="" autofocus/>
      <input class="inputBasic" type="password" id="login_pw" name="pw" placeholder="패스워드" required=""/>
      <input class="inputBasic" type="password" id="login_pw_check" name="pw_check" placeholder="패스워드 확인" required=""/>
      <input class="inputBasic" type="text" id="login_mname" name="mname" placeholder="사용자 이름" required=""/>
      <button class="btnBasic btn_register" type="button">
          회원가입
      </button>
    `;
  }
}

const loginView = new LoginView();
export default loginView;
