<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()
const createAlert = ref<boolean>(false)

onMounted(async () => {
  if (route.query.type == 'create') {
    createAlert.value = true
    setTimeout(() => {
      createAlert.value = false
    }, 2000)
  }
})
</script>

<template>
  <transition>
    <v-alert class="mb-5" v-show="createAlert" type="info" title="登録が完了しました。">
    </v-alert>
  </transition>
</template>