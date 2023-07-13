<template>
  <div>
    <h2>Processos</h2>
    <b-container class="custom-container">
      <b-form>
        <b-row>
          <b-col cols="3">
            <b-form-group label="Nº do Processo">
              <b-form-input v-model="input1"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="4" class="ml-3 mb-3">
            <b-form-group label="Nome Autor">
              <b-form-input v-model="input2"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Nome Reu">
              <b-form-input v-model="input3"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-form-group label="Data">
              <b-form-datepicker v-model="selectedDate"
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }" class="form-control"
               ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col cols="3" class="mb-5">
            <b-form-group label="Situação">
              <b-form-input v-model="input4" class="form-control"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button @click="submitForm">Buscar</b-button>
        <b-button class="button2" @click="resetForm">Limpar</b-button>
      </b-form>
    </b-container>
    <b-container class="custom-container">
      <b-table striped hover :items="items" :fields="fields">
        <template v-slot:cell(eventos)="">
          <b-icon @click="visualizar" class="icon" icon="eye"></b-icon>
          <b-icon @click="editar" class="icon" icon="pencil-square"></b-icon>
          <b-icon @click="excluir" class="icon" icon="trash-fill"></b-icon>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "processosVue",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      selectedDate: null, 

      fields: [
        {
          key: 'id',
          sortable: false
        },
        {
          key: 'NumeroProcesso',
          sortable: false
        },
        {
          key: 'NomeAutor',
          label: 'Nome Autor',
          sortable: false
        },
        {
          key: 'NomeReu',
          label: 'Nome Reu',
          sortable: false
        },
        {
          key: 'data',
          label: 'Data',
          sortable: false
        },
        {
          key: 'situacao',
          label: 'Situação',
          sortable: false
        },
        {
          key: 'NomeUser',
          label: 'Cadastrado por',
          sortable: false
        },
        {
          key: 'eventos',
          label: 'Eventos',
          sortable: false
        },

      ],
      items: [
        { id: 1, NumeroProcesso: 5000123214521412, NomeAutor: 'Dickerson', NomeReu: 'Macdonald', data: '11/07/2023', NomeUser: 'Luis', situacao: 'Ativo' },
        { id: 2, NumeroProcesso: 5000123214521413, NomeAutor: 'Luis', NomeReu: 'Irineu', data: '12/10/2023', NomeUser: 'Luis', situacao: 'Baixado' },
        { id: 3, NumeroProcesso: 5000123214521414, NomeAutor: 'Luis', NomeReu: 'Irineu', data: '12/10/2023', NomeUser: 'Luis', situacao: 'Baixado' },

      ],
      originalItems: []
    }
  },
  created() {
    // Copy the original items to the separate variable when the component is created
    this.originalItems = [...this.items];
  },
  methods: {
    
    submitForm() {
      // Filter the items array based on the input values
      const filteredItems = this.originalItems.filter(item => {
        // Perform case-insensitive matching for process number, author name, and defendant name
        const searchInput1 = this.input1.toLowerCase();
        const searchInput2 = this.input2.toLowerCase();
        const searchInput3 = this.input3.toLowerCase();
        const searchInput4 = this.input4.toLowerCase();

        return (
          item.NumeroProcesso.toString().includes(searchInput1) &&
          item.NomeAutor.toLowerCase().includes(searchInput2) &&
          item.NomeReu.toLowerCase().includes(searchInput3) &&
          item.situacao.toLowerCase().includes(searchInput4)
        );
      });

      this.items = filteredItems;
    },

    resetForm() {
      // Clear the input values
      this.input1 = '';
      this.input2 = '';
      this.input3 = '';
      this.input4 = '';
      this.selectedDate = null;
      // Restore the original items
      this.items = [
        ...this.originalItems
      ];
    },
    visualizar() {
      // Lógica do clique aqui
      console.log("Ícone clicado!");
    },
    editar() {
      // Lógica do clique aqui
      console.log("Editar!");
    },
    excluir() {
      // Lógica do clique aqui
      console.log("Excluir!");
    },
  }
}

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

.button2 {
  margin-left: 20px;
}

.icon {
  margin-left: 10px;
  cursor: pointer;
}
</style>