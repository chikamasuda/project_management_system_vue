<script setup lang="ts">
import { Ref, ref, onMounted } from "vue"
import axios from '../../plugins/axios.js'
import { AxiosResponse, AxiosError } from 'axios'
import Loading from "../../components/Loading.vue"
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

type Projects = {
  id: number;
  name: string;
  client_name: string;
  end_date: string;
  status: number;
  image_url: string | undefined;
  tags: {
    id: number,
    name: string,
  }[]
}[];

const projects: Ref<Projects> = ref([
{
  id: 0,
  status: 0,
  name: "",
  client_name: "",
  end_date: "",
  image_url: "",
  tags: [{
    id: 0,
    name: '',
  }]
}]);

onMounted(async () => {
  // ユーザー取得
  await axios.get('/api/projects')
    .then((res: AxiosResponse) => {
      console.log(res)
      projects.value = res.data.projects
      isLoading.value = false
    }).catch((error: AxiosError) => {
      console.log(error)
    })
})
</script>

<template>
  <v-main>
    <Loading v-show="isLoading" />
    <v-container class="py-8 px-6 mt-3" fluid  v-show="!isLoading">
      <v-row>
        <v-col cols="12">
          <DialogCard v-model="dialog" :modalName="modalName" @close-modal="" @delete-client="" />
          <CreateAlert />
          <EditAlert />
          <DeleteAlert v-show="deleteAlert" />
          <v-card>
            <v-card-title>
              案件一覧
            </v-card-title>
            <v-text-field v-model="keyword" class="ml-4 mt-2 mb-2 keyword-search" density="compact" variant="solo" label="キーワード検索" single-line hide-detail @click:append-inner="" append-inner-icon="mdi-magnify" />
            <div class="d-flex ml-4 mb-5 mt-5">
              <v-btn color="blue-darken-2" class="mr-3" @click="">CSVダウンロード</v-btn>
              <v-btn color="blue-darken-2" class="" to="/clients/create">案件情報登録</v-btn>
            </div>
            <v-table class="mt-3" v-show="!isLoading">
              <thead>
                <tr>
                  <th class="text-left"></th>
                  <th class="text-left">案件名</th>
                  <th class="text-left">顧客名</th>
                  <th class="text-left">ステータス</th>
                  <th class="text-left tag-area">タグ</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(project,index) in projects" :key="index">
                  <td v-if="project.image_url">
                    <img :src="`${project.image_url}`" class="table-avator mt-2" />
                  </td>
                  <td v-if="!project.image_url">
                    <img src="../../assets/icon/no_image.svg" class="table-avator mt-2" />
                  </td>
                  <td>{{ project.name }}</td>
                  <td>{{ project.client_name }}</td>
                  <td>{{ status[project.status] }}</td>
                  <td class="d-flex align-center">
                    <div v-for="tag in projects[index].tags" :key="tag.id">
                      <v-btn @click="" size="small" color="blue-darken-2" variant="outlined" class="mr-1">{{ tag.name }}</v-btn>
                    </div>
                  </td>
                  <td>
                    <router-link :to="`clients/edit/${project.id}`">
                      <v-icon color="blue-darken-2" class="mr-2">mdi-note-edit-outline</v-icon>
                    </router-link>
                    <v-icon @click.stop="">mdi-trash-can-outline</v-icon>
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