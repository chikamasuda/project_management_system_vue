<script setup lang="ts">
import { Ref, ref, onMounted } from "vue";
import axios from "../plugins/axios.js";
import { AxiosResponse, AxiosError } from "axios";
import Loading from "../components/Loading.vue"
import dayjs from "dayjs";
import { useStoreUser } from "../stores/user";
dayjs.locale("ja");

const storeUser = useStoreUser();
const status = ref(["", "待機中", "継続中", "終了"]);
const todo = ref([]);
const isLoading = ref<boolean>(true)

type Projects = {
  id: number;
  project_name: string;
  client_name: string;
  end_date: string;
  status: number;
  project_image_url: string | undefined;
}[];

const projects: Ref<Projects> = ref([
  {
    id: 0,
    status: 0,
    project_name: "",
    client_name: "",
    end_date: "",
    project_image_url: "",
  },
]);

type TodoLists = {
  id: number;
  title: string;
  deadline_date: string;
  status: boolean;
}[];

const todo_lists: Ref<TodoLists> = ref([
  {
    id: 0,
    title: "",
    status: false,
    deadline_date: "",
  },
]);

type User = {
  id: number;
  name: string;
  email: string;
  image_url: string | undefined;
};

const user: Ref<User> = ref({
  id: 0,
  name: "",
  email: "",
  image_url: "",
});

onMounted(async () => {
  // ユーザー取得
  await axios
    .get("/api/users")
    .then((res: AxiosResponse) => {
      storeUser.user = res.data.user
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
  // ホーム情報取得
  await axios
    .get("/api/home/index")
    .then((res: AxiosResponse) => {
      projects.value = res.data.projects;
      todo_lists.value = res.data.todo_lists
      isLoading.value = false
      console.log(res);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
});

const isChecked = async (
  index: number,
  checkbox_status: boolean,
  title: string,
  date: string
) => {
  const done = 1;
  const undone = 0;
  let status = checkbox_status ? done : undone;
  const todo_id = index + 1;
  await axios
    .put("/api/todo-lists/" + todo_id, {
      title: title,
      status: status,
      deadline_date: date,
    })
    .then((res: AxiosResponse) => {
      console.log(res);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

const format = (date: string) => {
  let format_date = dayjs(date).format("YYYY/MM/DD");
  return date ? format_date : "";
};
</script>

<template>
  <v-main>
    <Loading v-show="isLoading" />
    <v-container class="py-8 px-6 mt-3" fluid v-show="!isLoading">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              プロジェクト
              <v-btn color="blue-darken-2" class="mt-1" to="/projects"
                >案件管理へ</v-btn
              >
            </v-card-title>
            <v-table v-show="!isLoading">
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
                <tr v-for="project in projects" :key="project.id">
                  <td>
                    <img
                      :src="`${project.project_image_url}`"
                      class="table-avator mt-2"
                    />
                  </td>
                  <td>{{ project.project_name }}</td>
                  <td>{{ project.client_name }}</td>
                  <td>{{ status[project.status] }}</td>
                  <td>{{ format(project.end_date) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="mt-3">
            <v-card-title class="d-flex justify-space-between">
              TODO
              <v-btn color="blue-darken-2" class="mt-1" to="/todo-lists"
                >TODO管理へ</v-btn
              >
            </v-card-title>
            <v-table v-show="!isLoading">
              <thead class="">
                <tr>
                  <th class="text-left">TODO</th>
                  <th class="text-left">期限日</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(todo_list, index) in todo_lists"
                  :key="todo_list.id"
                >
                  <td :class="{ done: todo_lists[index].status }">
                    <v-checkbox
                      hide-details
                      :label="`${todo_list.title}`"
                      v-model="todo_lists[index].status"
                      @change="
                        isChecked(
                          index,
                          todo_lists[index].status,
                          todo_list.title,
                          todo_list.deadline_date
                        )
                      "
                    ></v-checkbox>
                  </td>
                  <td :class="{ done: todo_lists[index].status }">
                    {{ format(todo_list.deadline_date) }}
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
