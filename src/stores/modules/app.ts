import { defineStore } from 'pinia'

export interface AppStore {
  swithMode: (val: string) => void
}

const useAppStore = defineStore('app', () => {
  const theme = isDark ? 'dark' : 'light'
  const mode = ref<string>(theme)
  const title = ref<string>()

  const swithMode = (val: string) => {
    mode.value = val
  }

  const updateTitle = (val: string) => {
    title.value = val
  }

  return {
    mode,
    swithMode,
    title,
    updateTitle,
  }
}, {
  persist: false,
})

export default useAppStore
