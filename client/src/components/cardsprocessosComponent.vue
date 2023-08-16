<template>
    <div class="cards">
        <b-card-group deck>
            <!-- Card 1: Processos -->
            <b-card class="card-item" border-variant="primary" header="Processos" bg-variant="primary"  header-bg-variant="white" header-text-variant="primary"
                align="center">
                <b-card-text>{{processos}}</b-card-text>
            </b-card>
            
            <!-- Card 2: Processos Ativos -->
            <b-card class="card-item" border-variant="success" header="Processos Ativos" bg-variant="success" header-bg-variant="white" header-text-variant="success"
                align="center">
                <b-card-text>{{processosAtivos}}</b-card-text>
            </b-card>
            
            <!-- Card 3: Processos Arquivados -->
            <b-card class="card-item" border-variant="danger" header="Processos Arquivados" bg-variant="danger" header-bg-variant="white" header-text-variant="danger"
                align="center">
                <b-card-text>{{processosArquivados}}</b-card-text>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
export default {
    name: "cardsprocessosComponent",
    data() {
        return {
            processos: "",
            processosAtivos: "250",
            processosArquivados: "50",
        };
    },
    methods: {
        totalProcessos() {
            this.processos = Number(this.processosAtivos) + Number(this.processosArquivados);
        },
    },
    created() {
        this.totalProcessos(); 
    },
    watch: {
        processosAtivos() {
            this.totalProcessos(); 
        },
        processosArquivados() {
            this.totalProcessos(); 
        },
    },
};
</script>

<style scoped>
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

.card-deck{
    display: flex;
    justify-content: center;
}

.card-item {
    width: 200px;
    height: 100px;
    margin: 10px;
}
.card-text{
    color: white;
    font-size: 20px;
    font-weight: bold
}
</style>
