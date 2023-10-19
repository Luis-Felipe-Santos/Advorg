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
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Login</th>
            <th>Cadastro</th>
            <th>Permissão</th>
            <th>Eventos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.createdAt }}</td>
            <td>{{ item.permissao }}</td>
            <td>
              <b-icon @click="visualizar(item)" class="icon" icon="eye"></b-icon>
              <b-icon @click="editar(item)" class="icon" icon="pencil-square"></b-icon>
              <b-icon @click="excluir(item)" class="icon" icon="trash-fill"></b-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
  </div>
</template>
  
<script>
export default {
  name: "usuariosVue",
  data() {
    return {
      searchNome: "",
      searchLogin: "",
      items: [],
      usuarioParaExcluir: null,
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
        console.error('Error while fetching user data:', error);
      }
    },
    visualizar(item) {
      console.log("Visualizar:", item);
    },
    editar(item) {
      console.log("Editar:", item);
    },
    async excluir(userpreposto) {
      if (userpreposto && userpreposto.iduserPreposto) {
        this.usuarioParaExcluir = userpreposto.iduserPreposto;
        this.confirmarExclusao();
      } else {
        console.error("ID do usuário inválido.");
      }
    },

    confirmarExclusao() {
      // Verifique se há um usuário para excluir
      if (this.usuarioParaExcluir) {
        if (confirm("Tem certeza de que deseja excluir este usuário?")) {
          this.excluirUsuario(this.usuarioParaExcluir);
        }
      }
    },
    async excluirUsuario(iduserPreposto) {
      try {
        if (!iduserPreposto || !this.items) {
          console.error("ID de usuário ou lista de usuários indefinidos");
          return;
        }

        const idUsuario = Number(iduserPreposto);

        if (isNaN(idUsuario)) {
          console.error("ID de usuário não é um número válido.");
          return;
        }

        const response = await this.$api.delete(`/usuarios/${idUsuario}`);

        if (response.status === 200) {
          this.items = this.items.filter((item) => item.id !== idUsuario);
          console.log("Usuário excluído com sucesso.");
          this.fetchUserData();
        } else {
          console.error("Erro ao excluir usuário.");
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
</style>