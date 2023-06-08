<script setup lang="ts">
import { Ref, ref, onMounted } from "vue"
import axios from '../plugins/axios.js'
import { useRouter, useRoute } from 'vue-router'
import Axios, { AxiosResponse, AxiosError } from 'axios'

const route = useRoute()
const router = useRouter()
const drawer = ref<boolean>(true)
const links = ref([
  {
    icon: 'mdi-face-woman',
    title: '顧客管理',
    to: '/clients'
  },
  {
    icon: 'mdi-briefcase',
    title: '案件管理',
    to: '/projects'
  },
  {
    icon: 'mdi-check-bold',
    title: 'Todo管理',
    to: '/todo-lists'
  },
  {
    icon: 'mdi-currency-usd',
    title: '売上管理',
    to: '/sales'
  },
  {
    icon: 'mdi-poll',
    title: '売上分析',
    to: '/analysis'
  },
  {
    icon: 'mdi-account',
    title: 'ユーザー設定',
    to: '/mypage'
  },
])

type User = {
  id: number,
  name: string,
  email: string,
  image_url: string | undefined
};
const user: Ref<User> = ref({
  id: 0,
  name: '',
  email: '',
  image_url: ''
})

onMounted(async () => {
  // ユーザー取得
  await axios.get('/api/users')
    .then((res: AxiosResponse) => {
      user.value = res.data.user
      console.log(res)
    }).catch((error: AxiosError) => {
      console.log(error)
    })
})

const logout = async () => {
  await axios.post('/api/users/logout')
    .then(() => {
      router.push('/login')
    }).catch((error: AxiosError) => {
      console.log(error)
    })
}

const routeCheck = (link: string) => {
  if(route.path.includes(link)) {
    return true
  }
}
</script>

<template>
  <v-navigation-drawer color="blue-darken-3" v-model="drawer" clipped>
    <v-sheet color="blue-darken-3" class="pa-4 text-center">
      <v-avatar v-if="user.image_url" class="mb-4" color="grey-lighten-4" size="64">
        <img :src="user.image_url" class="avator"/>
      </v-avatar>
      <v-avatar v-else class="mb-4" color="grey-lighten-4" size="64">
        <img :src="user.image_url" class="avator"/>
      </v-avatar>
      <div>{{  user.name }}</div>
    </v-sheet>
    <v-divider class="border-opacity-25"></v-divider>
    <v-list>
      <v-list-item router link to="/">
        <template v-slot:prepend><v-icon>mdi-home</v-icon></template>
        <v-list-item-title>ホーム</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="link in links"
        :key="link.icon"
        :to="link.to"
        router
        :class="{'v-list-item--active': routeCheck(link.to)}"
      >
        <template v-slot:prepend><v-icon>{{ link.icon }}</v-icon></template>
        <v-list-item-title>{{ link.title }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout()" link>
        <template v-slot:prepend><v-icon>mdi-exit-to-app</v-icon></template>
        <v-list-item-title>ログアウト</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-left">案件管理</v-toolbar-title>
  </v-app-bar>
</template>
