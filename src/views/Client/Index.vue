<script setup lang="ts">
import { Ref, ref, onMounted } from "vue"
import axios from '../../plugins/axios.js'
import { AxiosResponse, AxiosError } from 'axios'
import DialogCard from '../../components/DialogCard.vue'
import CreateAlert from '../../components/CreateAlert.vue'
import EditAlert from '../../components/EditAlert.vue'
import DeleteAlert from '../../components/DeleteAlert.vue'
import saveAs from "file-saver"
import dayjs from "dayjs"
dayjs.locale("ja");

const status = ref(['', '待機中', '継続中', '終了'])
const deleteAlert = ref<boolean>(false)
const dialog = ref<boolean>(false)
const modalId = ref<number>()
const modalName = ref<string|undefined>()
const keyword = ref<string|undefined>()
const isLoading = ref<boolean>(true)

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
      isLoading.value = false
      console.log(res)
    }).catch((error: AxiosError) => {
      console.log(error)
    })
})

const deleteClient = async () => {
  await axios.delete('/api/clients/' + modalId.value)
    .then((res: AxiosResponse) => {
      const findIdx =  clients.value.findIndex((e) => e.id === modalId.value)
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

const search = async (keyword: string|undefined) => {
  await axios.get('/api/clients/search?keyword=' + keyword)
    .then((res: AxiosResponse) => {
      console.log(res)
      clients.value = res.data.clients

    }).catch((error: AxiosError) => {
      console.log(error)
    })
}

const tagSearch = async (tagName: string) => {
  keyword.value = tagName
  await axios.get('/api/clients/search?keyword=' + tagName)
    .then((res: AxiosResponse) => {
      console.log(res)
      clients.value = res.data.clients

    }).catch((error: AxiosError) => {
      console.log(error)
    })
}

const csvDownload = async () => {
  await axios.get("/api/clients/download", {
    responseType: "blob",
  })
    .then((res: AxiosResponse) => {
      console.log(res)
      let mineType = res.headers["content-type"];
      const now = new Date(); // 現在の日時を元にDateオブジェクトのインスタンス作成
      let format_date = dayjs(now).format("YYYYMMDDHHmmss")
      const name = `顧客情報_${format_date}`
      const blob = new Blob([res.data], { type: mineType });
      saveAs(blob, name);
    })
    .catch((error: AxiosError) => {
      console.log(error.message);
    });
}

const openModal = (id: number, name: string) => {
  dialog.value = true
  modalId.value = id
  modalName.value = name
}

const closeModal = () => {
  dialog.value = false
}
</script>

<template>
  <v-main>
    <v-container class="py-8 px-6 mt-3" fluid>
      <v-row>
        <v-col cols="12">
          <DialogCard v-model="dialog" :modalName="modalName" @close-modal="closeModal" @delete-client="deleteClient" />
          <CreateAlert />
          <EditAlert />
          <DeleteAlert v-show="deleteAlert" />
          <v-card>
            <v-card-title>
              顧客一覧
            </v-card-title>
            <v-col cols="3" class="d-flex">
              <v-text-field v-model="keyword" class="ml-1" density="compact" variant="solo" label="キーワード検索" single-line hide-detail @click:append-inner="search(keyword)" append-inner-icon="mdi-magnify">
              </v-text-field>
            </v-col>
            <div class="d-flex ml-4 mb-5 mt-2">
              <v-btn color="blue-darken-2" class="mr-3" @click="csvDownload">CSVダウンロード</v-btn>
              <v-btn color="blue-darken-2" class="" to="/clients/create">顧客情報登録</v-btn>
            </div>
            <div class="pb-5 mb-5" v-show="isLoading">
              <div class="loader">Loading.....</div>
            </div>
            <v-table class="mt-3" v-show="!isLoading">
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
                  <td v-if="client.image_url">
                    <img :src="`${client.image_url}`" class="table-avator mt-2" />
                  </td>
                  <td v-if="!client.image_url">
                    <img src="../../assets/icon/no_image.svg" class="table-avator mt-2" />
                  </td>
                  <td>{{ client.name }}</td>
                  <td>{{ client.email }}</td>
                  <td>{{ status[client.status] }}</td>
                  <td class="d-flex align-center">
                    <div v-for="tag in clients[index].tags" :key="tag.id">
                      <v-btn @click="tagSearch(tag.name)" size="small" color="blue-darken-2" variant="outlined" class="mr-1">{{ tag.name }}</v-btn>
                    </div>
                  </td>
                  <td>
                    <router-link :to="`clients/edit/${client.id}`">
                      <v-icon color="blue-darken-2" class="mr-2">mdi-note-edit-outline</v-icon>
                    </router-link>
                    <v-icon @click.stop="openModal(client.id, client.name)">mdi-trash-can-outline</v-icon>
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