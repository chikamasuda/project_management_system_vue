import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ClientIndex from '../views/Client/Index.vue'
import ClientCreate from '../views/Client/Create.vue'
import ClientEdit from '../views/Client/Edit.vue'
import Analysis from '../views/Analysis.vue'
import cookie from 'vue-cookie'
import { useStoreUser } from "../stores/user";
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

//ユーザーが認証されていないときnextでログインページに飛ばす
const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (!useStoreUser().user || !cookie.get('user_token')) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/clients',
    name: 'ClientIndex',
    component: ClientIndex
  },
  {
    path: '/clients/create',
    name: 'ClientCreate',
    component: ClientCreate
  },
  {
    path: '/clients/edit/:client_id',
    name: 'ClientEdit',
    component: ClientEdit
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: Analysis
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;