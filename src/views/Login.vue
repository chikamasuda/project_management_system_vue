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
            <v-text-field round label="Eメール" class="mt-5 pb-0 pt-5" variant="solo" v-model="email"></v-text-field>
            <ul class="error text-left pb-5" v-for="error in emailError">
              <li>{{ error }}</li>
            </ul>
            <v-text-field type="password" round label="パスワード" variant="solo" v-model="password"></v-text-field>
            <ul class="error text-left pb-5" v-for="error in passwordError">
              <li>{{ error }}</li>
            </ul>
          </v-col>
          </v-row>
          <v-btn class="text-none mb-5" color="blue-darken-1" size="large" @click="login">
            ログイン
          </v-btn>
        </v-card>
      </v-tab-item>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue"
import axios from '../plugins/axios.js'
import { useRouter } from 'vue-router'
import Axios from 'axios';

const tab = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')


const mismatchError = ref<string>('')
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
    router.push('/')
  }).catch((error) => {
    console.log(error)
    if (error.response.status == "401") {
      mismatchError.value = 'メールアドレスまたはパスワードに誤りがあります。'
    }
    emailError.value = error.response.data.data.errors['email'];
    passwordError.value = error.response.data.data.errors['password'];
  })
}

</script>