<script setup lang="ts">
definePage({
  name: 'exception',
  meta: {
    level: 2,
  },
})

const route = useRoute()
const displayText = computed(() => {
  return route.params.all == '403' ? '暂无权限' : '页面未找到'
})

const router = useRouter()
function onBack() {
  if (window.history.state.back) {
    history.back()
  }
  else {
    router.replace('/')
  }
}
</script>

<template>
  <Container>
    <div class="h-full flex flex-col justify-center items-center">
      <van-button class="w-60" type="primary" @click="onBack">
        <span>返回</span>
      </van-button>
    </div>
  </Container>
</template>
