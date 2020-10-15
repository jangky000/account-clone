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
    this.pieBox = null;
  }
  render() {
    const pieHTML = `
      <div class="pie_box">
        <svg id="pieChart" width="600" height="600">
        </svg>
      </div>
    `;
    $("#selected_content").innerHTML = pieHTML;
    this.pieBox = $(".pie_box");
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
      html += this.piePart(
        i + 1,
        percentList[i].percent,
        percentList[i].cateno,
        percentList[i].catename
      );
    }
    const pieChart = $("#pieChart");
    if (!pieChart) return;
    pieChart.innerHTML = html;
    await this.waitMS(1000);
    let prevPercent = 0;
    for (let i = 0; i < percentList.length; i++) {
      prevPercent = this.css(i + 1, percentList[i].percent, prevPercent);
      if (!prevPercent) break;
    }
  }

  piePart(num, percent, cateno, catename) {
    const html = `
      <circle class="piePart pie${num}"
        data-percent="${percent}" fill="transparent" 
        cx="${2 * this.r + 100}" cy="${2 * this.r + 100}" r="${this.r}" 
        stroke-width="${2 * this.r}"
      />
      <polyline class="piePart tagline${num}" stroke-width="1" stroke="#5f5f5f" fill="transparent"/>
    `;
    const div = `<div class="tagBox tag${num}" data-cateno="${cateno}">${catename}</div>`;
    this.pieBox.insertAdjacentHTML("beforeend", div);
    return html;
  }

  css(num, percent, prevPercent) {
    const pie = $(`.pie${num}`);
    if (!pie) return null;
    const offset = (this.roundLen * prevPercent) / 100 - this.roundLen / 4;
    const pieLen = (this.roundLen * percent) / 100;

    pie.style.setProperty(
      "stroke-dasharray",
      `${pieLen} ${this.roundLen - pieLen}`
    );
    pie.style.setProperty("stroke", this.colors[num - 1]);
    pie.style.setProperty("stroke-dashoffset", -offset);

    const tagLine = $(`.tagline${num}`);
    const points = this.tagLineOpt(
      this.r * 2 + 100,
      this.r * 2 + 100,
      this.r * 2,
      this.r * 2 + 20,
      prevPercent * 3.6,
      percent * 3.6
    );
    tagLine.setAttribute("points", points.join(", "));
    tagLine.style.setProperty("stroke-dasharray", `40 40`);

    const degrees = prevPercent * 3.6 + (percent * 3.6) / 2;
    const transform =
      degrees > 180 ? "translate(-100%, -50%)" : "translate(0, -50%)";
    const tag = $(`.tag${num}`);
    tag.style.setProperty("position", `absolute`);
    tag.style.setProperty("left", `${points[4]}px`);
    tag.style.setProperty("top", `${points[5]}px`);
    tag.style.setProperty("transform", transform);
    tag.style.setProperty("opacity", 1);

    return percent;
  }

  tagLineOpt(x, y, radiusIn, radiusOut, startAngle, endAngle) {
    const degrees = startAngle + endAngle / 2;
    function _toXY(cX, cY, r) {
      const rad = ((degrees - 90) * Math.PI) / 180.0;
      return {
        x: cX + r * Math.cos(rad),
        y: cY + r * Math.sin(rad),
      };
    }
    const startIn = _toXY(x, y, radiusIn);
    const startOut = _toXY(x, y, radiusOut);
    const endOut =
      degrees < 180
        ? { x: startOut.x + 20, y: startOut.y }
        : { x: startOut.x - 20, y: startOut.y };
    const points = [
      startIn.x,
      startIn.y,
      startOut.x,
      startOut.y,
      endOut.x,
      endOut.y,
    ];
    return points;
  }

  // utils
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
