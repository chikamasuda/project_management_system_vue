import { defineStore } from 'pinia';
import { Ref, ref } from "vue"

type User = {
  id: number,
  name: string,
  email: string,
  image_url: string | undefined,
  created_at: string,
  updated_at: string
  email_verified_at: string,
};

const user: Ref<User> = ref({
  id: 0,
  name: "",
  email: "",
  image_url: "",
  created_at: "",
  updated_at: "",
  email_verified_at: "",
});

export const useStoreUser = defineStore('user', {

  state: () => ({
    user: {} as User,
  }),
  actions: {
    setUser(data: User) {
      user.value = data
    },
  }
});