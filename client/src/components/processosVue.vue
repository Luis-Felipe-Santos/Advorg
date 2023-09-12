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
                :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                class="form-control"></b-form-datepicker>
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
import { parseISO, format } from "date-fns";
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
          key: 'nProcesso',
          sortable: false
        },
        {
          key: 'nameAutor',
          label: 'Nome Autor',
          sortable: false
        },
        {
          key: 'nameReu',
          label: 'Nome Reu',
          sortable: false
        },
        {
          key: 'createdAt',
          label: 'Data',
          sortable: false,
        },
        {
          key: 'situacao',
          label: 'Situação',
          sortable: false
        },
        {
          key: 'createdBy',
          label: 'Cadastrado por',
          sortable: false
        },
        {
          key: 'eventos',
          label: 'Eventos',
          sortable: false,
          
        },

      ],
      items: [],
      originalItems: [],
    }
  },
  created() {
    this.fetchInitialData();
  },
  methods: {
    async fetchInitialData() {
      try {
        const response = await this.$api.get('/processos'); 
        this.items = response.data;
        
        this.originalItems = [...response.data]; 
      } catch (error) {
        console.error('Erro ao buscar dados iniciais dos processos:', error);
      }
    },

    async submitForm() {
      try {
        // Crie um objeto com os parâmetros de filtro
        const filterParams = {
          input1: this.input1,
          input2: this.input2.toLowerCase(),
          input3: this.input3.toLowerCase(),
          input4: this.input4.toLowerCase(),
          selectedDate: this.selectedDate ? format(parseISO(this.selectedDate), "dd/MM/yyyy") : "",

        };

        const filteredItems = this.originalItems.filter(item => {
          return (
            item.nProcesso.toString().includes(filterParams.input1) &&
            item.nameAutor.toLowerCase().includes(filterParams.input2) &&
            item.nameReu.toLowerCase().includes(filterParams.input3) &&
            item.situacao.toLowerCase().includes(filterParams.input4) &&
            (filterParams.selectedDate === "" || item.createdAt === filterParams.selectedDate)
          );
        });

        this.items = filteredItems;
      } catch (error) {
        console.error('Erro ao buscar dados filtrados dos processos:', error);
      }
    },

    resetForm() {
      this.input1 = '';
      this.input2 = '';
      this.input3 = '';
      this.input4 = '';
      this.selectedDate = null;
      this.items = [...this.originalItems];
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