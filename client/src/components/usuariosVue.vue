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
              <th>Situação</th>
              <th>Permissão</th>
              <th>Eventos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
              <td>{{ item.Nome }}</td>
              <td>{{ item.Login }}</td>
              <td>{{ formatarData(item.Cadastro) }}</td>
              <td>{{ item.Situação }}</td>
              <td>{{ item.Permissão}}</td>
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
    name: "processosVue",
    data() {
      return {
        searchNome: "",
        searchLogin: "",
        items: [
          { id: 1, Nome: "João", Login: "joao123", Cadastro: "2022-01-01", Permissão: "Master", Situação: "Ativo" },
          { id: 2, Nome: "Maria", Login: "maria456", Cadastro: "2022-02-02", Situação: "Inativo" },
          { id: 3, Nome: "Pedro", Login: "pedro789", Cadastro: "2022-03-03", Situação: "Ativo" },
          { id: 4, Nome: "Ana", Login: "ana321", Cadastro: "2022-04-04", Situação: "Inativo" }
        ]
      };
    },
    computed: {
      filteredItems() {
        const { searchNome, searchLogin,items } = this;
        if (!searchNome && !searchLogin) {
          return items;
        }
        return items.filter(item => {
          const nomeMatch = item.Nome.toLowerCase().includes(searchNome.toLowerCase());
          const loginMatch = item.Login.toLowerCase().includes(searchLogin.toLowerCase());
    
          return nomeMatch && loginMatch;
        });
      }
    },
    methods: {
      formatarData(data) {
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
      },
      visualizar(item) {
        console.log("Visualizar:", item);
      },
      editar(item) {
        console.log("Editar:", item);
      },
      excluir(item) {
        console.log("Excluir:", item);
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
  .pesquisas{
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