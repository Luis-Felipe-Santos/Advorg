<template>
  <div>
    <cabecalhoComponent></cabecalhoComponent>
    <b-container fluid>
      <b-row>
        <b-col lg="3" md="4" sm="6" class="sticky-top">
          <menulateralComponent class="menu"></menulateralComponent>
        </b-col>
        <b-col lg="7" md="5" >
          <datetimeComponent></datetimeComponent>
          <cardsprocessosComponent></cardsprocessosComponent>
          <homeprocessosComponent></homeprocessosComponent>
        </b-col>

      </b-row>
     
      
    </b-container>
  </div>
</template>

<script>
import cabecalhoComponent from "./cabecalhoComponent.vue";
import menulateralComponent from "./menulateralComponent.vue";
import datetimeComponent from "./datetimeComponent.vue";
import cardsprocessosComponent from "./cardsprocessosComponent.vue";
import homeprocessosComponent from "./homeprocessosComponent.vue";
export default {
  name: "homeComponent",
  components: {
    cabecalhoComponent,
    menulateralComponent,
    datetimeComponent,
    cardsprocessosComponent,
    homeprocessosComponent 
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

</style>