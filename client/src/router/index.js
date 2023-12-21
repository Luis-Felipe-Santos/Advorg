import Vue from 'vue'
import VueRouter from 'vue-router'
import loginComponent from '../components/loginComponent.vue'
import homeView from '@/views/homeView.vue'
import perfilView from '@/views/perfilView.vue'
import cadastrousuarioView from '@/views/cadastrousuarioView.vue'
import cadastroprocessoView from '@/views/cadastroprocessoView.vue'
import processosView from '@/views/processosView.vue'
import usuariosView from '@/views/usuariosView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: loginComponent
  },
  {
    path: '/home',
    name: 'home',
    component: homeView
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: perfilView
  },
  {
    path: '/cadastro/usuario',
    name: 'cadastrousuario',
    component: cadastrousuarioView,
  },
  {
    path: '/cadastro/processo',
    name: 'cadastroprocesso',
    component: cadastroprocessoView
  },
  {
    path: '/processos',
    name: 'processos',
    component: processosView

  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: usuariosView

  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
