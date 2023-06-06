<script setup lang="ts">
import { onMounted, ref, Ref } from "vue"
import axios from '../../plugins/axios.js'
import { AxiosResponse, AxiosError } from 'axios'
import Vue3TagsInput from 'vue3-tags-input';
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { isGloballyWhitelisted } from "@vue/shared";

const status_list = ['選択してください', '待機中', '継続中', '終了']
type Clients = {
  id: number,
  name: string,
  image_url: string | undefined,
  email: string,
  status: number,
  tags: {
    id: number,
    name: string,
  }[]
}[]

const clients: Ref<Clients> = ref([{
  id: 0,
  status: 0,
  name: '',
  image_url: '',
  email: '',
  tags: [{
    id: 0,
    name: '',
  }]
}])
const previewUrl = ref() // プレビュー用URL
const uploadRef = ref([])  // input['file']用ref
const imageFile = ref<string | Blob | undefined>()  // ファイル情報
const name = ref<string>()
const email = ref<string>()
const address = ref<string>()
const status = ref<string>()
const site_url = ref<string>()
const memo = ref<string>()
const router = useRouter()
const route = useRoute()
const tags = ref([])
const validationError = ref([])

onMounted(async () => {
  // ユーザー取得
  await axios.get('/api/clients/' + route.params.client_id)
    .then((res: AxiosResponse) => {
      console.log(res)
      name.value = res.data.client.name
      email.value = res.data.client.email
      address.value = res.data.client.address
      status.value = status_list[res.data.client.status]
      site_url.value = res.data.client.site_url
      previewUrl.value = res.data.client.image_url
      const tag_array = res.data.client.tags
      tag_array.forEach(function (tag: object) {
        tags.value.push(tag.name)
      });
      memo.value = res.data.client.memo
    }).catch((error: AxiosError) => {
      console.log(error)
    })
})

//プレビュー表示
const setPreviewUrl = () => {
  const file = uploadRef.value.files[0]
  imageFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  uploadRef.value = []
}

// 画像削除処理
const deleteUserImage = () => {
  previewUrl.value = ''
  imageFile.value = ''
}

//変更されたタグ情報を取得
const handleChangeTag = (newTags: Array<string>) => {
  tags.value = newTags
}

//顧客情報編集
const editClient = async () => {
  console.log(name.value)
  const file = imageFile.value ? imageFile.value : null
  const formData = new FormData()
  if (tags.value) {
    Object.keys(tags.value).forEach(key => {
      formData.append('tags[]', tags.value[key])
    })
  }
  const status_index = status_list.indexOf(status.value)
  if (name.value) formData.append('name', name.value)
  if (email.value) formData.append('email', email.value)
  if (status_index != -1 && status_index != 0) formData.append('status', status_index)
  if (site_url.value) formData.append('site_url', site_url.value)
  if (imageFile.value) formData.append('image', imageFile.value)
  if (!imageFile.value && previewUrl.value) formData.append('image_url', previewUrl.value)
  if (memo.value) formData.append('memo', memo.value)
  const config = {
    header: {
      "Content-Type": "multipart/form-data",
      'X-HTTP-Method-Override': 'PUT'
    },
  }

  await axios.post('/api/clients/' + route.params.client_id, formData, config)
    .then((res: AxiosResponse) => {
      console.log(res)
      router.push('/clients?type=edit')

    }).catch((error: AxiosError) => {
      console.log(error)
      if(error) {
        validationError.value = error.response.data.data.errors
      }
    })
}
</script>

<template>
  <v-main>
    <v-container class="py-8 px-6 mt-3" fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="pb-3">
            <v-card-title class="d-flex justify-space-between">
              顧客編集
              <v-btn size="small" color="blue-darken-2" class="mt-1" to="/clients">一覧に戻る</v-btn>
            </v-card-title>
            <v-col cols="6" class="ml-1">
              <div class="mb-3" v-if="validationError">
                <ul v-for="errors in validationError">
                  <li>
                    <ul v-for="error in errors">
                      <li class="error">・{{ error }}</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <v-label class="">画像</v-label>
              <v-sheet class="mb-3 mt-3 d-flex align-center">
                <div>
                  <v-avatar size="128">
                    <img v-if="previewUrl" :src="previewUrl" alt="プレビュー">
                    <img v-else src="../../assets/icon/no_image.svg" alt="プロフィール画像">
                  </v-avatar>
                </div>
                <div class="ml-3 text-center">
                  <label class="file-label" color="blue-darken-2">
                    <input type="file" ref="uploadRef" @change="setPreviewUrl">
                    画像をアップロード
                  </label>
                  <div class="mt-2"><a class="link-text" @click="deleteUserImage">写真を削除</a></div>
                </div>
              </v-sheet>
              <div class="mb-4">
                <v-label class="mb-1">名前</v-label>
                <v-text-field v-model="name" density="compact" variant="solo" single-line hide-detail></v-text-field>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">Email</v-label>
                <v-text-field v-model="email" density="compact" variant="solo" single-line hide-detail></v-text-field>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">住所</v-label>
                <v-text-field v-model="address" density="compact" variant="solo" single-line hide-detail></v-text-field>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">ステータス</v-label>
                <v-select v-model="status" density="compact" variant="solo" single-line hide-detail :items="status_list"
                  label="選択してください"></v-select>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">URL</v-label>
                <v-text-field v-model="site_url" density="compact" variant="solo" single-line hide-detail></v-text-field>
              </div>
              <div class="mb-4">
                <v-label class="mb-1">タグ作成</v-label>
                <vue3-tags-input :tags="tags" @on-tags-changed="handleChangeTag" class="pl-2 pt-1 pb-1" />
              </div>
              <div class="mb-4">
                <v-label class="mb-1">メモ</v-label>
                <v-textarea v-model="memo" density="compact" variant="solo" single-line hide-detail></v-textarea>
              </div>
              <v-btn class="mt-3 pl-5 pr-5 mb-3" color="blue-darken-2" @click="editClient()">　　編集　　</v-btn>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>