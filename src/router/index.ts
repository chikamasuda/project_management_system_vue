import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ClientIndex from '../views/Client/index.vue'
import ClientCreate from '../views/Client/create.vue'
import cookie from 'vue-cookie'
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

//ユーザーが認証されていないときnextでログインページに飛ばす
const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (!cookie.get('user_token')) {
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
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;