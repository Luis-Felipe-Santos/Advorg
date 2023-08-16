<template>
    <div class="geralP">
        <h2>Cadastrar novo usuário</h2>
        <b-form @submit="submitForm">
            <b-form-group label="Nome" label-for="input-nome">
                <b-form-input id="input-nome" v-model="usuario.nome" required></b-form-input>
            </b-form-group>

            <b-form-group label="E-mail" label-for="input-email">
                <b-form-input id="input-email" type="email" v-model="usuario.email" required></b-form-input>
            </b-form-group>

            <b-form-group label="Cep" label-for="input-cep">
                <b-form-input id="input-cep" type="text" v-model="usuario.cep" required></b-form-input>
            </b-form-group>
            <b-form-group label="Cidade" label-for="input-cidade">
                <b-form-input id="input-cidade" type="text" v-model="usuario.cidade" required></b-form-input>
            </b-form-group>

            <b-form-group label="Senha" label-for="input-senha">
                <b-form-input id="input-senha" type="password" v-model="usuario.senha" required></b-form-input>
            </b-form-group>

            <b-form-group label="Permissão" label-for="input-permissao">
                <b-form-select id="input-permissao" v-model="usuario.permissao" required>
                    <option v-for="permissao in permissoes" :key="permissao" :value="permissao">{{ permissao }}</option>
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
    data() {
        return {
            usuario: {
                nome: '',
                email: '',
                senha: '',
                permissao: null,
            },
            permissoes: [],
        };
    },
    created() {
        this.carregarPermissoes(); // Chama o método para carregar as permissões
    },
    methods: {
        submitForm() {
            // Lógica para enviar o formulário de cadastro
            // Você pode acessar os valores do formulário em this.usuario
        },
        carregarPermissoes() {
            // Exemplo de carregamento manual:
            this.permissoes = ['Selecione uma', 'Master', 'Operador', 'Visualizador'];
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