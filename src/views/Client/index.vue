<script setup lang="ts">
import { Ref, ref, onMounted } from "vue"
import axios from '../../plugins/axios.js'
import { AxiosResponse, AxiosError } from 'axios'
const status = ref(['', '待機中', '継続中', '終了'])

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

onMounted(async () => {
  // ユーザー取得
  await axios.get('/api/clients')
    .then((res: AxiosResponse) => {
      clients.value = res.data.clients
      console.log(res)
    }).catch((error: AxiosError) => {
      console.log(error)
    })
})
</script>

<template>
  <v-main>
    <v-container class="py-8 px-6 mt-3" fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              顧客一覧
            </v-card-title>
            <v-col cols="3" class="d-flex">
              <v-text-field class="ml-1" density="compact" variant="solo" label="キーワード検索" single-line hide-detail @click:append-inner="" append-inner-icon="mdi-magnify">
              </v-text-field>
            </v-col>
            <div class="d-flex ml-4 mb-5 mt-2">
              <v-btn color="blue-darken-2" class="mr-3">CSVダウンロード</v-btn>
              <v-btn color="blue-darken-2" class="" to="/clients/create">顧客情報登録</v-btn>
            </div>
            <v-table class="mt-3">
              <thead>
                <tr>
                  <th class="text-left"></th>
                  <th class="text-left">顧客名</th>
                  <th class="text-left">Eメール</th>
                  <th class="text-left">ステータス</th>
                  <th class="text-left tag-area">タグ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(client,index) in clients" :key="index">
                  <td>
                    <img :src="`${client.image_url}`" class="table-avator mt-2" />
                  </td>
                  <td>{{ client.name }}</td>
                  <td>{{ client.email }}</td>
                  <td>{{ status[client.status] }}</td>
                  <td class="d-flex align-center">
                    <div v-for="tag in clients[index].tags" :key="tag.id">
                      <span class="mr-1 tag bg-blue-darken-2 pl-2 pr-2 pt-1 pb-1">{{ tag.name }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>