<script setup lang="ts">
const route = useRoute()

function onBack() {
  if (window.history.state.back) {
    history.back()
  }
  else {
    window.zx?.closeWindow()
  }
}

const title = computed(() => {
  return route.meta?.title || ''
})
</script>

<template>
  <VanNavBar v-show="title" :fixed="true" clickable left-arrow @click-left="onBack">
    <template #title>
      <div class="font-size-16">{{ title }}</div>
    </template>
  </VanNavBar>
</template>
