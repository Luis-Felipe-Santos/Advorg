<template>
    <div class="geralP">
        <h2>Cadastrar novo processo</h2>
        <b-form @submit="submitForm">
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
    name:"cadastroprocessoComponent",
    data() {
        return {
            processo: {
                numeroProcesso:'',
                nomeAutor: '',
                nomeReu: '',
                email: '',
                senha: '',
                situacao: null,
            },
            situacoes: [],
        };
    },
    created() {
        this.carregarSituacoes(); 
    },
    methods: {
        submitForm() {
            // Lógica para enviar o formulário de cadastro
            // Você pode acessar os valores do formulário em this.usuario
        },
        carregarSituacoes() {
            // Exemplo de carregamento manual:
            this.situacoes = ['Selecione uma', 'Ativado','Baixado'];
        },
    }
}
</script>

<style scoped>
.geralP{
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
</style>