<template>
    <div class="geralP">
        <h2>Cadastrar novo processo</h2>
        <b-form @submit.prevent="registerProcesso">
            <div v-if="showSuccessMessage" class="alert alert-success">
                Processo cadastrado com sucesso!
            </div>
            <div v-if="showErrorMessage" class="alert alert-danger" role="alert">
                Processo não cadastrado. {{ errorMessage }}
            </div>
            <b-form-group label="Número do Processo" label-for="num_processo">
                <b-form-input id="num_processo" v-model="processo.nProcesso" required></b-form-input>
            </b-form-group>

            <b-form-group label="Autor" label-for="nome_autor">
                <b-form-input id="nome_autor" v-model="processo.nameAutor" required></b-form-input>
            </b-form-group>

            <b-form-group label="Reu" label-for="nome_reu">
                <b-form-input id="nome_reu" v-model="processo.nameReu" required></b-form-input>
            </b-form-group>

            <b-form-group label="Situação" label-for="input-situacao">
                <b-form-select id="input-situacao" v-model="processo.situacao" required>
                    <option v-for="situacao in situacoes" :key="situacao" :value="situacao">{{ situacao }}</option>
                </b-form-select>
            </b-form-group>
            <b-form-group>
                <b-button type="submit" variant="primary">Cadastrar</b-button>
                <b-button type="reset" variant="">Cancelar</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>
export default {
    name: "cadastroprocessoComponent",
    data() {
        return {
            processo: {
                nProcesso: '',
                nameAutor: '',
                nameReu: '',
                situacao: null,
            },
            situacoes: [],
            showSuccessMessage: false,
            showErrorMessage: false,
            errorMessage: '',
        };
    },
    created() {
        this.carregarSituacoes();
    },
    methods: {
        async registerProcesso() {
            try {
                const token = localStorage.getItem("authToken");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
                    },
                };

                const data = {
                    nProcesso: this.processo.nProcesso,
                    nameAutor: this.processo.nameAutor,
                    nameReu: this.processo.nameReu,
                    situacao: this.processo.situacao,
                };

                await this.$api.post('/cadastro/processo', data, config);

                this.showSuccessMessage = true;
                this.clearForm();
                setTimeout(() => {
                    this.showSuccessMessage = false;
                }, 3000);
            } catch (error) {
                console.error('Erro ao cadastrar processo:', error);

                let errorMessage = 'Ocorreu um erro ao cadastrar um novo processo.';

                if (error.response) {
                    console.error('Erro de resposta do servidor:', error.response.data);
                    errorMessage = error.response.data.error || errorMessage;
                } else if (error.request) {
                    console.error('Sem resposta do servidor:', error.request);
                } else {
                    console.error('Erro ao configurar a solicitação:', error.message);
                }
                this.errorMessage = errorMessage;
                this.showErrorMessage = true;
                setTimeout(() => {
                    this.showErrorMessage = false;
                    this.errorMessage = '';
                }, 4000);
                this.clearForm();
            }
        },
        clearForm() {
            this.processo.nProcesso = "";
            this.processo.nameAutor = "";
            this.processo.nameReu = "";
            this.processo.situacao = null;
        },
        carregarSituacoes() {
            this.situacoes = ['Selecione uma', 'Ativo', 'Baixado'];
        },
    }
}
</script>

<style scoped>
.geralP {
    margin: 40px;
}

form {
    margin-top: 50px;
}

button {
    margin-top: 10px;
    margin-right: 10px;
}

h2 {
    margin-top: 20px;
}

.no-placeholder .form-control-placeholder {
    display: none;
}
</style>