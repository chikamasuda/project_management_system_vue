<script setup lang="ts">
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routeCheck = () => {
  if(route.name === 'ログイン') {
    return false
  } else if(route.name === '新規登録') {
    return false
  } else {
    return true
  }
}
</script>

<template>
  <div v-if="!routeCheck()">
  <v-app>
      <router-view />
  </v-app>
  </div>
  <div v-else>
    <v-app>
      <Header />
      <router-view />
    </v-app>
  </div>
</template>