<script setup lang="ts">
import { showConfirmDialog, showToast } from 'vant'

function onBack() {
  if (window.history.state.back) {
    history.back()
  }
}

const route = useRoute()
const navTitle = computed(() => {
  return route.meta.title || ''
})

const onClick = () => {
  showConfirmDialog({
    message:
      '确定清除历史记录吗？',
  })
    .then(() => {
      // on confirm
      showToast('历史记录已清除')
    })
    .catch(() => {
      // on cancel
    });
}
</script>

<template>
  <VanNavBar class="nav-detail" :fixed="true" clickable left-arrow @click-left="onBack">
    <template #title>
      <div class="font-size-16">{{ navTitle }}</div>
    </template>

    <template #right>
      <span class='van-nav-bar__right__button' @click="onClick">
        <span style="color: var(--color-text-primary)">
          <!-- <i class="i-iconamoon:edit-duotone w-1em h-1em mr-5"></i> -->
          <span>清除</span>
        </span>
      </span>
    </template>
  </VanNavBar>
</template>
