<template>
  <div>
    <b-nav>
      <b-nav-item><router-link class="router-link-no-underline" to="/home"><img class="logo-img" src="../assets/logo1.png" alt="logo"></router-link></b-nav-item>
      <b-nav-item @click.prevent="perfil"><b-icon icon="pencil"></b-icon> {{ usuario.name }} Cidade: {{ usuario.cidade }}</b-nav-item>
      <b-nav-item><b-icon icon="book"></b-icon> Manual de utilização</b-nav-item>
      <b-nav-item @click.prevent="sair"><b-icon icon="arrow-bar-right"></b-icon>Sair</b-nav-item>
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
      this.$store.dispatch("logout");
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
.logo-img {
  width: 100px;
  height: 100%;

}
.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.nav-link {
  color: white;
}

.nav-link:hover {
  color: white;
}
@media (min-width: 300px) and (max-width: 768px) {
  .nav {
    flex-direction: column;
    align-items: center;
    height: auto;
    width: 100vw;
  }
  .logo-img {
    width: 200px;
    height: 100%;
    margin-bottom: -40px; /* Adiciona uma margem inferior para separar a imagem dos outros itens */
    margin-right: 0; /* Remove a margem direita para a imagem ocupar menos espaço */
  }

  a.nav-link{
    font-size: 12px;
  }
}

</style>