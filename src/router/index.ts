import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import cookie from 'vue-cookie'

//ユーザーが認証されていないときnextでログインページに飛ばす
const requireAuth = (to, from, next) => {
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
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;