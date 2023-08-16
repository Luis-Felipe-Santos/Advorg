<template>
    <div class="geralE">
        <h2>Usuário - Edição Perfil</h2>
        <form @submit="submitForm">
            <b-form-group label="Nome" label-for="input-nome">
                <b-form-input id="input-nome" v-model="usuario.nome" required></b-form-input>
            </b-form-group>

            <b-form-group label="E-mail" label-for="input-email">
                <b-form-input id="input-email" type="email" v-model="usuario.email" required></b-form-input>
            </b-form-group>

            <b-form-group label="Senha Atual" label-for="input-senha">
                <b-form-input id="input-senha" type="password" v-model="usuario.senha" required></b-form-input>
            </b-form-group>
            
            <b-form-group label="Nova Senha" label-for="input-senha">
                <b-form-input id="input-senha" type="password" v-model="usuario.senha" required></b-form-input>
            </b-form-group>

            <b-form-group>
                <b-button type="submit" variant="primary">Salvar</b-button>
                <b-button type="reset" variant="">Cancelar</b-button>
            </b-form-group>
        </form>
    </div>
</template>
  
<script>
export default {
    name: "edicaouserComponent",
    data() {
        return {
            usuario: {
                nome: '',
                email: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Lógica para salvar as alterações do usuário
            // Você pode acessar os valores atualizados em this.usuario
        }
    }
}
</script>

<style scoped>
.geralE{
    margin: 40px;
}
h2{
    margin-top: 30px;
}
form{
    margin-top: 30px;
}
button {
    margin-top: 20px;
    margin-right: 10px;
}
</style>