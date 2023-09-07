<template>
  <div>
    <b-nav>
      <b-nav-item><router-link class="router-link-no-underline" to="/home">Logo</router-link></b-nav-item>
      <b-nav-item @click.prevent="perfil"><b-icon icon="pencil"></b-icon> {{ usuario.name }} Cidade: {{ usuario.cidade }}</b-nav-item>
      <b-nav-item><b-icon icon="book"></b-icon> Manual de utilização</b-nav-item>
      <b-nav-item @click.prevent="sair"><b-icon icon="arrow-bar-right"></b-icon> Sair</b-nav-item>
    </b-nav>
  </div>
</template>

<script>

export default {
  name: "cabecalhoComponent",
  computed: {
    usuario() {
      return this.$store.state.usuario; 
    },
  },
  created() {
    this.$store.dispatch("fetchUserData");
  },
  methods: {
    inicio() {
      this.$router.push("/home");
    },
    perfil() {
      this.$router.push("/perfil");
    },
    sair() {
      this.$router.push("/");
    },

  },
};

</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.nav {
  justify-content: space-between;
  background-color: #2b59bd;
  height: 80px;
}

.nav-item {
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding-bottom: 5px;
}

.nav-link {
  color: white;
}

.nav-link:hover {
  color: white;
}
</style>