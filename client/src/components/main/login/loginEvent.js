import { $ } from "@utils/tools.js";
import { fetchAPI } from "@utils/fetch.js";
import { setToken } from "@utils/token.js";

export default class LoginEvent {
  constructor(loginView) {
    this.loginView = loginView;
  }
  addEvent() {
    // 탭 이벤트
    $(".login_title").addEventListener(
      "click",
      this.loginTabHandler.bind(this.loginView)
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
    if (result.success) {
      setToken(result.token);
    }
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
