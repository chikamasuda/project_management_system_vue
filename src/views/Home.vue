<template>
  <v-app>
    <v-navigation-drawer color="blue-darken-3" v-model="drawer" clipped>
      <v-sheet
          color="blue-darken-3"
          class="pa-4 text-center"
        >
          <v-avatar
            class="mb-4"
            color="grey-lighten-4"
            size="64"
          >
          <img
            src="https://picsum.photos/64/64?random"
            alt="avatarImage"
          />
          </v-avatar>

          <div>テストユーザー１</div>
        </v-sheet>

        <v-divider class="border-opacity-25"></v-divider>

        <v-list color="white">
          <v-list-item
            v-for="[icon, text] in links"
            :key="icon"
            link
            class="text-white"
          >
            <template v-slot:prepend>
              <v-icon>{{ icon }}</v-icon>
            </template>

            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-left">案件管理</v-toolbar-title>
    </v-app-bar>
    <v-main>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue"

const drawer = ref<boolean>(true)
const links =ref([
  ['mdi-home', 'HOME'],
  ['mdi-face-woman', '顧客管理'],
  ['mdi-briefcase ', '案件管理'],
  ['mdi-check-bold', 'Todo管理'],
  ['mdi-currency-usd', '売上管理'],
  ['mdi-poll', '売上分析'],
  ['mdi-account', 'ユーザー設定'],
  ['mdi-exit-to-app', 'ログアウト'],
])
const cards = ref(['Today', 'Yesterday'])
</script>
