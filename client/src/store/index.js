import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: {
      name: '',
      cidade: '',
    },
    erro: null, // Adicionando um estado para erros
  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.usuario.name = data.name;
      state.usuario.cidade = data.cidade;
    },
    SET_ERROR(state, error) {
      state.erro = error;
    },
  },
  actions: {
    async fetchUserData({ commit }) {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await this._vm.$api.get("/profile", config);
        const userData = response.data;

        commit("SET_USER_DATA", {
          name: userData.name,
          cidade: userData.cidade,
        });
        commit("SET_ERROR", null); // Limpar qualquer erro anterior
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        commit("SET_ERROR", error); // Armazenar o erro no estado
      }
    },
  },
  getters: {
    // Adicione getters conforme necessário
  },
});
