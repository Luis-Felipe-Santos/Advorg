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

            <b-form-group label="Senha Atual" label-for="input-senha-atual">
                <b-form-input id="input-senha-atual" type="password" v-model="senhaAtual" required></b-form-input>
            </b-form-group>

            <b-form-group label="Nova Senha" label-for="input-nova-senha">
                <b-form-input id="input-nova-senha" type="password" v-model="novaSenha" required></b-form-input>
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
            },
            senhaAtual: '',
            novaSenha: ''
        };
    },
    created() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                const response = await this.$api.get('/profile');
                this.usuario = response.data// Set the fetched user data to the component's data
            } catch (error) {                                                                           
                console.error('Error fetching user data:', error);
            }
        },

        submitForm() {
           
        }
    },
}

</script>

<style scoped>
.geralE {
    margin: 40px;
}

h2 {
    margin-top: 30px;
}

form {
    margin-top: 30px;
}

button {
    margin-top: 20px;
    margin-right: 10px;
}
</style>