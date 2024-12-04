import { defineStore } from 'pinia'

const useHomeStore = defineStore('home', () => {
  const startDate = ref<any>()
  const endDate = ref<any>()
  const activeTab = ref<number>(1)

  const updateDate = (start, end) => {
    startDate.value = start
    endDate.value = end
  }

  const updateActiveTab = (val: number) => {
    activeTab.value = val
  }

  return {
    startDate,
    endDate,
    updateDate,
    activeTab,
    updateActiveTab
  }
}, {
  persist: false,
})

export default useHomeStore
