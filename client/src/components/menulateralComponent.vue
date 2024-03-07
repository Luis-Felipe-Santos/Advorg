<template>
  <div>
    <b-navbar toggleable="md" type="light" class="fixed">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse id="nav_collapse" is-nav>
        <b-navbar-nav class="flex-column">
          <b-nav-item><router-link class="router-link-no-underline" to="/home"><b-icon icon="house-door-fill"></b-icon> Início</router-link></b-nav-item>
          <b-nav-item><router-link class="router-link-no-underline" to="/perfil"><b-icon icon="person-fill"></b-icon> Perfil</router-link></b-nav-item>
          <b-nav-item><b-icon icon="journal"></b-icon> Cadastro<b-icon icon="caret-left-fill" v-b-toggle.rotation @click="rotateIcon" :class="{ 'rotate': rotated }" class="icon_seta"></b-icon>
            <b-collapse :visible.sync="rotated">
              <ul>
                <b-nav-item><router-link class="router-link-no-underline" to="/cadastro/usuario"><b-icon icon="person-plus-fill"></b-icon> Preposto/operador</router-link></b-nav-item>
                <b-nav-item><router-link class="router-link-no-underline" to="/cadastro/processo"><b-icon icon="folder-plus"></b-icon> Processo</router-link></b-nav-item>
              </ul>
            </b-collapse>
          </b-nav-item>
          <b-nav-item><router-link class="router-link-no-underline" to="/processos"><b-icon icon="briefcase-fill"></b-icon> Processos</router-link></b-nav-item>
          <b-nav-item><router-link class="router-link-no-underline" to="/usuarios"><b-icon icon="people-fill"></b-icon> Usuários</router-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "menulateralComponent",
  data() {
    return {
      rotated: false
    };
  },
  methods: {
    rotateIcon() {
      this.rotated = !this.rotated;
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.navbar-nav {
  margin-top: 5px;
  background-color: rgb(248, 248, 248);
}

.router-link-no-underline {
  text-decoration: none;
  color: #000;
}

.router-link-no-underline:hover{
  color: blue ;
}

.nav-item {
  display: flex;
  border-bottom: 1px dashed black;
  justify-content: start;
}

.rounded {
  border-radius: 25px;
}

.nav-link {
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.icon_seta {
  margin-left: 20px;
}

.rotate {
  transform: rotate(270deg);
}

@media (min-width: 768px) {
  .navbar-nav {
    width: 14vw;
    height: 100vh;
  }
}
@media (min-width: 576px) and (max-width: 767) {
  .nav{
    width: 100vw;
  }
}

</style>
