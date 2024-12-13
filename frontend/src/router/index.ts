import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import store from '@/config/store.js';
import axios from "axios";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/cadastro",
      name: "cadastro",
      component: () => import("@/views/CadastroView.vue"),
    },
    {
      path: "/perfil",
      name: "perfil",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/PerfilView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/consultas',
      name: 'consultas',
      component: () => import("@/views/ConsultasView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/receita',
      name: 'receita',
      component: () => import("@/views/ReceitaView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/novaConsulta',
      name: 'novaConsulta',
      component: () => import("@/views/NovaConsultaView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/gerenciarUsuarios',
      name: 'gerenciarUsuarios',
      component: () => import("@/views/GerenciarUsuarios.vue")
    },
    {
      path: '/editarUsuario',
      name: 'editarUsuario',
      component: () => import("@/views/editarUsuario.vue")
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isLoggedIn) {
      console.log('dele')
      console.log(store.getters.user.nome)
      if(!store.getters.user.id || !store.getters.user.nome) {
        await axios.post(`http://localhost:${import.meta.env.VITE_PORT}/getUser`, {}, {headers: {Authorization: localStorage.getItem('token')}}).then(res => {
          console.log('res get user', res);
          store.state.user = res.data;
        })
      }
      next();
      return;
    } else {
      console.log('dale');
    }
    next('/login')
  } else {
    next();
  }
})

export default router;
