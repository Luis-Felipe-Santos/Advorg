import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: {
      name: '',
      cidade: '',
  },
  },
  mutations: {
    updateUserData(state, data) {
      state.usuario.name = data.name;
      state.usuario.cidade = data.cidade;
  },

  },
  actions: {
 
  },
  getters: {
   
  },
});
