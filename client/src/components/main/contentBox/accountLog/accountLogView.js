import scss from "./accountLog.scss";
import { $, $All } from "@utils/tools.js";
import accountLogModel from "./accountLogModel.js";

class AccountLogView {
  render() {
    $("#selected_content").innerHTML = "";
    this.accountInputRender();
    this.accountBoxRender();
    this.addEvent();
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
            <input class="underlineInput flexAuto" type="date" name="rdate" placeholder="0000-00-00"/>
          </div>
          <div class="flexAuto flexRow">
            <span>카테고리</span>
            <select class="underlineInput flexAuto" name="category" id="account_category">
            </select>
          </div>
          <div class="flexAuto flexRow">
            <span>결제수단</span>
            <select class="underlineInput flexAuto" name="pay_method" id="account_payMethod">
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
          <input type="checkbox" name="income" id="account_income" value="I" checked/>
          수입
        </label>
        <label class="expense" for="account_expense">
          <input type="checkbox" name="expense" id="account_expense" value="E" checked/>
          지출
        </label>
      </div>
      <div class="account_list width100">
        <ul class="width100">
        </ul>
      </div>
    </div>
    `;
    $("#selected_content").insertAdjacentHTML("beforeend", html);
  }

  update(data) {
    if (data.message === "jwt expired") {
      location.reload();
      return;
    }
    if (data.select) {
      this.renderSelectList(data.select);
    } else if (data.logs) {
      // filer에 따라서 hidden표시
      this.renderAccountList(data.logs);
    } else if (false) {
      // input form 업데이트 시
    }
  }

  renderSelectList(select) {
    let cateHTML = "";
    select.cateList.forEach((cate) => {
      cateHTML += `<option value="${cate.cateno}">${cate.catename}</option>`;
    });
    $("#account_category").innerHTML = cateHTML;

    let payHTML = "";
    select.payList.forEach((pay) => {
      payHTML += `<option value="${pay.payno}">${pay.payname}</option>`;
    });
    $("#account_payMethod").innerHTML = payHTML;
  }

  renderAccountList(logs) {
    let html = "";
    Object.keys(logs).forEach((key) => {
      html += this.lheadHTML(logs[key]);
      logs[key].contents.forEach((content) => {
        html += this.lbodyHTML(content);
      });
    });
    $(".account_list ul").innerHTML = html;
  }

  lheadHTML(head) {
    const html = `
      <li class="account_lhead flexRow">
        <div class="lhead_date flexAuto">
          <span class="rdate" data-rdate="${head.date}">${head.date}</span>
          <span class="dayname">${head.dayname}</span>
        </div>
        <div class="lhead_money flexAuto textRight">
          <span class="income">+${head.tot_income}원</span>
          <span class="expense">-${head.tot_expense}원</span>
        </div>
      </li>
    `;
    return html;
  }

  lbodyHTML(content) {
    const html = `
    <li class="account_lbody flexRow flexHCenter mode${content.iemode}">
      <div>
        <span class="category ${
          content.iemode == "I" ? "cate_income" : "cate_expense"
        }" data-cateno="${content.cateno}">${content.catename}</span>
      </div>
      <div class="flex4">
        <span class="memo">${content.memo}</span>
      </div>
      <div class="flexAuto textRight">
        <span class="pay_method" data-payno="${content.payno}">${
      content.payname
    }</span>
      </div>
      <div class="flexAuto textRight">
        <span class="money ${
          content.iemode == "I" ? "income" : "expense"
        }" data-money="${content.money}">${content.money}원</span>
      </div>
    </li>
    `;
    return html;
  }

  addEvent() {
    $("#account_income").addEventListener("change", this.checkBoxHandler);
    $("#account_expense").addEventListener("change", this.checkBoxHandler);
  }

  checkBoxHandler(e) {
    const target = e.target;
    if (target.id === "account_income") {
      const incomes = $All(".modeI");
      if (target.checked) {
        //remove hidden
        incomes.forEach((income) => {
          if (income.classList.contains("hidden")) {
            income.classList.remove("hidden");
          }
        });
      } else {
        // add hidden
        incomes.forEach((income) => {
          if (!income.classList.contains("hidden")) {
            income.classList.add("hidden");
          }
        });
      }
    } else if (target.id === "account_expense") {
      const expenses = $All(".modeE");
      if (target.checked) {
        //remove hidden
        expenses.forEach((expense) => {
          if (expense.classList.contains("hidden")) {
            expense.classList.remove("hidden");
          }
        });
      } else {
        // add hidden
        expenses.forEach((expense) => {
          if (!expense.classList.contains("hidden")) {
            expense.classList.add("hidden");
          }
        });
      }
    }
  }
}

const accountLogView = new AccountLogView();
accountLogModel.subscribe(accountLogView);
export default accountLogView;
