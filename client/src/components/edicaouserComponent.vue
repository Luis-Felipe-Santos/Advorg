<template>
    <div class="geralE">
        <h2>Usuário - Edição Perfil</h2>
        <form @submit.prevent="submitForm">
            <b-form-group label="Nome" label-for="input-nome">
                <b-form-input id="input-nome" v-model="usuario.name"></b-form-input>
            </b-form-group>

            <b-form-group label="E-mail" label-for="input-email">
                <b-form-input id="input-email" type="email" v-model="usuario.email"></b-form-input>
            </b-form-group>

            <b-form-group label="Cidade" label-for="input-cidade">
                <b-form-input id="input-cidade" type="text" v-model="usuario.cidade"></b-form-input>
            </b-form-group>

            <b-form-group label="Nova Senha" label-for="input-nova-senha">
                <b-form-input id="input-nova-senha" type="password" v-model="novaSenha"></b-form-input>
            </b-form-group>

            <b-form-group>
                <b-button type="submit" variant="primary">Salvar</b-button>
                <b-button type="button" variant="" @click="cancel">Cancelar</b-button>
                <b-modal v-model="showSuccessModal" id="successModal" title="Perfil Atualizado com Sucesso">
                    Seu perfil foi atualizado com sucesso!
                    <template #modal-footer>
                        <b-button variant="primary" @click="closeSuccessModal">Fechar</b-button>
                    </template>
                </b-modal>
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
                name: '',
                email: '',
                cidade: '',
                
            },
            usuarioOriginal: {}, 
            novaSenha: '',
            showSuccessModal: false,
            successTimeout: null,
        };
    },
    created() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                const token = localStorage.getItem("authToken");// Replace with your actual JWT token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await this.$api.get("/profile", config);
                console.log(response.data);
                this.usuario = response.data;
                this.usuarioOriginal = JSON.parse(JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },

        async submitForm() {
            try {
                const token = localStorage.getItem("authToken"); // Substitua pelo token real

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const requestBody = {
                    name: this.usuario.name,
                    email: this.usuario.email,
                    cidade: this.usuario.cidade,
                    newPassword: this.novaSenha,
                };

                const response = await this.$api.put("/updateProfile", requestBody, config);
                console.log(response.data);

                this.$store.commit('updateUserData', {
                    name: this.usuario.name,
                    cidade: this.usuario.cidade,
                });

                this.showSuccessModal = true;
                this.successTimeout = setTimeout(this.closeSuccessModal, 2000);
                this.usuarioOriginal = JSON.parse(JSON.stringify(this.usuario));

            } catch (error) {
                console.error("Erro ao atualizar perfil:", error);
            }
        },

        cancel() {
            this.usuario = JSON.parse(JSON.stringify(this.usuarioOriginal));
            this.novaSenha = '';
        },

        closeSuccessModal() {
            this.showSuccessModal = false;
            clearTimeout(this.successTimeout);
        },
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