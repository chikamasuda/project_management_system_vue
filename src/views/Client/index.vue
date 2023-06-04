<script setup lang="ts">
import { Ref, ref, onMounted } from "vue"
import axios from '../../plugins/axios.js'
import { AxiosResponse, AxiosError } from 'axios'
const status = ref(['', '待機中', '継続中', '終了'])
import { useRoute } from 'vue-router'
import DialogCard from '../../components/DialogCard.vue'

const route = useRoute()
const createAlert = ref<boolean>(false)
const editAlert = ref<boolean>(false)
const deleteAlert = ref<boolean>(false)
const dialog = ref<boolean>(false)

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

    if (route.query.type == 'create') {
      createAlert.value = true
      setTimeout(() => {
        createAlert.value = false;
      }, 2000);
    }
    if (route.query.type == 'edit') {
      editAlert.value = true
      setTimeout(() => {
        editAlert.value = false;
      }, 2000);
    }
})

const deleteClient = async (id: number) => {
  await axios.delete('/api/clients/' +id)
    .then((res: AxiosResponse) => {
      const findIdx =  clients.value.findIndex((e) => e.id === id)
      clients.value.splice(findIdx, 1);
      dialog.value = false
      deleteAlert.value = true
      setTimeout(() => {
        deleteAlert.value = false;
      }, 2000);

    }).catch((error: AxiosError) => {
      console.log(error)
    })
}
</script>

<template>
  <v-main>
    <v-container class="py-8 px-6 mt-3" fluid>
      <v-row>
        <v-col cols="12">
          <transition>
            <v-alert class="mb-5" v-show="createAlert" type="info" title="登録が完了しました。">
            </v-alert>
          </transition>
          <transition>
            <v-alert class="mb-5" v-show="editAlert" type="warning" title="編集が完了しました。">
            </v-alert>
          </transition>
          <transition>
            <v-alert class="mb-5" v-show="deleteAlert" type="error" title="削除が完了しました。">
            </v-alert>
          </transition>
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
                  <th class="text-left"></th>
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
                      <v-btn size="small" color="blue-darken-2" variant="outlined" class="mr-1">{{ tag.name }}</v-btn>
                    </div>
                  </td>
                  <td>
                    <router-link :to="`clients/edit/${client.id}`">
                      <v-icon color="blue-darken-2" class="mr-2">mdi-note-edit-outline</v-icon>
                    </router-link>
                    <v-icon @click.stop="dialog = true">mdi-trash-can-outline</v-icon>
                  </td>
                  <v-dialog class="text-left" v-model="dialog" width="500">
                    <v-card>
                      <v-card-title>削除の確認</v-card-title>
                      <v-card-text>本当に{{ client.name }}を削除しますか？</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-3" @click="dialog = false">キャンセル</v-btn>
                        <v-btn color="blue-darken-3" @click="deleteClient(client.id)">削除</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>