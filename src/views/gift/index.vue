<script setup lang="ts">
definePage({
  name: 'gift',
  meta: {
    level: 1,
    title: '礼包详情',
    showTabbar: true
  },
})

onMounted(async () => {
  // ...
})
</script>

<template>
  <Container :padding-x="0" class="page-home flex flex-col">
    <van-row class="flex-basis-60 action-row mx--16 py-12 px-16 bg-white" justify="space-between">
      <van-col>
      </van-col>
    </van-row>
  </Container>
</template>

<style lang="less" src="./index.less" scoped />
