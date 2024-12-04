<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAppStore from '@/stores/modules/app'
// import useRouteCache from '@/stores/modules/routeCache'
import useRouteTransitionNameStore from '@/stores/modules/routeTransitionName'
import AutoThemeSwitcher from '@/composables/AutoThemeSwitcher'

useHead({
  title: '游戏礼包兑换系统',
  meta: [
    {
      name: '游戏礼包兑换系统',
      content: '游戏礼包兑换系统',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

const appStore = useAppStore()
const { mode } = storeToRefs(appStore)

const routeTransitionNameStore = useRouteTransitionNameStore()
const { routeTransitionName } = storeToRefs(routeTransitionNameStore)
const { initializeThemeSwitcher } = AutoThemeSwitcher(appStore)

// const keepAliveRouteNames = computed(() => {
//   return useRouteCache().routeCaches as string[]
// })

onMounted(() => {
  initializeThemeSwitcher()
})

const route = useRoute()
const AsyncNavBar = shallowRef('undefined')
let modules = import.meta.glob('@/views/**/NavBar.vue')
watch(route, () => {
  const loader = modules[`/src/views/${route.name}/NavBar.vue`]
  if (loader) {
    loader().then(data => {
      AsyncNavBar.value = data.default
    })
  }
})
</script>

<template>
  <VanConfigProvider :theme="mode">
    <router-view v-slot="{ Component, route }">
      <AsyncNavBar v-if="route.meta.localNav" />
      <NavBar v-else />

      <transition :name="routeTransitionName">
        <keep-alive>
          <component v-if="route.meta.keepAlive" :is="Component" />
        </keep-alive>
      </transition>
      <transition :name="routeTransitionName">
        <component v-if="!route.meta.keepAlive" :is="Component" />
      </transition>
    </router-view>

    <TabBar />
  </VanConfigProvider>
</template>
