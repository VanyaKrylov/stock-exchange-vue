import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("user-token") || ""
  },
  mutations: {
    set(state, val) {
      localStorage.setItem("user-token", val);
      state.token = val;
    }
  },
  actions: {},
  modules: {}
});
