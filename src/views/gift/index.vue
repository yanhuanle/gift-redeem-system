<script setup lang="ts">
import { showToast, showDialog } from 'vant'

definePage({
  name: 'gift',
  meta: {
    level: 1,
    title: '礼包领取',
    showTabbar: true
  },
})

const onClick = (i) => {
  showDialog({
    message: '确认领取礼品' + i,
  }).then(() => {
    showToast('领取成功')
  });
}

</script>

<template>
  <Container :padding-x="0" class="page-home flex flex-col">
    <van-row v-for="i in 3" class="flex-basis-60 action-row mx--16 py-12 px-16 bg-white" justify="space-between">
      <van-col span="24">
        <van-card @click="onClick(i)" desc="礼包说明" num="2" price="有效期：xxxx-xx-xx" currency="" :title="'礼包' + i"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg">
          <template #tags>
            <van-tag plain type="primary" class="mr-5">标签1</van-tag>
            <van-tag plain type="primary">标签2</van-tag>
          </template>
          <template #footer>
            <van-button size="small">领取</van-button>
          </template>
        </van-card>
      </van-col>
    </van-row>
  </Container>
</template>

<style lang="less" src="./index.less" scoped />
