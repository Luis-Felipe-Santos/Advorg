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
                        <p class="esqueci">Esqueceu sua senha?</p>
                        <div class="button">
                            <b-button class="w-50 mt-2 text-normal" type="submit" variant="primary"
                                @click="login">Entrar</b-button>

                        </div>
                    </b-form>
                    <div class="criar">
                        <p>Ainda não tem uma conta?</p>
                        <p class="criar-conta">Criar Conta</p>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "loginComponent",
    methods: {
        login() {
            this.$router.push('/home');
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
  