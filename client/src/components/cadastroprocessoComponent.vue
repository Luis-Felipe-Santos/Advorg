<template>
    <div class="geralP">
        <h2>Cadastrar novo processo</h2>
        <b-form @submit.prevent="registerProcesso">
            <b-form-group label="Número do Processo" label-for="num_processo">
                <b-form-input id="num_processo" v-model="processo.numeroProcesso" required></b-form-input>
            </b-form-group>

            <b-form-group label="Autor" label-for="nome_autor">
                <b-form-input id="nome_autor" v-model="processo.nomeAutor" required></b-form-input>
            </b-form-group>

            <b-form-group label="Reu" label-for="nome_reu">
                <b-form-input id="nome_reu" v-model="processo.nomeReu" required></b-form-input>
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
                numeroProcesso: '',
                nomeAutor: '',
                nomeReu: '',
                situacao: null,
                anexos: null,
            },
            situacoes: [],
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
                    },
                };

                await this.$api.post('/cadastro/processo', {
                    nProcesso: this.processo.numeroProcesso,
                    nameAutor: this.processo.nomeAutor,
                    nameReu: this.processo.nomeReu,
                    situacao: this.processo.situacao,
                }, config);

                this.processo.numeroProcesso = '';
                this.processo.nomeAutor = '';
                this.processo.nomeReu = '';
                this.processo.situacao = null;

                alert('Processo Cadastrado com sucesso');
            } catch (error) {
                console.error('Erro ao cadastrar processo:', error);

                let errorMessage = 'Ocorreu um erro ao cadastrar um novo processo.';

                if (error.response) {
                    // O servidor respondeu com um status de erro
                    console.error('Erro de resposta do servidor:', error.response.data);
                    errorMessage = error.response.data.error || errorMessage;
                } else if (error.request) {
                    // A solicitação foi feita, mas não houve resposta do servidor
                    console.error('Sem resposta do servidor:', error.request);
                } else {
                    // Algo aconteceu ao configurar a solicitação que acionou um erro
                    console.error('Erro ao configurar a solicitação:', error.message);
                }
                alert(errorMessage);
            }

    },
    submitForm() {
        // Lógica para enviar o formulário de cadastro
        // Você pode acessar os valores do formulário em this.usuario
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