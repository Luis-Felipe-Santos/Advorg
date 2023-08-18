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
                    <b-form>
                        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
                            <b-form-input id="input-1" type="email" placeholder="Digite seu email" required></b-form-input>
                        </b-form-group>
                        <b-form-group class="mt-2" id="input-group-2" label="Senha:" label-for="input-2">
                            <b-form-input id="input-2" type="password" placeholder="Digite sua senha"
                                required></b-form-input>
                        </b-form-group>
                        <p class="esqueci" @click="showForgotPassword = true">Esqueceu sua senha?</p>
                        <div class="button">
                            <b-button class="w-50 mt-2 text-normal" type="submit" variant="primary"
                                @click="login">Entrar</b-button>
                        </div>
                        <div class="button">
                            <b-button class="w-100 mt-2 text-normal" type="submit" variant="outline-primary"
                                @click="login"><b-icon class="google" icon="google"></b-icon>Entrar com o Google</b-button>
                        </div>
                    </b-form>
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
                <b-form-group id="input-group-6" label="Senha:" label-for="input-6">
                    <b-form-input v-model="password" id="input-6" :type="showPassword ? 'text' : 'password'"
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

import axios from 'axios';

export default {
    name: "loginComponent",
    data() {
        return {
            name: '',
            email: '',
            password: '',
            showForgotPassword: false,
            showSuccessMessage: false,
            showCreateAccount: false,
            showPassword: false,
        };
    },
    methods: {
        login() {
            this.$router.push('/home');
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
            // Lógica para criar uma nova conta
            try {
                const response = await axios.post('http://localhost:2000/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                });
                alert(response.data.message);

                this.name = '';
                this.email = '';
                this.password = '';
            } catch (error) {
                console.error('Erro ao registrar usuário:', error);
            }
            // Fechar o modal de criar conta
            this.showCreateAccount = false;

            // Redirecionar o usuário para a página de login ou realizar outras ações necessárias
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        resetCreateAccount() {
            // Reseta o estado da página de "Criar uma conta"
            // caso o modal seja fechado sem criar a conta
        }
    }
}
</script>
  
<style >
* {
    padding: 0;
    margin: 0;
}

.logo {
    display: flex;
    align-items: center;
    position: absolute;
    float: left;
    width: 40vw;
    height: 100vh;
    background: #2B59BD;
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
</style>
  