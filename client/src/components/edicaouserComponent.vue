<template>
    <div class="geralE">
        <h2>Usuário - Edição Perfil</h2>
        <form @submit.prevent="submitForm">
            <div v-if="showSuccessMessage" class="alert alert-success">
                Perfil atualizado com sucesso!
            </div>
            <div v-if="showErrorMessage" class="alert alert-danger" role="alert">
                Dados do perfil não atualizados. {{ errorMessage }}
            </div>
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
            showSuccessMessage: false,
            successTimeout: null,
            showErrorMessage: false,
            errorMessage: '',
        };
    },
    created() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                const token = localStorage.getItem("authToken");
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
                const token = localStorage.getItem("authToken");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const requestBody = {
                    name: this.usuario.name,
                    email: this.usuario.email,
                    cidade: this.usuario.cidade,
                };

                if (this.novaSenha.trim() !== '') {
                    requestBody.newPassword = this.novaSenha;
                }

                const response = await this.$api.put("/updateProfile", requestBody, config);
                console.log(response.data);

                this.$store.commit('SET_USER_DATA', {
                    name: this.usuario.name,
                    cidade: this.usuario.cidade,
                });

                this.showSuccessMessage = true;
                setTimeout(() => {
                    this.showSuccessMessage = false;
                }, 3000);
                this.usuarioOriginal = JSON.parse(JSON.stringify(this.usuario));

                this.novaSenha = '';

            } catch (error) {
                console.error("Erro ao atualizar perfil:", error);

                let errorMessage = 'Ocorreu um erro ao atualizar o perfil.';

                if (error.response) {
                    // O servidor respondeu com um status de erro
                    console.error('Erro de resposta do servidor:', error.response.data);
                    errorMessage = error.response.data.error || errorMessage;
                } else if (error.request) {
                    // A solicitação foi feita, mas não houve resposta do servidor
                    console.error('Sem resposta do servidor:', error.request);
                } else {
                    // Algo aconteceu ao configurar a solicitação que acionou um erro
                    console.error('Erro ao configurar a solicitação:', error.message);
                }
                this.errorMessage = errorMessage;
                this.showErrorMessage = true;
                setTimeout(() => {
                    this.showErrorMessage = false;
                    this.errorMessage = '';
                }, 4000);
                this.cancel();
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