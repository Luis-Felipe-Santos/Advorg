<template>
  <div>
    <cabecalhoComponent></cabecalhoComponent>
    <b-container fluid>
      <b-row>
        <b-col lg="3" md="4" sm="6" class="sticky-top">
          <menulateralComponent class="menu"></menulateralComponent>
        </b-col>
        <b-col lg="7" md="5">
          <processosVue></processosVue>
        </b-col>
      </b-row>
    </b-container>
    <rodapeComponent></rodapeComponent>
  </div>
</template>
  
<script>
import cabecalhoComponent from "@/components/cabecalhoComponent.vue";
import menulateralComponent from "@/components/menulateralComponent.vue";
import rodapeComponent from "@/components/rodapeComponent.vue";
import processosVue from "@/components/processosVue.vue";
export default {
  name: "processosView",
  components: {
    cabecalhoComponent,
    menulateralComponent,
    rodapeComponent,
    processosVue,
  },
};
</script>
  
<style scoped>
* {
  padding: 0;
  margin: 0;
}
</style>