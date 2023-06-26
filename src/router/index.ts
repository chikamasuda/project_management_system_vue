import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ClientIndex from '../views/Client/Index.vue'
import ClientCreate from '../views/Client/Create.vue'
import ClientEdit from '../views/Client/Edit.vue'
import Analysis from '../views/Analysis.vue'
import cookie from 'vue-cookie'
import store from '../store/index'
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'

//ユーザーが認証されていないときnextでログインページに飛ばす
const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (!store.getters.getUser  || !cookie.get('user_token')) {
    next({ name: 'ログイン' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'ホーム',
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'ログイン',
    component: Login
  },
  {
    path: '/register',
    name: '新規登録',
    component: Register
  },
  {
    path: '/clients',
    name: '顧客管理',
    component: ClientIndex,
    beforeEnter: requireAuth,
  },
  {
    path: '/clients/create',
    name: '顧客登録',
    component: ClientCreate,
    beforeEnter: requireAuth,
  },
  {
    path: '/clients/edit/:client_id',
    name: '顧客編集',
    component: ClientEdit,
    beforeEnter: requireAuth,
  },
  {
    path: '/analysis',
    name: '売上分析',
    component: Analysis,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;