<script setup lang="ts">
import { Ref, ref, onMounted } from "vue"
import axios from '../plugins/axios.js'
import { useRouter } from 'vue-router'
import Axios, { AxiosResponse, AxiosError } from 'axios';

const router = useRouter()
const drawer = ref<boolean>(true)
const links = ref([
  ['mdi-home', 'ホーム', '/'],
  ['mdi-face-woman', '顧客管理', ''],
  ['mdi-briefcase ', '案件管理', ''],
  ['mdi-check-bold', 'Todo管理', ''],
  ['mdi-currency-usd', '売上管理', ''],
  ['mdi-poll', '売上分析', ''],
  ['mdi-account', 'ユーザー設定', ''],
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
</script>

<template>
  <v-navigation-drawer color="blue-darken-3" v-model="drawer" clipped>
    <v-sheet color="blue-darken-3" class="pa-4 text-center">
      <v-avatar class="mb-4" color="grey-lighten-4" size="64">
        <img :src="user.image_url" class="avator"/>
      </v-avatar>
      <div>{{  user.name }}</div>
    </v-sheet>
    <v-divider class="border-opacity-25"></v-divider>
    <v-list color="white">
      <v-list-item
        v-for="([icon, text, to], index) in links"
        :key="icon"
        link
        class="text-white"
        router 
        :to="`${to[index]}`"
      >
        <template v-slot:prepend>
          <v-icon>{{ icon }}</v-icon>
        </template>

        <v-list-item-title>{{ text }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout()" link>
        <template v-slot:prepend>
            <v-icon>mdi-exit-to-app</v-icon>
        </template>
        <v-list-item-title>ログアウト</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-left">案件管理</v-toolbar-title>
  </v-app-bar>
</template>
