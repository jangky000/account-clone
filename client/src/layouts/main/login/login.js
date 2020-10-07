import scss from "./login.scss";

export default class Login {
  render() {
    let html = `
        <div class="login_box flexColumn flexCenterCenter">
            <div class="login_title">
                <h2 class="fontH2"><a href="#">로그인</a></h2>
                <h2 class="fontH2"><a href="#">회원가입</a></h2>
            </div>
            <input class="inputBasic" type="text" id="login_id" name="id" placeholder="아이디" required="" autofocus/>
            <input class="inputBasic" type="password" id="login_pw" name="pw" placeholder="패스워드" required=""/>
            <button class="btnBasic" type="button" id="btn_login">
                로그인
            </button>
        </div>
    `;
    return html;
  }
}
