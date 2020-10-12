import "core-js/modules/es.array.flat";
import css from "./style.scss";

import HeaderView from "@components/header/headerView.js";
import MainView from "@components/main/mainView.js";

layout.insertAdjacentHTML("beforeend", new HeaderView().render());

const main = new MainView();
layout.insertAdjacentHTML("beforeend", main.render());
main.addEvent();
