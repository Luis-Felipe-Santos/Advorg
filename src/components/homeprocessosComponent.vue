<template>
    <div>
        <div class="title">
            <b-card>
                <h2>Processos</h2>
            </b-card>
        </div>
        <div class="table">
            <b-table sticky-header :items="items" head-variant="light" outlined></b-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "homeprocessosComponent",
    data() {
        return {
            items: [
                { id: 40, numero_processo: '500054613013517', partes: 'Macdonald', usuario: "Luis" },
                { id: 21, numero_processo: '500054613013517', partes: 'Shaw', usuario: "Luis" },
                { id: 89, numero_processo: '500054613013517', partes: 'Wilson', usuario: "Luis" },
                { id: 38, numero_processo: '500054613013517', partes: 'Carney', usuario: "Luis" },
                { id: 38, numero_processo: '500054613013517', partes: 'Carney', usuario: "Luis" },
                { id: 38, numero_processo: '500054613013517', partes: 'Carney', usuario: "Luis" },
                { id: 38, numero_processo: '500054613013517', partes: 'Carney', usuario: "Luis" },
                { id: 38, numero_processo: '500054613013517', partes: 'Carney', usuario: "Luis" },
                { id: 38, numero_processo: '500054613013517', partes: 'Carney' },
                { id: 38, numero_processo: '500054613013517', partes: 'Carney' },
                { id: 38, numero_processo: '500054613013517', partes: 'Carney' },
                { id: 38, numero_processo: '500054613013517', partes: 'Carney' }
            ]
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
.table{
    margin-top: 30px;
}
</style>