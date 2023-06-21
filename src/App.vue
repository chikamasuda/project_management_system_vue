<script setup lang="ts">
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'
import { useStoreUser } from "./stores/user"

const route = useRoute()
const storeUser = useStoreUser()

const routeCheck = () => {
  if(route.name === 'Login') {
    return false
  } else if(route.name === 'Register') {
    return false
  } else {
    return true
  }
}

</script>

<template>
  <v-app>
    <div v-if="!routeCheck()">
      <router-view />
    </div>
    <div v-else>
      <Header />
      <router-view />
    </div>
  </v-app>
</template>