<template>
    <div>
        <div class="title">
            <b-card>
                <h2>Processos</h2>
            </b-card>
        </div>
        <div class="table">
            <b-table sticky-header :items="items" head-variant="light" outlined :fields="fields"></b-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "homeprocessosComponent",
    data() {
        return {
            items: [],
            fields: [
                { key: "nProcesso", label: "N° do Processo" },
                { key: "partes", label: "Partes" },
                { key: "situacao", label: "Situação" },
                { key: "createdAt", label: "Data de cadastro" },
                { key: "createdBy", label: "Cadastrado por" },
            ],
        }
    },
    created() {
        this.getdataProcessos();
    },
    methods: {
        async getdataProcessos() {
            try {
                const token = localStorage.getItem("authToken");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await this.$api.get('/processos', config);
                this.items = response.data.processos.map((processo) => ({
                    ...processo,
                    partes: `${processo.nameAutor} x ${processo.nameReu}`,
                }));
                this.originalItems = [...response.data.processos];
            } catch (error) {
                console.error('Erro ao buscar dados iniciais dos processos:', error);
            }

        }
    }
}

</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.title {
    margin: 10px;
    display: flex;
    justify-content: center;
}

.card {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.table {
    margin-top: 30px;
}
</style>