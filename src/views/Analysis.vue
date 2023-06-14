<script setup lang="ts">
import { Ref, ref, onMounted, reactive } from "vue"
import axios from '../plugins/axios.js'
import { AxiosResponse, AxiosError } from 'axios'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from "dayjs"
dayjs.locale("ja")
import { Chart, ChartData, registerables } from "chart.js"
import { BarChart } from "vue-chart-3"


const month_format = (month: string) => {
  let format_month = dayjs(month).format("YYYY年MM月")
  return month ? format_month : ''
}

let dt = new Date()
let format_start_date = dayjs(dt).subtract(11, 'month').format("YYYY-MM-DD")
let format_end_date = dayjs(dt).format("YYYY-MM-DD")
const start_date = ref<string>(format_start_date)
const end_date = ref<string>(format_end_date)
const type = ref<string>('deposit')
const method = ref<string>('month')
const sales = ref([])
const date = ref([])
const amount = ref([])

Chart.register(...registerables);

const barData: ChartData<"bar"> = {
  labels: date.value,
  datasets: [
    {
      label: "売上額または入金額",
      data: amount.value,
      backgroundColor: "rgb(100,181,246)"
    },
  ],
};

onMounted(async () => {
  //売上初期表示
  await axios.get(`/api/sales/analysis?type=${type.value}&method=${method.value}&start_date=${start_date.value}&end_date=${end_date.value}`)
    .then((res: AxiosResponse) => {
      console.log(res)
      sales.value = res.data.analysis
      date.value.length = 0
      amount.value.length = 0
      sales.value.forEach(function (analysis) {
        date.value.push(month_format(analysis.month))
        amount.value.push(analysis.total_amount)
      })
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
          <v-card class="analysis-card mb-5">
            <v-card-title>
              売上分析
            </v-card-title>
              <div class="ml-5 bg-blue-grey-lighten-5 mr-5 pb-5 pt-3 search-container">
                <div class="d-flex search-item pl-4">
                  <v-label for="" class="mt-2 mr-3 font-weight-bold">種別</v-label>
                  <v-radio-group inline dense class="ml-5 mt-1 pl-5" v-model="type">
                    <v-radio label="売上" value="sales"></v-radio>
                    <v-radio label="入金" value="deposit"></v-radio>
                  </v-radio-group>
                </div>
                <div class="d-flex search-item pl-4">
                  <v-label class="mt-2 font-weight-bold">分析方法</v-label>
                  <v-radio-group inline class="mt-1 ml-5" v-model="method">
                    <v-radio label="年別" value="year"></v-radio>
                    <v-radio label="月別" value="month"></v-radio>
                  </v-radio-group>
                </div>
                <div class="d-flex mt-3 pl-4">
                  <v-label class="search-label font-weight-bold">年月</v-label>
                  <Datepicker datePicker class="datepicker ml-5" locale="ja" v-model="start_date" select-text="選択" cancel-text="キャンセル" format="yyyy/MM/dd" />
                  <span class="mt-1 pr-2 pl-2">〜</span>
                  <Datepicker datePicker class="datepicker" locale="ja" v-model="end_date" select-text="選択" cancel-text="キャンセル" format="yyyy/MM/dd" />
                </div>
                <div class="pl-4">
                  <v-btn color="blue-darken-2" class="mt-4 pl-5 pr-5">分析する</v-btn>
                </div>
              </div>
              <BarChart :chartData="barData" class="ml-5 mr-5 mt-5" />
              <v-table class="mt-5 ml-5 mr-5">
                <thead class="bg-blue-grey-lighten-5">
                  <tr>
                    <th class="text-left">年月</th>
                    <th class="text-left">金額</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sale in sales">
                    <td>{{ month_format(sale.month) }}</td>
                    <td>{{ sale.total_amount  }}</td>
                  </tr>
                </tbody>
              </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>