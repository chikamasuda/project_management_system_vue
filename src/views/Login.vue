<script setup lang="ts">
import { ref } from "vue"
import axios from '../plugins/axios.js'
import { useRouter } from 'vue-router'
import cookie from 'vue-cookie'

const tab = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const mismatchError = ref<string>()
const emailError = ref([])
const passwordError = ref([])
const router = useRouter()

const login = async () => {
  await axios.post('/api/users/login', {
    email: email.value,
    password: password.value,
  }).then((res) => {
    email.value = ""
    password.value = ""
    cookie.set('user_token', JSON.parse(res.data.token)['access_token'], 30)
    router.push('/')
  }).catch((error) => {
    console.log(error)
    if (error.response.data.message == 'Unauthorized') {
      mismatchError.value = 'メールアドレスまたはパスワードに誤りがあります。'
    }
    emailError.value = error.response.data.data.errors['email'];
    passwordError.value = error.response.data.data.errors['password'];
  })
}
</script>

<template>
  <div class="auth-container">
    <v-card color="basil" class="auth-card mx-auto">
      <!-- <v-tabs v-model="tab" bg-color="transparent" color="blue-darken-3" grow>
        <v-tab to="/login">ログイン</v-tab>
        <v-tab to="/register">新規登録</v-tab>
      </v-tabs> -->
      <v-card-title class="ml-2 text-center pt-4 pb-4">ログイン</v-card-title>
      <v-tab-item value="login">
        <v-card class="text-center">
          <v-row justify="center" align-content="center">
          <v-col cols="10">
            <v-text-field label="Eメール" v-model="email" variant="underlined"></v-text-field>
            <ul class="error text-left mt-2" v-for="error in emailError">
              <li>{{ error }}</li>
            </ul>
            <v-text-field class="mt-4" type="password" label="パスワード" v-model="password" variant="underlined"></v-text-field>
            <ul class="error text-left mt-2" v-for="error in passwordError">
              <li>{{ error }}</li>
            </ul>
            <div class="error text-left mt-2">{{ mismatchError }}</div>
            <v-btn block class="text-none mt-4" color="blue-darken-1" size="large" @click="login">
              ログイン
            </v-btn>
            <div class="text-left pb-5 pt-4">
              <v-card-text class="pt-0 pb-0 mb-1 pl-0 font-weight-bold">テストユーザーアカウント</v-card-text>
              <v-card-text class="pt-0 pb-0 mb-1 pl-0">Eメール：testuser01@gmail.com</v-card-text>
              <v-card-text class="pt-0 pb-3 pl-0">パスワード：password</v-card-text>
            </div>
          </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-card>
  </div>
</template>