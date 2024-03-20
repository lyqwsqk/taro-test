import { defineStore } from 'pinia'

export const commonStore = defineStore('common', {
  state: () => {
    return {
      count:0
    }
  },
  actions: {
    setCount() {
      this.count = this.count + 1
    }
  }
})