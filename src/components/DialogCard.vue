<script setup lang="ts">

const emit = defineEmits<{
  (e: "close-modal"): void
  (e: "delete-client"): void
}>()
type Props = { modalName: string|undefined }
const props = defineProps<Props>()

const closeModal = () => {
  emit('close-modal')
}

const deleteClient = () => {
  emit('delete-client')
}
</script>


<template>
  <v-dialog class="text-left" width="500">
    <v-card>
      <v-card-title>削除の確認</v-card-title>
      <v-card-text>本当に{{ props.modalName }}を削除しますか？</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-3" @click="closeModal">キャンセル</v-btn>
        <v-btn color="blue-darken-3" @click="deleteClient">削除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>