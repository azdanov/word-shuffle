import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
