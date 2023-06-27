<template>
    <div class="container-card">
        <b-card class="custom-card">
            <div class="card-date">
                <h6>Data:</h6>
                <p>{{ currentDate }}</p>
                <h6>Hora:</h6>
                <p>{{ currentTime }}</p>
            </div>
        </b-card>
    </div>
</template>
<script>
export default {
    name: "datetimeComponent",
    data() {
        return {
            currentDate: '',
            currentTime: ''
        };
    },
    mounted() {
        this.getCurrentDate();
        this.startClock();
    },
    methods: {
        startClock() {
            this.updateTime();

            setInterval(() => {
                this.updateTime();
            }, 1000);
        },
        getCurrentDate() {
            const currentDate = new Date();
            this.currentDate = currentDate.toLocaleDateString();
        },
        updateTime() {
            const currentDate = new Date();
            this.currentTime = currentDate.toLocaleTimeString();
        }
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}
.container-card {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.custom-card {
    width: 100%;
}

.card-date {
    display: flex;
    align-items: center;
    justify-content: center;
}

h6 {
    margin-left: 20px;
    margin-right: 10px;
}
</style>