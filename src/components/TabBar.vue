<script setup lang="ts">
const active = ref(0)
const route = useRoute()

const props = defineProps({
  content: {
    type: Array,
    default: () => {
      return [
        {
          icon: 'i-ep:document',
          text: '兑换',
          path: '/home'
        },
        {
          icon: 'i-ep:document',
          text: '礼包',
          path: '/gift'
        },
        {
          icon: 'i-ep:document',
          text: '历史',
          path: '/records'
        },
      ]
    }
  }
})
</script>

<template>
  <van-tabbar v-show="route.meta.showTabbar" v-model="active" route safe-area-inset-bottom>
    <van-tabbar-item v-for="item in props.content" :to="item.path">
      {{ item.text }}
      <template #icon>
        <div :class="item.icon" class="w-0.9em h-0.9em"></div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less">
.van-tabbar {
  .van-tabbar-item__icon {
    margin-bottom: 6px !important;
  }
}
</style>