// these APIs are auto-imported from @vueuse/core
const theme = settings.theme
if (theme) {
  document.documentElement.classList.add(theme)
}
export const isDark = !['light', 'dark'].includes(theme) ? useDark() : ref(theme === 'dark')
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()
