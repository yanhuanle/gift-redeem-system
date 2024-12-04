<script setup lang="ts">
import { showToast } from 'vant'

definePage({
  name: 'records',
  meta: {
    level: 1,
    title: '历史记录',
    showTabbar: true,
    localNav: true
  },
})

const onDelete = (i) => {
  showToast('删除成功')
}
</script>

<template>
  <Container :padding-x="0" class="page-home flex flex-col">
    <van-swipe-cell v-for="i in 5">
      <van-card currency="" price="xxxx-xx-xx" desc="礼品状态" :title="'礼品' + i" class="goods-card"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="onDelete(i)" />
      </template>
    </van-swipe-cell>
  </Container>
</template>

<style lang="less" src="./index.less" scoped />