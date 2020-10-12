import "core-js/modules/es.array.flat";
import css from "./style.scss";

import headerView from "@components/header/headerView.js";
import mainView from "@components/main/mainView.js";

headerView.render();
mainView.render();
mainView.addEvent();
