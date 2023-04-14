<template>
  <v-card color="basil" class="auth-card">
    <v-tabs v-model="tab" bg-color="transparent" color="blue-darken-3" grow>
      <v-tab to="/login">ログイン</v-tab>
      <v-tab to="/register">新規登録</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-tab-item value="login">
      <v-card class="text-center">
        <v-row justify="center" align-content="center">
          <v-col cols="11">
            <v-text-field round label="名前" class="mt-4 pt-5" variant="solo"></v-text-field>
            <v-text-field round label="Eメール" class="mt-4" variant="solo"></v-text-field>
            <v-text-field round label="パスワード" variant="solo" class="mt-4"></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="text-none mb-5 mt-4" color="blue-darken-1" size="large">
          新規登録
        </v-btn>
      </v-card>
    </v-tab-item>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue"

const tab = ref('')

</script>