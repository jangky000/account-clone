import scss from "./stats.scss";
import { $ } from "@utils/tools.js";
import statusModel from "./statsModel.js";

class StatusView {
  constructor() {
    this.r = 100;
    this.roundLen = 2 * Math.PI * this.r;
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
  }
  render() {
    const pieHTML = `
      <svg id="pieChart" width="400" height="400">
      </svg>
    `;
    $("#selected_content").innerHTML = pieHTML;
  }

  update(data) {
    if (data.message === "jwt expired") {
      location.reload();
      return;
    }
    if (data.cateStatus) {
      this.renderPieChart(data.cateStatus);
    }
  }

  async renderPieChart(cateStatus) {
    const tot_sum = Object.keys(cateStatus).reduce((acc, key) => {
      acc += cateStatus[key].total_money;
      return acc;
    }, 0);
    const percentList = Object.keys(cateStatus).reduce((arr, key) => {
      const money = cateStatus[key].total_money;
      const percent = Math.round((money / tot_sum) * 100);
      arr.push({
        money: money,
        percent: percent,
        catename: cateStatus[key].catename,
        cateno: cateStatus[key].cateno,
      });
      return arr;
    }, []);

    percentList.sort((a, b) => {
      return b.percent - a.percent;
    });
    // console.log(percentList);
    let html = "";
    for (let i = 0; i < percentList.length; i++) {
      html += this.piePart(i + 1, percentList[i].percent);
    }
    const pieChart = $("#pieChart");
    if (!pieChart) return;
    pieChart.innerHTML = html;
    await this.waitMS(1000);
    let offset = 0;
    for (let i = 0; i < percentList.length; i++) {
      offset = this.css(i + 1, percentList[i].percent, offset);
      if (!offset) break;
    }
  }

  piePart(num, percent) {
    const html = `
      <circle class="piePart pie${num}"
        data-percent="${percent}" fill="transparent" 
        cx="${2 * this.r}" cy="${2 * this.r}" r="${this.r}" 
        stroke-width="${2 * this.r}"
      />
    `;
    return html;
  }

  css(num, percent, offset) {
    const pie = $(`.pie${num}`);
    if (!pie) return null;
    const pieLen = (this.roundLen * percent) / 100;

    pie.style.setProperty(
      "stroke-dasharray",
      `${pieLen} ${this.roundLen - pieLen}`
    );
    pie.style.setProperty("stroke", this.colors[num - 1]);
    pie.style.setProperty("stroke-dashoffset", -offset);
    return pieLen;
  }

  waitMS(ms) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(true);
      }, ms);
    });
  }
}

const statusView = new StatusView();
statusModel.subscribe(statusView);
export default statusView;
