import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faEye,
  faFileArrowUp,
  faPlus,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret);
library.add(faPlus);
library.add(faEye);
library.add(faFileArrowUp);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
