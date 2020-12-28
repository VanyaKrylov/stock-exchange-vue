import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user-token") || ""
    //isAuthorized: this.token !== ""
  },
  mutations: {
    set(state, val) {
      localStorage.setItem("user-token", val);
      state.token = val;
    },
    remove() {
      localStorage.removeItem("user-token");
    }
  },
  actions: {},
  modules: {}
});
