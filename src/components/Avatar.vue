<script setup lang="ts">
import AvatarDefault from '@/assets/images/avatar.svg'

defineProps({
  avatar: String,
  title: String,
  desc: String
})
</script>

<template>
  <div class="avatar-wrapper flex items-center justify-between my-16">
    <div class="left flex items-center">
      <img class="avatar mr-10 w-40 h-40 border-rd-6" :src="avatar || AvatarDefault" />
      <div class="line-height-20 font-size-14">
        <div class="name font-500">{{ title }}</div>
        <div class="position">{{ desc }}</div>
      </div>
    </div>
    <div class="right" v-if="$slots['right']">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.avatar-wrapper {
  .position {
    color: var(--color-text-2);
  }
}
</style>