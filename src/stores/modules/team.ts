import { defineStore } from 'pinia'

const useTeamStore = defineStore('team', () => {
  const activeTab = ref<number>(0)

  const updateActiveTab = (val: number) => {
    activeTab.value = val
  }

  return {
    activeTab,
    updateActiveTab,
  }
}, {
  persist: false,
})

export default useTeamStore
