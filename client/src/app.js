import "core-js/modules/es.array.flat";
import css from "./style.scss";

import Header from "@layouts/header/header.js";
import Main from "@layouts/main/main.js";

layout.insertAdjacentHTML("beforeend", new Header().render());
layout.insertAdjacentHTML("beforeend", new Main().render());
