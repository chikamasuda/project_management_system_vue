<script setup lang="ts">
import Header from './components/header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
    <div v-if="routeCheck()">
      <Header />
    </div>
    <router-view />
  </v-app>
</template>