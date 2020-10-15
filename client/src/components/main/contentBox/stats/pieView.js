import scss from "./pie.scss";
import { $ } from "@utils/tools.js";
import statusModel from "./statsModel.js";

class PieView {
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
    const html = `
      <div class="pie_box" style="height:600px;">
        <svg id="pieChart" width="600px" height="600px">
        </svg>
      </div>
    `;
    $("#selected_content").innerHTML = html;
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
    if (!this.pieBox) return;

    if (!Object.keys(cateStatus).length) {
      this.pieBox.innerHTML = "소비 내역이 없습니다.";
      return;
    }

    const svgHTML = '<svg id="pieChart" width="600px" height="600px"></svg>';
    this.pieBox.innerHTML = svgHTML;

    let html = "";
    for (let i = 0; i < cateStatus.length; i++) {
      html += this.piePart(i + 1, cateStatus[i]);
    }
    pieChart.innerHTML = html;

    await this.waitMS(1000);

    let prevPercent = 0;
    for (let i = 0; i < cateStatus.length; i++) {
      prevPercent = this.css(i + 1, cateStatus[i].percent, prevPercent);
      if (!prevPercent) break;
    }
  }

  piePart(num, partdata) {
    const html = `
      <circle class="piePart pie${num}"
        data-percent="${partdata.percent}" fill="transparent" 
        cx="${2 * this.r + 100}" cy="${2 * this.r + 100}" r="${this.r}" 
        stroke-width="${2 * this.r}"
      />
      <polyline class="piePart tagline${num}" stroke-width="1" stroke="#5f5f5f" fill="transparent"/>
    `;
    const div = `<div class="tagBox tag${num}" data-cateno="${partdata.cateno}">${partdata.catename} ${partdata.percent}%</div>`;
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

const pieView = new PieView();
statusModel.subscribe(pieView);
export default pieView;
