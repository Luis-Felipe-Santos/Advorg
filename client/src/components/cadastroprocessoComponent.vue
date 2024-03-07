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

            <b-form-group label="Anexos" label-for="anexos">
                <b-form-file
                    id="anexos"
                    v-model="processo.anexos"
                    :state="Boolean(processo.anexos)"
                    placeholder="Selecione um ou mais arquivos..."
                    multiple
                ></b-form-file>
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
                        "Content-Type": "multipart/form-data",
                    },
                };

                const formData = new FormData();
                formData.append("nProcesso", this.processo.numeroProcesso);
                formData.append("nameAutor", this.processo.nomeAutor);
                formData.append("nameReu", this.processo.nomeReu);
                formData.append("situacao", this.processo.situacao);

                // Adicionando os arquivos selecionados ao FormData
                if (this.processo.anexos) {
                    for (let i = 0; i < this.processo.anexos.length; i++) {
                        formData.append("anexos", this.processo.anexos[i]);
                    }
                }

                await this.$api.post('/cadastro/processo', formData, config);

                this.processo.numeroProcesso = '';
                this.processo.nomeAutor = '';
                this.processo.nomeReu = '';
                this.processo.situacao = null;
                this.processo.anexos = null;

                alert('Processo Cadastrado com sucesso');
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