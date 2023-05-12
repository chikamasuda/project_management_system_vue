<script setup lang="ts">
import { Ref, ref, onMounted } from "vue"
import Header from '../components/header.vue'
import axios from '../plugins/axios.js'
import Axios, { AxiosResponse, AxiosError } from 'axios'

const status = ref(['', '待機中', '継続中', '終了'])
const isDone = ref<boolean>(false)
const todo = ref([])

type Projects = {
  id: number,
  project_name: string,
  client_name: string,
  end_date: string,
  status: number,
  project_image_url: string | undefined
}

const projects: Ref<Projects> = ref({
  id: 0,
  status: 0,
  project_name: '',
  client_name: '',
  end_date:'',
  project_image_url: ''
})

type TodoLists = {
  id: number,
  title: string,
  deadline_date: string,
}

const todo_lists: Ref<TodoLists> = ref({
  id: 0,
  title: '',
  deadline_date: '',
})

onMounted(async () => {
  // ユーザー取得
  await axios.get('/api/home/index')
    .then((res: AxiosResponse) => {
      projects.value = res.data.projects
      todo_lists.value = res.data.todo_lists
      console.log(res)
    }).catch((error: AxiosError) => {
      console.log(error)
    })
})

const isChecked = async (index, todo, title, date) => {
  todo = todo ? 0 : 1
  const todo_id = index + 1
  await axios.put('/api/todo-lists/' + todo_id, {
    title: title,
    status: todo,
    deadline_date: date
  }).then((res: AxiosResponse) => {
    console.log(res)
  }).catch((error: AxiosError) => {
    console.log(error)
  })
}
</script>

<template>
  <Header />
  <v-main>
      <v-container class="py-8 px-6 mt-3" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="d-flex justify-space-between">
                プロジェクト
                <v-btn color="blue-darken-2" class="mt-1" to="/projects">案件管理へ</v-btn>
              </v-card-title>
              <v-table>
                <thead class="">
                  <tr>
                    <th class="text-left"></th>
                    <th class="text-left">名前</th>
                    <th class="text-left">顧客名</th>
                    <th class="text-left">ステータス</th>
                    <th class="text-left">終了日</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="project in projects" :key="project">
                    <td>
                      <img :src="`${project.project_image_url}`" class="table-avator mt-2"/>
                    </td>
                    <td>{{ project.project_name }}</td>
                    <td>{{ project.client_name }}</td>
                    <td>{{ status[project.status] }}</td>
                    <td>{{ project.end_date }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="mt-3">
              <v-card-title class="d-flex justify-space-between">
                TODO
                <v-btn color="blue-darken-2" class="mt-1" to="/todo-lists">TODO管理へ</v-btn>
              </v-card-title>
              <v-table>
                <thead class="">
                  <tr>
                    <th class="text-left">TODO</th>
                    <th class="text-left">期限日</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(todo_list, index) in todo_lists" :key="todo_list">
                    <td :class="{ done: todo[index] }">
                      <v-checkbox hide-details :label="`${todo_list.title}`" v-model="todo[index]" @click="isChecked(index, todo[index], todo_list.title, todo_list.deadline_date )"></v-checkbox></td>
                    <td :class="{ done: todo[index] }">{{ todo_list.deadline_date }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>