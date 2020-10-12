import scss from "./login.scss";

import { $ } from "@utils/tools.js";
import { fetchAPI } from "@utils/fetch.js";

export default class Login {
  render() {
    let html = `
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
    return html;
  }

  addEvent() {
    // 탭 이벤트
    $(".login_title").addEventListener(
      "click",
      this.loginTabHandler.bind(this)
    );

    // 로그인, 회원가입 이벤트
    $(".login_content").addEventListener(
      "click",
      this.loginContentHandler.bind(this)
    );
  }

  // Handler
  loginTabHandler(e) {
    const h2 = e.target.closest("h2");
    if (!h2.classList.contains("loginSelected")) {
      $(".loginTab").classList.toggle("loginSelected");
      $(".registerTab").classList.toggle("loginSelected");
      if (h2.classList.contains("loginTab")) {
        $(".login_content").innerHTML = this.loginFormHtml();
      } else {
        $(".login_content").innerHTML = this.registerFormHtml();
      }
      $("#login_id").focus();
    }
  }

  async loginContentHandler(e) {
    const btn = e.target;
    let result;
    if (btn.classList.contains("btn_login")) {
      result = await this.fetchLogin();
    } else if (btn.classList.contains("btn_register")) {
      result = await this.fetchRegister();
    }
    if (!result) return;
    console.log(result);
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

  // fetch
  async fetchLogin() {
    const inputUid = $("#login_id");
    const inputPw = $("#login_pw");

    if (this.isEmptyInputThenAlert(inputUid, "아이디를 입력하세요"))
      return null;
    if (this.isEmptyInputThenAlert(inputPw, "패스워드를 입력하세요"))
      return null;

    const body = { uid: inputUid.value, pw: inputPw.value };
    return fetchAPI("POST", "/api/auth/login", body);
  }

  async fetchRegister() {
    const inputUid = $("#login_id");
    const inputPw = $("#login_pw");
    const inputMname = $("#login_mname");

    if (this.isEmptyInputThenAlert(inputUid, "아이디를 입력하세요"))
      return null;
    if (this.isEmptyInputThenAlert(inputPw, "패스워드를 입력하세요"))
      return null;
    if (this.isEmptyInputThenAlert(inputMname, "사용자 이름을 입력하세요"))
      return null;

    const body = {
      uid: inputUid.value,
      pw: inputPw.value,
      mname: inputMname.value,
    };
    return fetchAPI("POST", "/api/member", body);
  }

  // utils
  isEmptyInputThenAlert(element, message) {
    if (!element.value) {
      alert(message);
      element.focus();
      return true;
    }
  }
}
