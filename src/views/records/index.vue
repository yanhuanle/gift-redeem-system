<script setup lang="ts">
import { showToast } from 'vant'

import { storeToRefs } from 'pinia'
import useRecordsStore from '@/stores/modules/records'
const { records } = storeToRefs(useRecordsStore())

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
  let record = records.value.find(item => item.index == i)
  record.status = 2
  showToast('删除成功')
}
</script>

<template>
  <Container :padding-x="0" class="page-home flex flex-col">
    <van-swipe-cell v-for="record in records.filter(item => item.status == 1)">
      <van-card currency="" :price="record.expiredAt" :desc="record.desc" :title="record.title" class="goods-card"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="onDelete(record.index)" />
      </template>
    </van-swipe-cell>
  </Container>
</template>

<style lang="less" src="./index.less" scoped />