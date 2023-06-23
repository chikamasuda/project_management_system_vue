<script setup lang="ts">
import { ref } from "vue"
import axios from '../plugins/axios.js'
import { useRouter, useRoute } from 'vue-router'
import Axios, { AxiosResponse, AxiosError } from 'axios'
import cookie from "vue-cookie";
import { useStoreUser } from "../stores/user";

const route = useRoute()
const router = useRouter()
const drawer = ref<boolean>(true)
const storeUser = useStoreUser()
const title = ref<string>()
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

const logout = async () => {
  await axios.post('/api/users/logout')
    .then((res: AxiosResponse) => {
      cookie.delete('user_token')
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

const setTitle = (linkTitle: string) => {
  title.value = linkTitle
}
</script>

<template>
  <v-navigation-drawer color="blue-darken-3" v-model="drawer" clipped class="pt-3">
    <v-sheet color="blue-darken-3" class="pa-4 text-center">
      <v-avatar v-if="storeUser.user.image_url" class="mb-4" size="64">
        <img :src="storeUser.user.image_url" class="avator" />
      </v-avatar>
      <v-avatar v-else class="mb-4" color="grey-lighten-4" size="64">
        <img src="../assets/icon/no_image.svg" class="avator" />
      </v-avatar>
      <div v-if="storeUser.user.name">{{ storeUser.user.name }}</div>
      <div v-else><span>ユーザー</span></div>
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
        :change="setTitle(link.title)"
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
    <v-toolbar-title class="text-left">{{  route.name }}</v-toolbar-title>
  </v-app-bar>
</template>
