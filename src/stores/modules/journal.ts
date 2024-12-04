import { defineStore } from 'pinia'

const useJournalStore = defineStore('journal', () => {
  const canSubmit = ref<boolean>(false)
  const isEdit = ref<boolean>(false)

  const changeCanSubmit = (val: boolean) => {
    canSubmit.value = val
  }

  const updateIsEdit = (val: boolean) => {
    isEdit.value = val
  }

  return {
    canSubmit,
    changeCanSubmit,
    isEdit,
    updateIsEdit,
  }
}, {
  persist: false,
})

export default useJournalStore
