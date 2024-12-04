<script setup lang="ts">
defineProps({
  paddingX: {
    type: Number,
    default: 16,
  },
})
</script>

<template>
  <main
    class="page absolute h-full w-full overflow-y-auto"
  >
    <slot />
  </main>
</template>
