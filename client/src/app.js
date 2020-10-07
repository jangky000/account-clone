import "core-js/modules/es.array.flat";
import css from "./style.scss";

import Header from "@layouts/header/header.js";
import Main from "@layouts/main/main.js";

layout.insertAdjacentHTML("beforeend", new Header().render());

const main = new Main();
layout.insertAdjacentHTML("beforeend", main.render());
main.addEvent();
