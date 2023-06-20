import { defineStore } from 'pinia';

export const useStoreUser = defineStore('user', {
  state: () => ({
    user: {},
  }),
  actions: {
    setUser(data: object) {
      this.user = data
    },
  }
});