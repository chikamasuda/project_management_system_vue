<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()
const editAlert = ref<boolean>(false)

onMounted(async () => {
  if (route.query.type == 'edit') {
    editAlert.value = true
    setTimeout(() => {
      editAlert.value = false
    }, 2000)
  }
})
</script>

<template>
  <transition>
    <v-alert class="mb-5" v-show="editAlert" type="warning" title="編集が完了しました。">
    </v-alert>
  </transition>
</template>