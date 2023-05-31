<script setup lang="ts">
import { ref } from "vue"
import axios from '../../plugins/axios.js'
import { AxiosResponse, AxiosError } from 'axios'
import Vue3TagsInput from 'vue3-tags-input';

const status_list = ref(['選択してください','待機中','継続中', '終了'])
const tags = ref(['PHP', 'Vue'])
const previewUrl = ref() // プレビュー用URL
const uploadRef = ref()  // input['file']用ref
const imageFile = ref()  // ファイル情報

//プレビュー表示
const setPreviewUrl = () => {
  const file = uploadRef.value.files[0]
  imageFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  uploadRef.value.value = ''
}

// 画像削除処理
const deleteUserImage = () => {
  previewUrl.value = ''
  imageFile.value = null
}
</script>

<template>
  <v-main>
    <v-container class="py-8 px-6 mt-3" fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="pb-3">
            <v-card-title class="d-flex justify-space-between">
                顧客登録
                <v-btn size="small" color="blue-darken-2" class="mt-1" to="/clients">一覧に戻る</v-btn>
            </v-card-title>
            <v-col cols="6" class="ml-1">
              <v-label class="">画像</v-label>
              <v-sheet class="mb-3 mt-3 d-flex align-center">
                <div>
                  <v-avatar size="128" placeholder="No Image">
                    <img v-if="previewUrl" :src="previewUrl" alt="プレビュー">
                    <img v-else src="../../assets/icon/no_image.svg" alt="プロフィール画像">
                  </v-avatar>
                </div>
                <div class="ml-3 text-center">
                <label class="file-label" color="blue-darken-2">
                  <input type="file" name="avatar" ref="uploadRef"
                  @change="setPreviewUrl">
                  画像をアップロード
                </label>
                  <div class="mt-2"><a class="link-text" @click="deleteUserImage">写真を削除</a></div>
                </div>
              </v-sheet>
              <div class="mb-4">
                <v-label class="mb-1">名前</v-label>
                <v-text-field density="compact" variant="solo" single-line hide-detail></v-text-field>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">Email</v-label>
                <v-text-field density="compact" variant="solo" single-line hide-detail></v-text-field>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">住所</v-label>
                <v-text-field density="compact" variant="solo" single-line hide-detail></v-text-field>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">ステータス</v-label>
                <v-select density="compact" variant="solo" single-line hide-detail :items="status_list" label="選択してください"></v-select>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">URL</v-label>
                <v-text-field density="compact" variant="solo" single-line hide-detail></v-text-field>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">タグ作成</v-label>
                <vue3-tags-input :tags="tags" class="pt-1 pb-1 pl-2" />
              </div>
              <div class="mb-4">
                <v-label class="mb-1">メモ</v-label>
                <v-textarea density="compact" variant="solo" single-line hide-detail></v-textarea>
              </div>
              <v-btn class="mt-3 pl-5 pr-5 mb-3" color="blue-darken-2">　　登録　　</v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>