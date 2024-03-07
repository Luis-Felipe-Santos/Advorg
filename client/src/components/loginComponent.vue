<template>
    <div id="app">
        <div class="logo">
            <div class="conteudos">
                <img src="../assets/logo1.png" alt="ADVORG">
            </div>
        </div>
        <div class="telaLogin">
            <div class="custom-card">
                <b-card title="Entrar">
                    <p>Entre com suas credenciais para acessar o ADVORG.</p>
                    <b-form @submit.prevent="login">
                        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
                            <b-form-input v-model="emailLogin" id="input-1" type="email" placeholder="Digite seu email"
                                required></b-form-input>
                        </b-form-group>
                        <b-form-group class="mt-2" id="input-group-2" label="Senha:" label-for="input-2">
                            <b-form-input v-model="passwordLogin" id="input-2" type="password"
                                placeholder="Digite sua senha" required></b-form-input>
                        </b-form-group>
                        <p class="esqueci" @click="showForgotPassword = true">Esqueceu sua senha?</p>
                        <div class="button">
                            <b-button class="w-50 mt-2 text-normal" type="submit" variant="primary">Entrar</b-button>
                        </div>
                        <b-alert v-if="loginError" variant="danger">
                            Erro ao fazer login. Por favor verifique suas credenciais.
                        </b-alert>
                    </b-form>
                    <div class="button">
                        <b-button class="w-100 mt-2 text-normal" type="submit" variant="outline-primary"><b-icon
                                class="google" icon="google"></b-icon>Entrar com o
                            Google</b-button>
                    </div>
                    <div class="criar">
                        <p>Ainda não tem uma conta?</p>
                        <p class="criar-conta" @click="showCreateAccount = true">Criar Conta</p>

                    </div>
                </b-card>
            </div>
        </div>
        <b-modal v-model="showForgotPassword" title="Esqueceu a senha" hide-footer centered @hide="resetForgotPassword">
            <p>Informe seu email para recuperar sua senha.</p>
            <b-form>
                <b-form-group id="input-group-3" label="Email:" label-for="input-3">
                    <b-form-input id="input-3" type="email" placeholder="Digite seu email" required></b-form-input>
                </b-form-group>
                <div class="button">
                    <b-button class="w-50 mt-2 text-normal" type="submit" variant="primary"
                        @click="recoverPassword">Recuperar senha</b-button>
                </div>
            </b-form>
        </b-modal>
        <b-modal v-model="showSuccessMessage" title="Sucesso" hide-footer @hide="resetSuccessMessage">
            <p>Email de recuperação enviado com sucesso!</p>
        </b-modal>
        <b-modal v-model="showCreateAccount" title="Criar uma conta" hide-footer @hide="resetCreateAccount">
            <p>Preencha o formulário abaixo para criar uma nova conta:</p>
            <b-form @submit.prevent="createAccount">
                <b-form-group id="input-group-4" label="Nome:" label-for="input-4">
                    <b-form-input v-model="name" id="input-4" type="text" placeholder="Digite seu nome"
                        required></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-5" label="Email:" label-for="input-5">
                    <b-form-input v-model="email" id="input-5" type="email" placeholder="Digite seu email"
                        required></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-5" label="Cidade:" label-for="input-6">
                    <b-form-input v-model="cidade" id="input-6" type="text" placeholder="Informe sua cidade"
                        required></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-6" label="Senha:" label-for="input-7">
                    <b-form-input v-model="password" id="input-7" :type="showPassword ? 'text' : 'password'"
                        placeholder="Digite sua senha" required></b-form-input>
                </b-form-group>
                <b-form-checkbox v-model="showPassword">Mostrar Senha</b-form-checkbox>
                <div class="button">
                    <b-button class="w-50 mt-2 text-normal" type="submit" variant="primary">Criar
                        conta</b-button>
                </div>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "loginComponent",
    data() {
        return {
            name: '',
            email: '',
            cidade: '',
            password: '',
            emailLogin: '',
            passwordLogin: '',
            showForgotPassword: false,
            showSuccessMessage: false,
            showCreateAccount: false,
            showPassword: false,
            loginError: false
        };
    },
    methods: {
        async login() {
            console.log('Login method started');
            try {
                const response = await this.$api.post('/login', {
                    email: this.emailLogin,
                    password: this.passwordLogin,
                });

                console.log('Response:', response.data);

                if (response.data.status) {
                    console.log('Successful login');
                    localStorage.setItem('authToken', response.data.token);
                    this.$router.push('/home');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }

        },

        recoverPassword() {
            // Lógica para recuperar a senha

            // Exibir mensagem de sucesso após recuperar a senha
            this.showForgotPassword = false;
            this.showSuccessMessage = true;
        },
        resetForgotPassword() {
            // Reseta o estado da página de "Esqueceu a senha"
            // caso o modal seja fechado sem recuperar a senha
        },
        resetSuccessMessage() {
            // Reseta o estado da mensagem de sucesso
        },
        async createAccount() {
            try {
                const response = await this.$api.post('/register', {
                    name: this.name,
                    email: this.email,
                    cidade: this.cidade,
                    password: this.password
                });
                this.responseData = response.data;

                this.name = '';
                this.email = '';
                this.cidade = '';
                this.password = '';

                alert("Usuário Registrado com sucesso");

            } catch (error) {
                console.error('Erro ao criar a conta:', error);
                alert("O email informado já possui cadastro");
            }

            // Fechar o modal de criar conta
            this.showCreateAccount = false;

        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        resetCreateAccount() {
            this.name = '';
            this.email = '';
            this.cidade = '';
            this.password = '';

            this.showPassword = false;
            this.showCreateAccount = false;
        }
    }
}
</script>

<style >
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box; /* Adicionado para garantir que as dimensões sejam calculadas corretamente */
}

.logo {
    display: flex;
    align-items: center;
    float: left;
    width: 40vw;
    height: 100vh;
    background: #2B59BD;
}
.logo img {
    max-width: 100%;
}

.conteudos {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
}

.telaLogin {
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    height: 100vh;
    width: 60vw;
    background: rgb(248, 248, 248);
}

.custom-card {
    align-items: center;
    max-width: 400px; /* Adicionado para manter a largura máxima do cartão */
    width: 90%; /* Adicionado para garantir que o cartão não ultrapasse a largura máxima */
    margin: 0 auto; /* Adicionado para centralizar o cartão */
}

.card {
    height: 40vh;
    max-width: 50vh;
}

.button {
    display: flex;
    justify-content: center;
}

.google {
    margin-right: 10px;
}

.esqueci {
    margin-top: 10px;
    color: #209cee;
}

.esqueci:hover {
    text-decoration: underline;
    cursor: pointer;
}

.criar {
    position: relative;
    padding-top: 30px;
}

.criar p {
    text-align: center;
}

.criar-conta:hover {
    text-decoration: underline;
    color: #209cee;
    cursor: pointer;
}


@media (max-width: 768px) {
    .logo {
        width: 100%;
        float: none;
        height: auto;
    }

    .telaLogin {
        width: 100%;
        float: none;
        height: auto;
    }

    .custom-card {
        margin-top: 50px; /* Adiciona um espaço entre o cartão e o topo da tela */
    }

    .logo img {
        max-width: 70%; /* Definindo a largura máxima da imagem */
        height: auto; /* Altura automática para manter a proporção */
    }
}

</style>
