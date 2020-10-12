import "core-js/modules/es.array.flat";
import css from "./style.scss";

import Header from "@views/header/header.js";
import Main from "@views/main/main.js";

layout.insertAdjacentHTML("beforeend", new Header().render());

const main = new Main();
layout.insertAdjacentHTML("beforeend", main.render());
main.addEvent();
