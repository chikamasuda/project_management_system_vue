<script setup lang="ts">
import { Ref, ref, onMounted } from "vue"
import axios from '../plugins/axios.js'
import { AxiosResponse, AxiosError } from 'axios'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// 基本的な、日付の減算
let dt = new Date()
//1年前
let start_year = dt.getFullYear() - 1
const start_date = ref<string>(`${start_year}-m`)
const end_date = ref<string>('yyyy-m')
const type = ref<string>('deposit')
const analysis = ref<string>('month')

onMounted(async () => {

})

</script>

<template>
  <v-main>
    <v-container class="py-8 px-6 mt-3" fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="analysis-card">
            <v-card-title>
              売上分析
            </v-card-title>
              <div class="ml-5 bg-blue-grey-lighten-5 mr-5 pb-5 pt-3 search-container">
                <div class="d-flex search-item pl-4">
                  <v-label for="" class="mt-2 mr-3">種別</v-label>
                  <v-radio-group inline dense class="ml-5" v-model="type">
                    <v-radio label="売上" value="sales"></v-radio>
                    <v-radio label="入金" value="deposit"></v-radio>
                  </v-radio-group>
                </div>
                <div class="d-flex search-item pl-4">
                  <v-label class="mt-2">分析方法</v-label>
                  <v-radio-group inline class="m-0" v-model="analysis">
                    <v-radio label="年別" value="year"></v-radio>
                    <v-radio label="月別" value="month"></v-radio>
                  </v-radio-group>
                </div>
                <div class="d-flex mt-3 pl-4">
                  <label class="mt-2 search-label">年月</label>
                  <Datepicker monthPicker class="datepicker" locale="jp" v-model="start_date" select-text="選択" cancel-text="キャンセル" :format="`${start_year}年MM月`" />
                  <span class="mt-1 pr-2 pl-2">〜</span>
                  <Datepicker monthPicker class="datepicker" locale="jp" v-model="end_date" select-text="選択" cancel-text="キャンセル" format="yyyy年MM月" />
                </div>
                <div class="pl-4">
                  <v-btn color="blue-darken-2" class="mt-4 pl-4 pr-5">分析する</v-btn>
                </div>
              </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>