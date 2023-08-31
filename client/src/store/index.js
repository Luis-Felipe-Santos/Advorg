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
    async fetchUserData({ commit}) {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await this._vm.$api.get("/profile", config); // Use the imported axios instance
        const userData = response.data;

        commit("updateUserData", {
          name: userData.name,
          cidade: userData.cidade,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
  getters: {
   
  },
});
