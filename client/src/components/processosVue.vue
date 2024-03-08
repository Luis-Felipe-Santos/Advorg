<template>
  <div>
      <h2>Processos</h2>
      <b-container class="custom-container">
        <b-form>
          <b-row>
            <b-col cols="12" sm="6" md="6" lg="3">
              <b-form-group label="Nº do Processo">
                <b-form-input v-model="input1"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="6" lg="4" class="ml-sm-3 mb-3">
              <b-form-group label="Nome Autor">
                <b-form-input v-model="input2"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="6" lg="4">
              <b-form-group label="Nome Reu">
                <b-form-input v-model="input3"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" sm="6" md="6" lg="4">
              <b-form-group label="Data" class="w-100">
                <b-form-datepicker v-model="selectedDate"
                  :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                  class="form-control"></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="6" md="6" lg="4" class="mb-5">
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
      <div class="table-responsive">
      <b-table striped hover :items="items" :fields="fields">
        <template v-slot:cell(eventos)="props">
          <b-icon @click="visualizar(props.item)" class="icon" icon="eye"></b-icon>
          <b-icon @click="editar(props.item)" class="icon" icon="pencil-square"></b-icon>
          <b-icon @click="excluir(props.item)" class="icon" icon="trash-fill"></b-icon>
        </template>
      </b-table>
    </div>
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
    <b-modal id="modal-editar" size="lg" centered v-model="isModalEditarVisible" title="Editar processo">
      <form @submit.prevent="salvarEdicao">
        <div class="form-group-processos">
          <label for="nProcessoEdit"><strong>Nº do Processo:</strong></label>
          <input type="text" id="nProcessoEdit" v-model="processoSelecionadoEdit.nProcesso">
        </div>
        <div class="form-group-processos">
          <label for="nameAutorEdit"><strong>Nome do Autor:</strong></label>
          <input type="text" id="nameAutorEdit" v-model="processoSelecionadoEdit.nameAutor">
        </div>
        <div class="form-group-processos">
          <label for="nameReuEdit"><strong>Nome do Réu:</strong></label>
          <input type="text" id="nameReuEdit" v-model="processoSelecionadoEdit.nameReu">
        </div>
        <div class="form-group-processos">
          <label for="createdAtEdit"><strong>Data de Cadastro:</strong></label>
          <input type="text" id="createdAtEdit" v-model="processoSelecionadoEdit.createdAt" disabled>
        </div>
        <div class="form-group-processos">
          <label for="situacaoEdit"><strong>Situação:</strong></label>
          <input id="situacaoEdit" v-model="processoSelecionadoEdit.situacao">
        </div>
        <div class="form-group-processos">
          <label for="createdByEdit"><strong>Usuário/Operador:</strong></label>
          <input id="createdByEdit" v-model="processoSelecionadoEdit.createdBy" disabled>
        </div>
      </form>
      <template #modal-footer>
        <button type="submit" class="btn btn-primary">Salvar</button>
        <button type="button" class="btn btn-secondary" @click="fecharModalEdicao">Cancelar</button>
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
      processoSelecionadoEdit: {},
      isModalEditarVisible: false,

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
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await this.$api.get('/processos', config);
        this.items = response.data.processos;

        this.originalItems = [...response.data.processos];
      } catch (error) {
        console.error('Erro ao buscar dados iniciais dos processos:', error);
      }
    },

    async submitForm() {
      try {
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
        this.isModalVisible = true;
      } else {
        console.error('Processo é nulo.');
      }
    },
    fecharModalVisualizacao() {
      this.isModalVisible = false;
    },
    editar(processo) {
      if (processo) {
        this.processoSelecionadoEdit = { ...processo }; // Faz uma cópia do objeto para evitar alterações diretas
        this.isModalEditarVisible = true;
      } else {
        console.error('Processo é nulo.');
      }
    },
    fecharModalEdicao() {
      this.isModalEditarVisible = false;
    },
    async salvarEdicao() {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await this.$api.put(`/processos/${this.processoSelecionadoEdit.idProcesso}`, this.processoSelecionadoEdit, config);

        if (response.status === 200) {
          // Atualize os detalhes do processo na lista exibida
          const index = this.items.findIndex(item => item.idProcesso === this.processoSelecionadoEdit.idProcesso);
          if (index !== -1) {
            this.$set(this.items, index, this.processoSelecionadoEdit);
          }
          this.isModalEditarVisible = false;
          console.log("Processo editado com sucesso.");
        } else {
          console.error("Erro ao editar processo:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao editar processo:", error);
      }
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

        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await this.$api.delete(`/processos/${idProcessoNumber}`, config);

        if (response.status === 200) {
          this.items = this.items.filter((item) => item.idProcesso !== idProcessoNumber);
          console.log("Processo excluído com sucesso.");
        } else if (response.status === 403) {
          console.error("Permissão negada. Você não tem as permissões necessárias para excluir este processo.");
        } else {
          console.error("Erro ao excluir processo:", response.statusText);
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
  width: 150px;
}

.form-group-processos input,
.form-group select {
  flex: 1;
}
</style>
