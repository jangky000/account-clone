import scss from "./accountLog.scss";

import { $ } from "@utils/tools.js";

class AccountLogView {
  render() {
    $("#selected_content").innerHTML = "";
    this.accountInputRender();
    this.accountBoxRender();
  }

  accountInputRender() {
    const html = `
    <div class="account_input width100 flexColumn flexCenterCenter">
      <ul class="width100">
        <li class="width100">
          <span>분류</span>
          <button class="btnBasicSmall">수입</button>
          <button class="btnBasicSmall">지출</button>
          <a class="floatRight fontMainTone" href="#">내용 지우기</a>
        </li>
        <li class="flexRow width100">
          <div class="flexAuto flexRow">
            <span>날짜</span>
            <input class="underlineInput flexAuto" type="text" name="rdate" placeholder="0000-00-00"/>
          </div>
          <div class="flexAuto flexRow">
            <span>카테고리</span>
            <select class="underlineInput flexAuto" name="category" id="account_category">
              <option value="1">월급</option>
              <option value="2">용돈</option>
              <option value="3">기타</option>
              <option value="4">식비</option>
            </select>
          </div>
          <div class="flexAuto flexRow">
            <span>결제수단</span>
            <select class="underlineInput flexAuto" name="pay_method" id="account_payMethod">
              <option value="1">현금</option>
              <option value="2">현재카드</option>
              <option value="3">카카오체크카드</option>
              <option value="4">국민은행</option>
            </select>
          </div>
        </li>
        <li class="flexRow">
          <div class="flexAuto flexRow">
            <span>금액</span>
            <input class="underlineInput flexAuto" type="text" />
          </div>
          <div class="flexAuto flexRow">
            <span>내용</span>
            <input class="underlineInput flexAuto" type="text" />
          </div>
        </li>
        <li class="width100">
          <button class="btnBasic width100">확인</button>
        </li>
      </ul>
    </div>
    `;
    $("#selected_content").insertAdjacentHTML("beforeend", html);
  }
  accountBoxRender() {
    const html = `
    <div class="account_box">
      <div class="ie_filter">
        <label class="income" for="account_income">
          <input type="checkbox" name="income" id="account_income" value="I"/>
          수입
        </label>
        <label class="expense" for="account_expense">
          <input type="checkbox" name="expense" id="account_expense" value="E"/>
          지출
        </label>
      </div>
      <div class="account_list width100">
        <ul class="width100">
          <li class="account_lhead flexRow">
            <div class="lhead_date flexAuto">
              <span class="rdate">10월 17일</span>
              <span class="dayname">토</span>
            </div>
            <div class="lhead_money flexAuto textRight">
              <span class="income">+0원</span>
              <span class="expense">-2,000원</span>
            </div>
          </li>
          <li class="account_lbody flexRow flexHCenter">
            <div class="flexAuto">
              <span class="category cate_expense">쇼핑</span>
            </div>
            <div class="flex4">
              <span class="memo">미용실</span>
            </div>
            <div class="flexAuto textRight">
              <span class="pay_method">현대카드</span>
            </div>
            <div class="flexAuto textRight">
              <span class="money expense">-2,000원</span>
            </div>
          </li>
          <li class="account_lbody flexRow flexHCenter">
            <div class="flexAuto">
              <span class="category cate_income">월급</span>
            </div>
            <div class="flex4">
              <span class="memo">9월 급여</span>
            </div>
            <div class="flexAuto textRight">
              <span class="pay_method">카카오체크카드</span>
            </div>
            <div class="flexAuto textRight">
              <span class="money income">+2,000,000원</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    `;
    $("#selected_content").insertAdjacentHTML("beforeend", html);
  }
}

const accountLogView = new AccountLogView();
export default accountLogView;
