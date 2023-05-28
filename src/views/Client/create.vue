<script setup lang="ts">
import { Ref, ref, onMounted } from "vue"
import axios from '../../plugins/axios.js'
import { AxiosResponse, AxiosError } from 'axios'
import { defineComponent } from 'vue';

const status_list = ['選択してください','待機中','継続中', '終了']

</script>

<template>
  <v-main>
    <v-container class="py-8 px-6 mt-3" fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="pb-3">
            <v-card-title class="d-flex justify-space-between">
                顧客登録
                <v-btn color="blue-darken-2" class="mt-1" to="/clients/">一覧に戻る</v-btn>
            </v-card-title>
            <v-col cols="6" class="ml-1">
              <v-label class="">画像</v-label>
              <v-sheet class="mb-3 mt-3 d-flex align-center">
                <div>
                  <v-avatar color="grey-lighten-1" size="128">
                  </v-avatar>
                </div>
                <div class="ml-3 text-center">
                  <v-btn color="blue-darken-2">写真をアップロード</v-btn>
                  <div class="mt-2"><a class="link-text">写真を削除</a></div>
                </div>
              </v-sheet>
              <v-label class="">名前</v-label>
              <v-text-field class="mt-1 mb-4" density="compact" variant="solo" single-line hide-detail></v-text-field>
              <v-label class="">Email</v-label>
              <v-text-field class="mt-1 mb-4" density="compact" variant="solo" single-line hide-detail></v-text-field>
              <v-label class="">住所</v-label>
              <v-text-field class="mt-1 mb-4" density="compact" variant="solo" single-line hide-detail></v-text-field>
              <v-label class="">ステータス</v-label>
              <v-select class="mt-1 mb-4" density="compact" variant="solo" single-line hide-detail :items="status_list" label="選択してください"></v-select>
              <v-label class="">URL</v-label>
              <v-text-field class="mt-1 mb-4" density="compact" variant="solo" single-line hide-detail></v-text-field>
              <v-label class="">タグ作成</v-label>
              <v-text-field class="mt-1 mb-4" density="compact" variant="solo" single-line hide-detail></v-text-field>
              <v-label class="">メモ</v-label>
              <v-textarea class="mt-1 mb-4" density="compact" variant="solo" single-line hide-detail></v-textarea>
              <v-btn class="mt-3 pl-5 pr-5 mb-3" color="blue-darken-2">　　登録　　</v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>