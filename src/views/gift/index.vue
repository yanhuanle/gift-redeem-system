<script setup lang="ts">
import { showToast, showConfirmDialog } from 'vant'

definePage({
  name: 'gift',
  meta: {
    level: 1,
    title: '礼包领取',
    showTabbar: true
  },
})

const gifts = ref([
  {
    index: 1,
    title: '礼包1',
    desc: '礼包说明',
    expiredAt: '有效期：xxxx-xx-xx',
    num: 2,
    status: 1,
  },
  {
    index: 2,
    title: '礼包2',
    desc: '礼包说明',
    expiredAt: '有效期：xxxx-xx-xx',
    num: 2,
    status: 1,
  },
  {
    index: 3,
    title: '礼包3',
    desc: '礼包说明',
    expiredAt: '有效期：xxxx-xx-xx',
    num: 2,
    status: 1,
  }
])

const onClick = (i) => {
  showConfirmDialog({
    message: '确认领取礼品' + i,
  }).then(() => {
    let gift = gifts.value.find(item => item.index == i)
    gift.status = 2
    showToast('领取成功')
  }).catch(() => {
    //
  });
}

</script>

<template>
  <Container :padding-x="0" class="page-home flex flex-col">
    <van-row v-for="gift in gifts" class="flex-basis-60 action-row mx--16 py-12 px-16 bg-white" justify="space-between">
      <van-col span="24">
        <van-card @click="onClick(gift.index)" :desc="gift.desc" :num="gift.num" :price="gift.expiredAt" currency="" :title="gift.title"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg">
          <template #tags>
            <van-tag plain type="primary" class="mr-5">标签1</van-tag>
            <van-tag plain type="primary">标签2</van-tag>
          </template>
          <template #footer>
            <van-button size="small" :disabled="gift.status != 1" >{{ gift.status == 1 ? '领取' : '已领取' }}</van-button>
          </template>
        </van-card>
      </van-col>
    </van-row>
  </Container>
</template>

<style lang="less" src="./index.less" scoped />
