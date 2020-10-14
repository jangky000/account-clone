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
  async render() {
    const per = [20, 30, 50];
    const pieHTML = `
      <svg class="pieChart" width="400" height="400">
        <circle class="piePart pie1"
          data-per="30" fill="transparent" 
          cx="${2 * this.r}" cy="${2 * this.r}" r="${this.r}" 
          stroke-width="${2 * this.r}"
        />
      </svg>
    `;
    $("#selected_content").innerHTML = pieHTML;
    await this.waitMS(1000);
    this.css();
  }

  css() {
    const pie1 = $(".pie1");
    const pie1Len = (this.roundLen * 30) / 100;

    pie1.style.setProperty(
      "stroke-dasharray",
      `${pie1Len} ${this.roundLen - pie1Len}`
    );
    pie1.style.setProperty(
      "stroke",
      this.colors[Math.round(Math.random() * this.colors.length)]
    );
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
