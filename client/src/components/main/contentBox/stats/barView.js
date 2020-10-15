import scss from "./bar.scss";
import { $ } from "@utils/tools.js";
import statusModel from "./statsModel.js";

class BarView {
  constructor() {
    this.colors = [
      "#ff6565",
      "#ffc965",
      "#f0ff65",
      "#96ff65",
      "#65ffbf",
      "#65d3ff",
      "#656fff",
      "#9b65ff",
      "#e065ff",
      "#ff65c4",
    ];
    this.table = null;
  }
  render() {
    const html = `
    <div class="bar_box">
      <table>
        <colgroup>
          <col width="10%">
          <col width="10%">
          <col width="60%">
          <col width="20%">
        </colgroup>
      </table>
    </div>
    `;
    $("#selected_content").insertAdjacentHTML("beforeend", html);
    this.table = $(".bar_box table");
  }

  update(data) {
    if (data.message === "jwt expired") {
      location.reload();
      return;
    }

    if (data.cateStatus) {
      this.renderBarChart(data.cateStatus);
    }
  }

  renderBarChart(cateStatus) {
    if (!this.table) return;

    this.table.innerHTML = "";

    let html = "";
    for (let i = 0; i < cateStatus.length; i++) {
      html += this.barRow(i + 1, cateStatus[i]);
    }
    this.table.insertAdjacentHTML("beforeend", html);
  }

  barRow(rownum, rowdata) {
    const html = `
      <tr data-cateno="${rowdata.cateno}">
        <td>${rowdata.catename}</td>
        <td class="fontMainTone">${rowdata.percent}%</td>
        <td>
          <svg class="barChart">
            <rect x="0" y="0" width="${rowdata.percent}%" height="100%" 
              fill="${this.colors[rownum - 1]}"/>
          </svg>
        </td>
        <td>${rowdata.total_money}원</td>
      </tr>
    `;
    return html;
  }
}

const barView = new BarView();
statusModel.subscribe(barView);
export default barView;
