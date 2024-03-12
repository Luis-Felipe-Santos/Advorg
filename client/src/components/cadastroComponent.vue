<template>
    <div class="geralP">
        <h2>Cadastrar novo usuário</h2>
        <b-form @submit.prevent="createAccount">
            <div v-if="!isAuthorized" class="alert alert-danger" role="alert">
                Usuário não cadastrado. {{ errorMessage }}
              </div>
              <div v-if="showSuccessMessage" class="alert alert-success" role="alert">
                Usuário registrado com sucesso!
            </div>
            <b-form-group label="Nome" label-for="input-nome">
                <b-form-input id="input-nome" v-model="usuario.nome" required></b-form-input>
            </b-form-group>

            <b-form-group label="E-mail" label-for="input-email">
                <b-form-input id="input-email" type="email" v-model="usuario.email" required></b-form-input>
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
                cidade: '',
                senha: '',
                permissao: null,
            },
            permissoes: ['Selecione uma', 'Master', 'Operador', 'Visualizador'],
            isAuthorized: true,
            errorMessage: '',
            showSuccessMessage: false,
        };
    },
    methods: {
        async createAccount() {
            try {

                const token = localStorage.getItem("authToken");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                await this.$api.post('/cadastro/preposto', {
                    name: this.usuario.nome,
                    email: this.usuario.email,
                    cidade: this.usuario.cidade,
                    password: this.usuario.senha,
                    permissao: this.usuario.permissao,
                }, config);

                this.showSuccessMessage = true;
                this.clearForm();
                setTimeout(() => {
                    this.showSuccessMessage = false;
                }, 3000);

            } catch (error) {
                this.isAuthorized = false;

                console.error('Erro ao criar a conta:', error);

                this.errorMessage = 'Ocorreu um erro ao criar a conta.';

                if (error.response) {
                    // O servidor respondeu com um status de erro
                    console.error('Erro de resposta do servidor:', error.response.data);
                    this.errorMessage = error.response.data.error || this.errorMessage;
                } else if (error.request) {
                    // A solicitação foi feita, mas não houve resposta do servidor
                    console.error('Sem resposta do servidor:', error.request);
                } else {
                    // Algo aconteceu ao configurar a solicitação que acionou um erro
                    console.error('Erro ao configurar a solicitação:', error.message);
                }
                this.clearForm();
                setTimeout(() => {
                    this.isAuthorized = true;
                    this.errorMessage = '';
                }, 4000);
            }

        },
        clearForm(){
            this.usuario.nome = '';
                this.usuario.email = '';
                this.usuario.cidade = '';
                this.usuario.senha = '';
                this.usuario.permissao = null;
        }
    },
};
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
</style>
