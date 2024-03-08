<template>
  <div>
    <h2>Usuários</h2>
    <b-container class="custom-container">
      <b-row class="pesquisas">
        <b-col cols="6" md="3">
          <b-form-input v-model="searchNome" placeholder="Pesquisar por Nome" />
        </b-col>
        <b-col cols="6" md="3">
          <b-form-input v-model="searchLogin" placeholder="Pesquisar por Login" />
        </b-col>
      </b-row>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Login</th>
              <th>Cadastro</th>
              <th>Permissão</th>
              <th>Cadastrado Por</th>
              <th>Eventos</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.permissao }}</td>
              <td>{{ item.userName }}</td>
              <td>
                <b-icon @click="visualizar(item)" class="icon" icon="eye"></b-icon>
                <b-icon @click="editar(item)" class="icon" icon="pencil-square"></b-icon>
                <b-icon @click="excluir(item)" class="icon" icon="trash-fill"></b-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-container>
    <b-modal id="modal-lg" size="lg" centered v-model="showModal" title="Detalhes do Usuário"
      @hide="fecharModalVisualizacao">
      <div v-if="selectedUser">
        <b-container>
          <b-row class="modal-row">
            <b-col md="3">Nome:</b-col>
            <b-col md="9">{{ selectedUser.name }}</b-col>
          </b-row>
          <b-row class="modal-row">
            <b-col md="3">Login:</b-col>
            <b-col md="9">{{ selectedUser.email }}</b-col>
          </b-row>
          <b-row class="modal-row">
            <b-col md="3">Cadastro:</b-col>
            <b-col md="9">{{ selectedUser.createdAt }}</b-col>
          </b-row>
          <b-row class="modal-row">
            <b-col md="3">Permissão:</b-col>
            <b-col md="9">{{ selectedUser.permissao }}</b-col>
          </b-row>
          <b-row class="modal-row">
            <b-col md="3">Cadastrado Por:</b-col>
            <b-col md="9">{{ selectedUser.userName }}</b-col>
          </b-row>
        </b-container>
      </div>
      <template #modal-footer>
        <button class="btn btn-secondary" @click="fecharModalVisualizacao">Fechar</button>
      </template>
    </b-modal>

    <b-modal id="modal-edicao" size="lg" centered v-model="showEditModal" title="Editar Usuário">
      <b-container>
        <b-row class="modal-row" >
          <b-col md="3">Nome:</b-col>
          <b-col md="9">
            <b-form-input v-model="editedUser.name" />
          </b-col>
        </b-row>
        <b-row class="modal-row">
          <b-col md="3">Login:</b-col>
          <b-col md="9">
            <b-form-input v-model="editedUser.email" />
          </b-col>
        </b-row>
        <b-row class="modal-row">
          <b-col md="3">Permissão:</b-col>
          <b-col md="9">
            <b-form-input v-model="editedUser.permissao" />
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <button class="btn btn-secondary" @click="cancelarEdicao">Cancelar</button>
        <button class="btn btn-primary" @click="salvarEdicao">Salvar</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "usuariosVue",
  data() {
    return {
      showModal: false,
      selectedUser: {},
      searchNome: "",
      searchLogin: "",
      items: [],
      usuarioParaExcluir: null,
      showEditModal: false,
      editedUser: {},
    };
  },
  computed: {
    filteredItems() {
      const { searchNome, searchLogin, items } = this;
      if (!searchNome && !searchLogin) {
        return items;
      }
      return items.filter(item => {
        if (!item) return false;
        const nomeMatch = (item.name || "").toLowerCase().includes(searchNome.toLowerCase());
        const loginMatch = (item.email || "").toLowerCase().includes(searchLogin.toLowerCase());

        return nomeMatch && loginMatch;
      });
    }
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await this.$api.get('/usuarios', config);
        if (response.status === 200) {
          this.items = response.data;
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao acessar essa página:', error);

        let errorMessage = 'Erro ao acessar pagina';

        if (error.response) {
          console.error('Erro de resposta do servidor:', error.response.data);
          errorMessage = error.response.data.error || errorMessage;
        } else if (error.request) {
          console.error('Sem resposta do servidor:', error.request);
        } else {

          console.error('Erro ao configurar a solicitação:', error.message);
        }
        alert(errorMessage);
      }
    },
    visualizar(user) {
      this.selectedUser = user;
      this.showModal = true;
    },
    fecharModalVisualizacao() {
      this.showModal = false;
    },

    editar(item) {
      this.editedUser = { ...item };
      this.showEditModal = true;
    },
    cancelarEdicao() {
      this.showEditModal = false;
      this.editedUser = {};
    },
    async salvarEdicao() {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await this.$api.put(`/usuarios/${this.editedUser.id}`, this.editedUser, config);

        if (response.status === 200) {
          this.fetchUserData();
          console.log("Usuário atualizado com sucesso.");
        } else {
          console.error("Erro ao atualizar usuário. Status:", response.status);
          console.error("Resposta do servidor:", response.data);
        }
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
      } finally {
        this.showEditModal = false;
        this.editedUser = {};
      }
    },
    async excluir(userpreposto) {
      if (userpreposto && userpreposto.id) {
        this.usuarioParaExcluir = userpreposto.id;
        this.confirmarExclusao();
      } else {
        console.error("ID do usuário inválido.");
      }
    },

    confirmarExclusao() {
      if (this.usuarioParaExcluir) {
        if (confirm("Tem certeza de que deseja excluir este usuário?")) {
          this.excluirUsuario(this.usuarioParaExcluir);
        }
      }
    },
    async excluirUsuario(idUsuario) {
      try {
        console.log("Tentando excluir o usuário com ID:", idUsuario);

        if (!idUsuario || !this.items) {
          console.error("ID de usuário ou lista de usuários indefinidos");
          return;
        }

        const response = await this.$api.delete(`/usuarios/${idUsuario}`);

        if (response.status === 204) {
          const updatedItems = this.items.filter((item) => item.id !== idUsuario);
          this.$set(this, 'items', updatedItems);
          console.log("Usuário excluído com sucesso.");
        } else if (response.status === 200) {
          console.log("Usuário excluído com sucesso.");
        } else {
          console.error("Erro ao excluir usuário. Status:", response.status);
          console.error("Resposta do servidor:", response.data);
        }
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    }
  }
};

</script>

<style scoped>


* {
  padding: 0;
  margin: 0;
}

h2 {
  margin-top: 50px;
}

.custom-container {
  margin-top: 40px;
  border: 1px solid #ccc;
  padding: 10px;
}

.pesquisas {
  margin-bottom: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.icon {
  margin-left: 10px;
  cursor: pointer;
}
.modal-row {
  margin-bottom: 10px;
}
</style>