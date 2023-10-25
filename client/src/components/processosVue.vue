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
        <template v-slot:cell(eventos)="props">

          <b-icon @click="visualizar(props.item)" class="icon" icon="eye"></b-icon>
          <b-icon @click="editar(props.item)" class="icon" icon="pencil-square"></b-icon>
          <b-icon @click="excluir(props.item)" class="icon" icon="trash-fill"></b-icon>

        </template>
      </b-table>
    </b-container>
    <b-modal id="modal-lg" size="lg" centered v-model="isModalVisible" title="Detalhes do processo"
      @hide="fecharModalVisualizacao">

      <div v-if="processoSelecionado">
        <form>
          <div class="form-group-processos">
            <label for="nProcesso"><strong>Nº do Processo:</strong></label>
            <input type="text" id="nProcesso" v-model="processoSelecionado.nProcesso" disabled>
          </div>
    
          <div class="form-group-processos">
            <label for="nameAutor"><strong>Nome do Autor:</strong></label>
            <input type="text" id="nameAutor" v-model="processoSelecionado.nameAutor" disabled>
          </div>
    
          <div class="form-group-processos">
            <label for="nameReu"><strong>Nome do Réu:</strong></label>
            <input type="text" id="nameReu" v-model="processoSelecionado.nameReu" disabled>
          </div>
    
          <div class="form-group-processos">
            <label for="createdAt"><strong>Data de Cadastro:</strong></label>
            <input type="text" id="createdAt" v-model="processoSelecionado.createdAt" disabled>
          </div>
    
          <div class="form-group-processos">
            <label for="situacao"><strong>Situação:</strong></label>
            <input id="situacao" v-model="processoSelecionado.situacao" disabled>
          </div>

          <div class="form-group-processos">
            <label for="createdBy"><strong>Usuário/Operador:</strong></label>
            <input id="createdBy" v-model="processoSelecionado.createdBy" disabled>
          </div>
        </form>
      </div>
      <template #modal-footer>
        <button class="btn btn-secondary" @click="fecharModalVisualizacao">Fechar</button>
      </template>
    </b-modal>
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
      processoParaExcluir: null,
      processoSelecionado: {},
      isModalVisible: false,

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
        this.items = response.data.processos;

        this.originalItems = [...response.data.processos];
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
    visualizar(processo) {
      if (processo) {
        this.processoSelecionado = processo;
        this.isModalVisible = true; // Set to true to show the modal
      } else {
        console.error('Processo é nulo.');
      }
    },
    fecharModalVisualizacao() {
      this.isModalVisible = false;
    },
    editar() {
      // Lógica do clique aqui
      console.log("Editar!");
    },
    async excluir(processo) {
      if (processo && processo.idProcesso) {
        this.processoParaExcluir = processo.idProcesso;
        this.confirmarExclusao();
      } else {
        console.error("ID do processo inválido.");
      }
    },
    confirmarExclusao() {
      // Verifique se há um processo para excluir
      if (this.processoParaExcluir) {
        if (confirm("Tem certeza de que deseja excluir este processo?")) {
          this.excluirProcesso(this.processoParaExcluir);
        }
      }
    },
    async excluirProcesso(idProcesso) {
      try {
        if (!idProcesso || !this.items) {
          console.error("ID de processo ou lista de processos indefinidos");
          return;
        }

        const idProcessoNumber = Number(idProcesso);

        if (isNaN(idProcessoNumber)) {
          console.error("ID de processo não é um número válido.");
          return;
        }

        const response = await this.$api.delete(`/processos/${idProcessoNumber}`);

        if (response.status === 200) {
          this.items = this.items.filter((item) => item.idProcesso !== idProcessoNumber);
          console.log("Processo excluído com sucesso.");
        }
      } catch (error) {
        console.error("Erro ao excluir processo:", error);
      }
    }
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

.form-group-processos {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.form-group-processos label {
  margin-right: 10px;
  width: 150px; /* Defina a largura desejada para os rótulos */
}

.form-group-processos input, .form-group select {
  flex: 1;
}
</style>