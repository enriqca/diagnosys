import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import {BootstrapVue, BootstrapVueIcons, IconsPlugin} from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import store from "@/config/store";
import Vuex from "vuex";


import Axios from "axios";

import "./assets/main.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(IconsPlugin);
Vue.use(Vuex);

Vue.prototype.$http = Axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_PORT}/`,
});

const token = localStorage.getItem('token');

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}





new Vue({
  router,
  render: (h) => h(App),
  store
}).$mount("#app");
