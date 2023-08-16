<template>
    <div>
      <cabecalhoComponent></cabecalhoComponent>
      <b-container fluid>
        <b-row>
          <b-col lg="3" md="4" sm="6" class="sticky-top">
            <menulateralComponent class="menu"></menulateralComponent>
          </b-col>
          <b-col lg="5" md="5">
          <cadastroComponent></cadastroComponent>
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
  import cadastroComponent from "@/components/cadastroComponent.vue";

  export default {
    name: "cadastroView",
    components: {
      cabecalhoComponent,
      menulateralComponent,
      rodapeComponent,
      cadastroComponent,
    },
  };
  </script>
  <style scoped>
  h2 {
  margin-top: 30px;
  }
  </style>
  