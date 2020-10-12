import scss from "./header.scss";

export default class HeaderView {
  render() {
    let html = `
      <div id="header">
        <h1 class="headTitle fontH1 height100 flexRow flexCenterCenter">
          가계부
        </h1>
        <div class="payMethodManage">
          <a href="#" class="fontWhite">결제수단관리</a>
        </div>
      </div>
    `;
    return html;
  }
}
